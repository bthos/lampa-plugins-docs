# Storage and Preferences

Use `Lampa.Storage` to persist simple data and preferences. Keep data small, structured, and namespaced.

## Conventions

- Namespace keys with your plugin id: `myplugin_*`.
- Define a schema with defaults and merge on read.
- Version your prefs when structure changes and migrate accordingly.

## Example with schema and listener

```js
const KEY = 'myplugin_prefs'
const defaults = { enabled: true, quality: 'auto', theme: 'dark', v: 1 }

function load(){
  const saved = Lampa.Storage.get(KEY, {})
  const prefs = Object.assign({}, defaults, saved)
  if ((saved.v||0) < defaults.v) migrate(prefs, saved.v||0)
  return prefs
}

function save(prefs){ Lampa.Storage.set(KEY, prefs) }

function migrate(prefs, from){
  if (from < 1) {
    // example: introduce theme
    prefs.theme = prefs.theme || 'dark'
    prefs.v = 1
  }
}

Lampa.Storage.listener.follow('change', (e) => {
  if (e.name === KEY) {
    // react to live changes, e.value holds new value
  }
})
```

## SettingsApi fields

Expose toggles/selects bound to your keys.

```js
Lampa.SettingsApi.addParam({
  component: 'myplugin',
  param: { type: 'trigger', name: 'myplugin_enabled', default: true },
  field: { name: 'Enable plugin' }
})

Lampa.SettingsApi.addParam({
  component: 'myplugin',
  param: { type: 'select', name: 'myplugin_quality', values: ['auto','720p','1080p'], default: 'auto' },
  field: { name: 'Preferred quality' }
})
```
