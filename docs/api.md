# Lampa Plugin API (practical guide)

This reference distills common APIs used by community plugins. Treat it as pragmatic guidance; verify behaviors on the current Lampa build.

## Core globals

- `Lampa`: main namespace exposing submodules: `Listener`, `Settings`, `SettingsApi`, `Activity`, `Component`, `Controller`, `Player`, `Storage`, `Reguest` (network), `Template`, `Background`, `Utils`.
- `Storage`: thin wrapper for persistent key/value.
- `Reguest`: HTTP client with timeout, headers, and convenience methods.
- `Controller`: focus and key handling for TV remotes.
- `Activity`: navigation stack (push/replace/backward) and lifecycle hooks per screen/component.
- `Player`: open URL(s), playlists, callbacks, listeners.

## Storage

Simple get/set with safe defaults. Prefer namespacing keys by plugin id.

```js
const KEY = 'myplugin_prefs'
const defaults = { enabled: true, quality: 'auto' }
const prefs = Object.assign({}, defaults, Lampa.Storage.get(KEY, {}))

function save(){ Lampa.Storage.set(KEY, prefs) }

// Read built-in fields (not persisted via set)
const isPremium = Lampa.Storage.field('account_premium')
```

Listen for changes (for dynamic UI updates):

```js
Lampa.Storage.listener.follow('change', (e) => {
  if (e.name === KEY) {
    // react to pref changes
  }
})
```

## Network (Reguest)

Create a client, set timeouts, clear pending requests on destroy. Prefer HTTPS; disclose proxies.

```js
const network = new Lampa.Reguest()
network.timeout(10000)

// GET (silent: no global spinners)
network.silent('https://api.example.com/items', (json) => {
  // success
}, (err) => {
  // error
})

// With headers and method
network.silent('https://api.example.com/items', (json)=>{}, (err)=>{}, false, {
  type: 'POST',
  headers: { 'x-api-key': '...' },
  data: JSON.stringify({ q: 'query' })
})

// Native fetch bypass if needed (platform quirks)
// network.native(url, ok, fail)

// Cleanup in component.destroy
network.clear()
```

## Settings and SettingsApi

Expose an entry under Settings and, optionally, a dedicated settings page with fields.

```js
// Open plugin screen from Settings
Lampa.Settings.add({
  title: 'My Plugin',
  group: 'plugins',
  subtitle: 'Enable or configure features',
  onSelect: () => Lampa.Activity.push({ title: 'My Plugin', component: 'myplugin' })
})

// Structured fields (toggles, selects, inputs)
Lampa.SettingsApi.addParam({
  component: 'myplugin',
  param: { type: 'trigger', name: 'myplugin_enabled', default: true },
  field: { name: 'Enable plugin' }
})
```

## Components, Activity and lifecycle

Implement a component with `create`, `start`, `back`, `render`, `destroy`. Register it and push via `Activity`.

```js
function MyComponent(object){
  const scroll = new Lampa.Scroll({ mask: true, over: true })
  const html = $('<div class="myplugin"><div class="myplugin__body"></div></div>')
  const body = html.find('.myplugin__body')
  let items = []

  this.create = () => {
    this.activity.loader(true)
    // build synchronously or load then build
    body.append(scroll.render(true))
    this.append([{ title: 'Hello' }, { title: 'World' }])
    this.activity.loader(false)
    this.activity.toggle()
    return this.render()
  }
  this.append = (list) => {
    list.forEach((it) => {
      const el = $('<div class="selector myplugin__item"></div>').text(it.title)
      el.on('hover:enter', () => Lampa.Noty.show('Selected: '+it.title))
      el.on('hover:focus', () => scroll.update(el))
      scroll.append(el)
      items.push(el)
    })
  }
  this.start = () => {
    Lampa.Controller.add('myplugin', {
      toggle(){
        Lampa.Controller.collectionSet(scroll.render())
        Lampa.Controller.collectionFocus(items[0] ? items[0][0] : false, scroll.render())
      },
      back: this.back,
      up(){ Navigator.move('up') },
      down(){ Navigator.move('down') },
      left(){ if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu') },
      right(){ Navigator.move('right') }
    })
    Lampa.Controller.toggle('myplugin')
  }
  this.back = () => Lampa.Activity.backward()
  this.render = () => html
  this.destroy = () => { Lampa.Arrays.destroy(items); scroll.destroy(); html.remove() }
}

// Register and navigate
Lampa.Component.add('myplugin', MyComponent)
Lampa.Activity.push({ title: 'My Plugin', component: 'myplugin', page: 1 })
```

## Templates

Use predefined templates for consistent UI; or create minimal DOM. Some builds provide `Template.get` (named snippets) and `Template.js` (custom fragments).

```js
const card = Lampa.Template.get('card', { title: 'Item' })
// or
const row = $('<div class="myplugin-row"></div>')
```

## Player

Open the player with a URL; optionally provide playlist, callback, subtitles, and multiple qualities.

```js
const source720 = { quality: '720p', url: 'https://cdn.example/720.m3u8' }
const source1080 = { quality: '1080p', url: 'https://cdn.example/1080.m3u8' }

Lampa.Player.play({ title: 'Sample', url: source1080.url })
Lampa.Player.playlist([
  { title: 'Sample 720p', url: source720.url },
  { title: 'Sample 1080p', url: source1080.url }
])

Lampa.Player.callback((e) => {
  if (e.type === 'destroy') {
    // cleanup
  }
})
```

## Events and listeners

React to app lifecycle and custom events.

```js
Lampa.Listener.follow('app', (e) => {
  if (e.type === 'ready') {
    // initialize plugin
  }
})

Lampa.Settings.listener.follow('open', (e) => {
  if (e.name === 'myplugin') {
    // mutate settings screen if needed
  }
})
```
