# Lampa Plugin Architecture

This document explains the plugin model used by Lampa, inferred from public plugins and common patterns.

- Entry point: a JS file loaded by Lampa (via direct URL or local install) that self-registers with the global Lampa application context.
- Typical globals: `Lampa`, `Utils`, `Storage`, `Component`, `Template`, `Network`, `Controller`, `Player`, `Settings`, `Activity`, `Favorites`, `Files`, `Platform`.
- Loading: plugins are plain browser JS; they are executed in the app WebView context with access to the above globals.

## Lifecycle
- Load time: executed once when added; may hook events (e.g., on app start, on search, on route change).
- Activation: usually by calling `Lampa.Plugin.create()` or by registering screens/menus via `Lampa.Listener` or `Lampa.Listener.follow('app', ...)`.
- Deactivation: remove listeners, controllers, and intervals; respect `onDestroy` patterns if used.

## Hooks & Events
Common patterns observed:
- Navigation/menu: add a category to the main menu, or inject into `Activity` routes.
- Search hook: observe search queries and provide custom sources.
- Player hook: modify source list, quality, or attach custom engines.
- Network hook: proxy or rewrite requests using CORS/DRM workarounds.
- Storage hook: read/save preferences using `Storage` namespace.

## Components
- Screens: extend a `Component` with `create()`, `start()`, `destroy()` and bind to `Controller` for focus/keys.
- Templates: HTML strings via `Template.get('...')` or hand-built DOM using jQuery-like helpers.
- Player: `Player.open({url, title, subtitles, quality})` and intercept `Player.listener` for state.

## Events (typical)
- `Lampa.Listener.follow('settings', cb)` – settings changes.
- `Lampa.Listener.follow('app', cb)` – app-level events like ready, background.
- `Player.listener.follow('destroy', cb)` – cleanup when playback ends.

## File Structure (recommended)
- manifest.json – plugin meta (name, id, version, entry).
- main.js – registration, routes, settings.
- ui.js – UI components or templates.
- styles.css – optional styling tweaks.

## Versioning & Compatibility
- Stick to ES5/ES6 compatible syntax; WebView environments vary.
- Feature-detect `Lampa` APIs before using; fallback gracefully.

