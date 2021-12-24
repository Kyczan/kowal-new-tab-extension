# My new tab Chrome extension

Just my customized new tab experience tailored for my needs.

## Stack

- TS
- React
- [swr](https://swr.vercel.app/) for data fetching

## Features

- Display date and time
- Display top visited sites
- Control lights in my flat (using my local [Home Assistant](https://www.home-assistant.io/) api and smart [Sonoff](https://sonoff.tech/) switches connected to HA via [this integration](https://github.com/AlexxIT/SonoffLAN))
- Cool wallpapers from [Unsplash](https://unsplash.com/)

## Installation

- Clone repo
- Install deps (`npm i`)
- Copy `.env.local.template` to `.env.local` and add access token to HA
- Build app (`npm run build`)
- Go to Chrome (or whatever Chromium based browser, e.g. Brave), open extensions page (`chrome://extensions`), turn on developer mode, click *Load unzipped* and select `build` folder of this app

## Development

Just type `npm start` and dev server will spin up and app will be opened as normal webpage. Remember, that some features in dev mode are unavailable, such as most props in `chrome` object. In these cases functionalities are mocked (like top visited sites and favicons).
