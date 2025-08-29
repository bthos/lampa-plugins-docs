# Lampa Plugins Docs

Build Lampa plugins with clear docs, ready-to-fork templates, and practical examples. Includes a security audit of community plugins.

## 🚀 Quick start

1) Copy `templates/plugin-template` to your repo.
2) Set ids and metadata in `manifest.json` and `main.js`.
3) Host `main.js` and load it in Lampa via its URL.

Optional: open `examples/hello-world.html` in a browser to prototype with a tiny harness.

## 📚 Docs

- Architecture: `docs/architecture.md`
- API guide: `docs/api.md`
- UI patterns: `docs/ui.md`
- Streams & playback: `docs/streams.md`
- Storage & prefs: `docs/storage-and-prefs.md`
- Security: `docs/security.md`
- Testing & debugging: `docs/testing-debugging.md`
- Packaging & publishing: `docs/packaging-publishing.md`
- Migration notes: `docs/migration.md`
- Plugin catalog: `docs/catalog.md`

## 🧪 Examples

- Hello World harness (browser): `examples/hello-world.html`
- Full usage snippets: `examples/full-usage-examples.md`
- Mock API JSON: `examples/mock/mock.json`

## 🧰 Templates & samples

- Starter template: `templates/plugin-template/`
- Sample plugins:
  - IPTV list: `templates/sample-plugins/iptv.js`
  - TMDB proxy demo: `templates/sample-plugins/tmdb-proxy.js`
  - UI tweak (header button): `templates/sample-plugins/ui-tweak.js`
  - Search provider: `templates/sample-plugins/search-provider.js`
  - Settings-only toggle: `templates/sample-plugins/settings-only.js`
  - Details + episodes screen: `templates/sample-plugins/details-episodes.js`

## 🔍 Analysis & audit

- Fetched sources and headers: `analysis/`
- Security audit report: `audit_report.md`
- Licenses & attributions: `LICENSES.md`

## 🗺️ Roadmap

Catalog, licenses, and audit are populated from URLs in `analysis/`. Next improvements:

- Keep expanding `docs/catalog.md` as new plugins are fetched.
- Link upstream licenses and update `LICENSES.md`.
- Re-scan for obfuscated loaders and HTTP usage; update `audit_report.md`.
