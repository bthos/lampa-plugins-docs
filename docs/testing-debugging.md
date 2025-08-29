# Testing & Debugging

Techniques to validate plugins and troubleshoot issues.

## Logging

- Prefix logs: `[myplugin] message`.
- Add a `debug` toggle in your prefs and gate logs behind it.

## Focus & Controller debugging

- Ensure your component calls `Controller.add` and `Controller.toggle`.
- Verify `.selector` elements exist on screen; use `collectionFocus` with a safe fallback.

## Network troubleshooting

- Use short timeouts (5–10s) and surface Noty messages on errors.
- Stub external calls during development by pointing to a local JSON file.

```js
const network = new Lampa.Reguest();
network.timeout(8000)
network.silent('/mock/data.json', (json)=>{/* ... */}, (e)=>{ Lampa.Noty.show('Network error') })
```

## Player troubleshooting

- Test multiple formats (m3u8/mp4) and mirrors.
- Listen to `Player.callback` for `error` and `destroy` to recover UI state.

## Performance

- Avoid building huge DOM trees; paginate and lazy-load.
- Reuse `Scroll` and destroy event handlers in `destroy()`.

## Common pitfalls

- CORS blocked: only use approved proxies and HTTPS.
- Obfuscated/remote loaders: avoid `eval`/dynamic scripts; prefer static code.
- Token handling: don’t store long-lived secrets unencrypted.
