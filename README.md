# My new tab Chrome extension

Customized new tab experience tailored for my needs.

![Screenshot](./scrot.webp)

## Stack

- TS
- React
- [swr](https://swr.vercel.app/) for data fetching
- [Vite](https://vitejs.dev/) for bundling

## Perquisites 

- Node 16 or higher (to build extension)

## Features

- Display bookmarks bar
- Cool, randomly changing wallpapers from https://unsplash.com/ 
- Display date and time
- Display top visited sites
- Display current weather from https://openweathermap.org/
- Control lights in the flat
- Control Air Purifiers
- Display agenda from Google calendars
- Display hourly updated allergens in your area from https://twojapogoda.pl

## Installation

- Clone repo
- Install deps (`npm i`)
- Copy (or rename) `config.template.json` file to `config.json`
- Configure features (see below [Configuration](#configuration) section)
- Edit `public/manifest.json` file and change `http://homeassistant.local:8123/` under `permissions` key to the same value as `homeAssistant.haUrl` in `config.json` file
- Build app (`npm run build`)
- Go to Chrome (or whatever Chromium based browser, e.g. Brave), open extensions page (`chrome://extensions`), turn on developer mode, click **Load unzipped** and select `build` folder of this app
- Open new tab and enjoy!

## Configuration

Most configuration needs to be done in `config.json` file. You can turn on/off most features by editing property `"enabled": true/false` in each feature.

### Home Assistant

Some features are connected to [Home Assistant](https://www.home-assistant.io/) and are using its api:
- Calendar
- Lights
- Air Purifier
- Weather

To connect to HA set following variables in `config.json` under `homeAssistant` property:
- `haUrl` - link which you use to open HA in browser (in my case it is `http://homeassistant.local:8123`, but it can be some external url if you have exposed HA to Internet - just remember to set the same value in `public/manifest.json`)
- `haToken` access token to HA ([here](https://developers.home-assistant.io/docs/api/rest/) is info how to obtain token)

### Bookmarks bar
I created this component to replace native bookmarks bar. I want to display bar only in the new tab and not in visited pages (there is setting for that in browser, but it is broken if you are using custom new tab).

### Wallpapers
You can use your own set of wallpapers. Place images in `public/wallpapers` folder and edit `wallpapers.list` in `config.json` file. There should be names of the images placed in wallpapers folder.

### Weather
It uses OpenWeatherMap [integration](https://www.home-assistant.io/integrations/openweathermap/) in HA. You also need api key from OpenWeatherMap (get it [here](https://openweathermap.org/api)), which you need to paste into integration config in HA.

Here, in `config.json` under `weather.name` set display name for your location. It is just for display purposes. There is no need to change `weather.entity_id`.

### Floor Plan
If you want to control lights or air purifier - you need a floor plan. Create it in `.svg` format (I used for that great free app [Inkscape](https://inkscape.org/)). Then upload/paste it into this web [app](https://jakearchibald.github.io/svgomg/) (it will improve svg file and fix some issues). Next, put file in `public/plan.svg`.

### Lights
I'm using smart [Sonoff](https://sonoff.tech/) switches connected to HA via [this integration](https://github.com/AlexxIT/SonoffLAN).

Obtain `entity_id` from HA for all switches and put them in `config.json` under `lights.list`. Also adjust there bulbs positions using `left` and `top` property (values are percents of floor plan dimensions). It is easier to position it in the browser. Just run this app in [Development](#development) mode, inspect lightbulb and experiment with css.

### Air Purifier
It also uses HA api to control Purifier. I have Xiaomi Mi Air Purifier 3H (and this app was tested only for this model). It uses this [integration](https://www.home-assistant.io/integrations/xiaomi_miio/). You can use more than one Air Purifier. In `config.json` under `airPurifiers.list` you need to specify your devices and its positions like for Lights.

### Calendar
It also uses [HA integration](https://www.home-assistant.io/integrations/google/) to retrieve data from Google calendar. To see calendar colors you need to modify in **HA** `google_calendars.yaml` file. Add to `device_id` suffix with hex color (like `_ff0000`) (this is some workaround, because HA integration doesn't provide info about calendar color):

```yaml
- cal_id: some_id@group.calendar.google.com
  entities:
  - device_id: some_device_id_ff0000
    ignore_availability: true
    name: "My Calendar"
    track: true
```

### Allergens
This one uses data provider from Poland and might not work in another countries.

Update variable in `config.json` under `allergens.api.cityId`:

You need to find your city id (`2517` is Wrocław). Visit https://www.twojapogoda.pl/ open dev tools, go to network tab. Next use search to find your city and click enter. It will make some requests in network tab. One of them will be number - it is your city id.

## Development

Type `npm start` and dev server will spin up and app will be opened as normal webpage.

To be able to make fetch calls to local home assistant url (`http://homeassistant.local:8123`) you need to add in HA `configuration.yaml` following lines:

```yaml
http:
    cors_allowed_origins:
        - http://localhost:5173
```

Then save and restart HA.

Remember, that some features in dev mode are unavailable, such as most props in `chrome` object. In these cases functionalities are mocked (like top visited sites and favicons).
