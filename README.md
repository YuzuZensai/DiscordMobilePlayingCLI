# DiscordMobilePlayingCLI

Discord currently only supports game activity on a mobile platform using Samsung Game Launcher, which is only available on Samsung devices.

DiscordMobilePlayingCLI is only a PoC that game activities can be implemented on another platform like jailbroken iOS, or another kind of android distros by using the Discord API. Well, you can't do anything about the "Playing on Samsung Galaxy" for now.

![Discord Preview](https://user-images.githubusercontent.com/84713269/166914540-d2a4edac-1f33-43ed-a860-4bded04029b5.png)

## 🔧 Installation

Prerequisites: Git, Node.js and the package manager npm/yarn or others.

1. Clone this repository ``git clone https://github.com/YuzuZensai/DiscordMobilePlayingCLI.git``
2. Install dependencies with ``yarn`` for yarn, or ``npm install`` for npm
3. Run the script ``yarn start`` or ``npm start``

## 🌸 Commands

- ``set [BUNDLE_ID]`` Set application bundle id
- ``start`` Start showing the presence
- ``stop`` Stop showing the presence
- ``update`` Update the current presences with new bundle id
- ``exit`` Exit the application

## 🌏 API used

You do not need to authorize the Samsung Game Launcher OAuth to use this API

### POST /api/v6/presences

#### Headers

- ``Authorization`` Your discord account token

#### Body (JSON)

- ``package_name`` Application bundle id on Google Play store
- ``update`` **(START, UPDATE, STOP)** Status for the presences 

```json
{
    "package_name": "com.YostarJP.BlueArchive",
    "update": "START"
}
```

## ⚠️ Disclaimer

DiscordMobilePlayingCLI utilizes API that is outside OAuth2/bot API scope.

``/api/v6/presences``

Automating normal user accounts (generally called "self-bots") outside of the OAuth2/bot API is a **violation** of Discord [Terms Of service](https://discord.com/terms) & [Community Guidelines](https://discord.com/guidelines), and can result in account termination if found. **I do not take any responsibility, liability, or anything that happened on your Discord Account.**
