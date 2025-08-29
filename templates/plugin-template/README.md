# Plugin Template

A minimal, production-friendly template for Lampa plugins.

## Files

- manifest.json — plugin metadata (id, name, entry).
- main.js — registers a component, adds Settings entry, shows a simple list.
- ui.js — optional UI helpers (example button factory).
- styles.css — optional styles for your plugin classes.

## Customize

- Set a unique `id` in manifest.json and in main.js (ID constant).
- Replace the demo network call with your data source.
- Add SettingsApi params for preferences if needed.

## Load in Lampa

- Host these files (e.g., GitHub Pages) and point Lampa to the `main.js` URL.
- Or paste inline in a local dev build for quick testing.

## Notes

- Prefer HTTPS endpoints.
- Avoid dynamic `eval()` or remote code loaders.
- Keep DOM small and destroy resources in `destroy()`.