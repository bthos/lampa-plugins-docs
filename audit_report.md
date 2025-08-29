# Security Audit Report (initial findings)

Scope: sampled plugins under `analysis/raw` at commit time. Entries cite file name and concrete pattern.

High risk

High risk

- lampa.stream_modss — Loads remote JS and executes via eval(). Source: `analysis/raw/lampa.stream_modss`; code performs `eval(json + '//# sourceURL=...')`. Risk: remote code execution.
- lampaplugins.github.io_store_vcdn.js — Obfuscated code that stubs console methods and loads external code from <http://185.87.48.42:2627/online.js> via `Lampa.Utils.putScriptAsync`. Source: `analysis/raw/lampaplugins.github.io_store_vcdn.js`. Risk: RCE, opaque behavior.
- nb557.github.io_plugins_online_mod.js — Obfuscation, secret decoding, broad proxying to many hosts; manipulates requests across numerous third‑party sources. Source: `analysis/raw/nb557.github.io_plugins_online_mod.js`. Risk: privacy, geo/DRM bypass, maintainability.

Additional high risk

- bylampa.github.io_cinema.js — Obfuscated loader that fetches external code from a raw IP over HTTP and stubs console methods. Source: `analysis/raw/bylampa.github.io_cinema.js`. Risk: RCE, opaque behavior.

Medium risk

- immisterio.github.io_bwa_fx.js — Uses proxy <http://cors.cfhttp.top/>; stores tokens locally; pulls Filmix API over HTTP. Source: `analysis/raw/immisterio.github.io_bwa_fx.js`. Risk: MITM on HTTP, token leakage.
- showy.online_m.js and showwwy.com_m.js — Device linking via QR, repeated HTTP POSTs to showwwy.com, stores `showy_token` in Storage. Sources: `analysis/raw/showy.online_m.js`, `analysis/raw/showwwy.com_m.js`. Risk: token persistence and transport over HTTP.
- arkmv.ru_vod — SignalR WebSocket bridge used to perform remote fetches (RCH). Source: `analysis/raw/arkmv.ru_vod`. Risk: remote execution of fetches via app context; depends on external hub.
- skaz.tv_tv.js — Adds payment flows and injects a lot of UI; loads multiple resources over HTTP from skaz.tv. Source: `analysis/raw/skaz.tv_tv.js`. Risk: MITM, phishing surface if endpoints change.

Additional medium risk

- bwa.to_rc — Loads SignalR and hub scripts over HTTP from rc.bwa.to and opens a WebSocket; performs remote invoke to multiple sources. Source: `analysis/raw/bwa.to_rc`. Risk: HTTP transport, privacy exposure, remote hub dependency.
- and7ey.github.io_lampa_kinopoisk.js — OAuth tokens stored in Storage; calls Google Apps Script proxy, Alloha API, and TMDB proxy. Source: `analysis/raw/and7ey.github.io_lampa_kinopoisk.js`. Risk: token persistence, multi‑service data disclosure.
- nemiroff.github.io_lampa_rr.js — Streams and station API via HTTP endpoints (radio). Source: `analysis/raw/nemiroff.github.io_lampa_rr.js`. Risk: HTTP transport, minor.

Low risk

- lampaplugins.github.io_store_store.js — Adds Settings entry to open a JSON catalog; no dynamic code exec. Source: `analysis/raw/lampaplugins.github.io_store_store.js`.
- lampaplugins.github.io_store_record.js — Audio player UI; network reads a JSON station list; no dynamic code exec. Source: `analysis/raw/lampaplugins.github.io_store_record.js`.

Additional low risk

- cub.red_plugin_tmdb-proxy — Rewrites TMDB endpoints to cub proxy and appends email param. Source: `analysis/raw/cub.red_plugin_tmdb-proxy`. Risk: minor privacy disclosure (email in query), proxy dependency.
- cub.red_plugin_quality — Uses account token header to fetch curated lists. Source: `analysis/raw/cub.red_plugin_quality`. Risk: standard authenticated requests.
- cub.red_plugin_interface — UI/metadata enhancements using TMDB proxy. Source: `analysis/raw/cub.red_plugin_interface`. Risk: low.
- and7ey.github.io_lampa_head_filter.js — Header visibility toggles. Source: `analysis/raw/and7ey.github.io_lampa_head_filter.js`. Risk: low.
- and7ey.github.io_lampa_synology_dlna.js — Local LAN SOAP over HTTP with optional proxy; plays media directly. Source: `analysis/raw/and7ey.github.io_lampa_synology_dlna.js`. Risk: LAN HTTP; user‑configured.
- plugin.rootu.top_wsoff.js — Disables Socket on specific legacy devices only. Source: `analysis/raw/plugin.rootu.top_wsoff.js`. Risk: low.

Other observations

- cdn.kulik.uz_cors and skaz.tv_tv2.js use IndexedDB/Storage and network for IPTV; mostly UI/data handling but rely on HTTP endpoints.
- cub.watch_plugin_etor fetched as HTML parking page; no actionable code at time of analysis.

Recommendations

- Disallow eval() and dynamic code execution unless signed and verified. Prefer static, pinned scripts over HTTPS.
- For HTTP‑only sources, require user opt‑in and display warnings; prefer HTTPS mirrors/proxies with strict CORS.
- Avoid storing long‑lived tokens in plain Storage; encrypt and/or scope with short TTL.
- Limit or sandbox WebSocket bridges; validate destinations and sanitize results.
- Document and disclose all third‑party endpoints and data shared.
