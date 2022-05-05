# DiscordMobilePlayingCLI

## 🌏 API used

**POST /api/v6/presences**

**Headers:**
- ``Authorization`` Your discord account token

**Body (JSON):**
- ``package_name`` Application bundle id on Google Play store
- ``update`` **(START, UPDATE, STOP)** Status for the presences 
```
{
    "package_name": "com.YostarJP.BlueArchive",
    "update": "START"
}
```

## ⚠️ Disclaimer
DiscordMobilePlayingCLI utilizes API that is outside OAuth2/bot API scope.

``/api/v6/presences``

Automating normal user accounts (generally called "self-bots") outside of the OAuth2/bot API is a **violation** of Discord [Terms Of service](https://discord.com/terms) & [Community Guidelines](https://discord.com/guidelines), and can result in an account termination if found. **I do not take any responsibility, liability, or anything that happend on your Discord Account.**
