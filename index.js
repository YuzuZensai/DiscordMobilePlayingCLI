require('dotenv').config();
const discordToken = process.env.token;
const myRL = require("serverline");
const axios = require("axios");

if(!discordToken) {
    console.error("No discord token provided in environment variables");
    process.exit(1);
}

process.title = `DiscordMobilePlayingCLI - Idle`;

myRL.init();
myRL.setCompletion(['start', 'stop', 'set', 'update', 'exit']);
myRL.setPrompt('> ');

console.log('DiscordMobilePlayingCLI ready');

let isStarted = false;
let currentPackageName;
let refreshInterval;

myRL.on('line', async (line) => {
    const args = line.split(' ');

    switch (args[0]) {
        case 'start':
            if(isStarted) {
                console.log("Already started");
                return;
            }
            if(!currentPackageName) {
                console.error('No package name set');
                return;
            }
            console.log('Starting...');
            await setStatus(currentPackageName, "START");
            isStarted = true;
            createRefreshInterval();
            break;
        case 'stop':
            if(!isStarted) {
                console.error('Not started');
                return;
            }
            if(!currentPackageName) {
                console.error('No package name set');
                return;
            }
            console.log('Stopping...');
            await setStatus(currentPackageName, "STOP");
            isStarted = false;
            clearInterval(refreshInterval);
            process.title = `DiscordMobilePlayingCLI - Idle`;
            break;
        case 'set':
            if(!args[1]) {
                console.error("No package name provided");
                return;
            }
            console.log(`Setting... ${args[1]}`);
            currentPackageName = args[1];
            break;
        case 'update':
            if(!isStarted) {
                console.error('Not started');
                return;
            }
            if(!currentPackageName) {
                console.error('No package name set');
                return;
            }
            console.log('Updating...');
            process.title = `DiscordMobilePlayingCLI - Running - ${currentPackageName}`;
            await setStatus(currentPackageName, "UPDATE");
            break;
        case 'exit':
            if(isStarted) {
                console.log("Stoping...");
                await setStatus(currentPackageName, "STOP");
            }
            process.exit(0);
            break;
        default:
            console.log('Unknown command');
            break;
    }
});


function createRefreshInterval() {
    if(refreshInterval)
        clearInterval(refreshInterval);

    process.title = `DiscordMobilePlayingCLI - Running - ${currentPackageName}`;

    refreshInterval = setInterval(async () => {
        if(!isStarted) return;
        console.log('Updating...');
        await setStatus(currentPackageName, "UPDATE");
    }, 5 * 60 * 1000);
}

async function setStatus(packageName, update) {
    if(!currentPackageName) {
        console.error('No package name set');
        return;
    }
    try {
        await axios.post(`https://discord.com/api/v6/presences`, {
            'package_name': packageName,
            'update': update
        }, {
            headers: {
                'Authorization': discordToken,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/100.0.4896.127 Mobile OceanHero/6 Safari/537.36',
                'Content-Type': 'application/json',
                'Cache-Control': 'max-age=121',
            }
        });
    } catch (err) {
        console.error(err.message);
    }
}