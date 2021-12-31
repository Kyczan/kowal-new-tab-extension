# My new tab Chrome extension

Customized new tab experience tailored for my needs.

![Screenshot](./scrot.webp)

## Stack

- TS
- React
- [swr](https://swr.vercel.app/) for data fetching

## Features

- Cool wallpapers from [Unsplash](https://unsplash.com/)
- Display date and time
- Display top visited sites
- Display current weather from https://openweathermap.org/
- Control lights in the flat (using local [Home Assistant](https://www.home-assistant.io/) api and smart [Sonoff](https://sonoff.tech/) switches connected to HA via [this integration](https://github.com/AlexxIT/SonoffLAN))
- Display agenda from Google calendars (it also uses [HA integration](https://www.home-assistant.io/integrations/google/) to retrieve data from Google calendar). To see calendar colors you need to modify in HA `google_calendars.yaml` file. Add to `device_id` suffix with hex color (like `_ff0000`) (this is some workaround, because HA integration doesn't provide info about calendar color):

```yaml
- cal_id: some_id@group.calendar.google.com
  entities:
  - device_id: some_device_id_ff0000
    ignore_availability: true
    name: "My Calendar"
    track: true
```

## Installation

- Clone repo
- Install deps (`npm i`)
- Copy `.env.local.template` to `.env.local` and add access token to HA ([here](https://developers.home-assistant.io/docs/api/rest/) is info how to obtain token) and api key to OpenWeather (obtain api key [here](https://openweathermap.org/api))
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
