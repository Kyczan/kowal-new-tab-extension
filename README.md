# My new tab Chrome extension

Customized new tab experience tailored for my needs.

![Screenshot](./scrot.webp)

## Stack

- TS
- React
- [swr](https://swr.vercel.app/) for data fetching

## Features

- Display date and time
- Display top visited sites
- Control lights in flat (using local [Home Assistant](https://www.home-assistant.io/) api and smart [Sonoff](https://sonoff.tech/) switches connected to HA via [this integration](https://github.com/AlexxIT/SonoffLAN))
- Display agenda from Google calendars (it also uses [HA integration](https://www.home-assistant.io/integrations/google/) to retrieve data from Google calendar)
- Cool wallpapers from [Unsplash](https://unsplash.com/)

## Installation

- Clone repo
- Install deps (`npm i`)
- Copy `.env.local.template` to `.env.local` and add access token to HA
- Build app (`npm run build`)
- Go to Chrome (or whatever Chromium based browser, e.g. Brave), open extensions page (`chrome://extensions`), turn on developer mode, click *Load unzipped* and select `build` folder of this app

## Development

Type `npm start` and dev server will spin up and app will be opened as normal webpage.

To be able to make fetch calls to local home assistant url (`http://homeassistant.local:8123`) you need to add in HA `configuration.yaml` following lines:

```yaml
http:
    cors_allowed_origins:
        - http://localhost:3000
```

Remember, that some features in dev mode are unavailable, such as most props in `chrome` object. In these cases functionalities are mocked (like top visited sites and favicons).
