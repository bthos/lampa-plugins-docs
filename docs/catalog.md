# Plugin Catalog (Summaries)

Below are one-paragraph summaries for representative plugins we fetched and reviewed. Each entry: purpose, main Lampa hooks/integration, external services, and notable risks.

- immisterio.github.io/bwa/fx.js — Filmix (FXAPI) source integration. Uses Lampa.Reguest, Modal, Storage, Utils; creates a device UID, requests a user token via filmixapp.cyou and then pulls stream links with qualities. External: filmixapp.cyou API, proxy <http://cors.cfhttp.top/>. Risks: HTTP and proxy use, long‑lived token in Storage, dynamic quality URL rewriting. License: none found.

- nb557.github.io/plugins/online_mod.js — “Online Mod” multi‑source aggregator. Heavy settings, host mirror selection, and proxy logic; obfuscated helpers and secret decoding; integrates with many third‑party sites (rezka, filmix, fancdn, kinobase, etc.). Hooks: Lampa.Storage, Lampa.Utils, Lampa.Reguest. External: multiple Cloudflare Worker/Deno proxies, custom domains. Risks: obfuscation, extensive proxying, potential geo/DRM bypass, large attack surface. License: none found.

- lampaplugins.github.io/store/store.js — Adds a “Pirate Store” entry to Settings and opens an extension catalog (extensions.json) with installed plugins highlighted. Hooks: Lampa.Settings, Lampa.Extensions. External: lampaplugins.github.io. Risks: minimal (store link only). License: none found.

- lampaplugins.github.io/store/record.js — Radio stations browser/player UI component (adds menu button, templates, audio playback with optional HLS). Hooks: Lampa.Component, Template, Scroll, Controller. External: lampaplugins.github.io/store/stations.json. Risks: low (audio only). License: none found.

- lampaplugins.github.io/store/o.js — “Reviews” button on title screen that fetches and renders HTML from api.skaz.tv/otzyv.php in a Modal; styles injected inline. Hooks: Lampa.Modal, Controller. External: api.skaz.tv. Risks: injection of remote HTML into DOM (XSS surface), HTTP usage. License: none found.

- lampaplugins.github.io/store/vcdn.js — Obfuscated script that inspects Lampa.Manifest.origin and shows a Noty error; uses Lampa.Utils.putScriptAsync to load external code (<http://185.87.48.42:2627/online.js>). Hooks: Storage, Noty, Utils. External: raw IP over HTTP. Risks: remote‑code execution, obfuscation, console tampering. License: none found.

- lampame.github.io/main/newcategory.js — Thin loader that asynchronously injects a remote category script. Hooks: Lampa.Utils.putScriptAsync. External: lampame.github.io. Risks: remote code loading. License: none found.

- skaz.tv/tv2.js — IPTV component with IndexedDB/LocalStorage persistence for playlists/favorites, UI lists, and HLS playback; includes Hls.js handling. Hooks: Lampa.DB, Storage, Component, Controller, Template. External: skaz.tv playlist/EPG endpoints. Risks: HTTP usage; large surface for playlist parsing. License: none found.

- cdn.kulik.uz/cors — IPTV‑like component (Kuliktv) using Lampa.DB and Storage for favorites and params; similar UI/DB patterns to other IPTV plugins. Hooks: Lampa.DB, Storage, Scroll, Template. External: kulik CDN endpoints. Risks: unclear content provenance; HTTP usage. License: none found.

- showy.online/m.js and showwwy.com/m.js — “Showy” online plugin. Sets device UID, injects auxiliary script, shows QR modal to bind device via Telegram bot, polls/POSTs to showwwy.com for code and token, stores showy_token in Storage. Hooks: Lampa.Modal, Storage, Reguest (BlazorNet bridge). External: showwwy.com over HTTP, api.qrserver.com. Risks: persistent token storage, repeated HTTP POSTs, privacy implications. License: none found.

- cub.watch/plugin/etor — URL resolved to a parked HTML page at fetch time; plugin likely defunct. Risks: none in current state.

- arkmv.ru/vod — Lampac‑style aggregator component with Filter/Explorer UI, multiple “balanser” sources, and SignalR (WebSocket) bridge to perform remote fetches (RCH). Hooks: Lampa.Reguest, Filter, Explorer, Controller. External: api.arkmv.ru SignalR hub plus many source sites. Risks: aggregator to potentially infringing hosts; WebSocket remote fetch execution. License: none found.

- skaz.tv/tv.js — Alternate IPTV integration: builds catalog lists, EPG overlays, favorites/hide channel lists; plays via Lampa.Player with playlists and optional archive. External: numerous <http://skaz.tv> endpoints, payment links (skaztv.online). Risks: HTTP, payment overlay flows, wide DOM manipulation. License: none found.

- lampa.stream/modss — Remote loader that fetches JavaScript from api.lampa.stream and evaluates it with eval(), guarded by a “loaded_modss” flag; includes requestAnimationFrame polyfill and snow effect shim. Hooks: Lampa.Reguest, Noty. External: api.lampa.stream. Risks: direct eval of remote code (RCE). License: none found.

- cub.red_plugin_tmdb-proxy — Rewrites TMDB image/API URLs to use a cub domain proxy and appends the user’s email as a query param; also hides TMDB proxy settings in the UI when active. Hooks: Lampa.TMDB, Lampa.Settings. External: imagetmdb/apitmdb on cub domain. Risks: minor privacy (email in query), proxy dependency. License: none found.

- cub.red_plugin_quality — Adds a “Quality” menu and category pages that request curated lists by quality via cub API, using Account token header. Hooks: Lampa.Reguest, Status, InteractionMain/Category, Activity, Lang. External: cub_domain/api/quality over HTTPS. Risks: token in headers; standard UI. License: none found.

- cub.red_plugin_interface — Alternative “New Interface” component with enriched header details pulled from TMDB via Lampa.TMDB.api; dynamic background loading and optimized scrolling. Hooks: Reguest, Scroll, InteractionLine, Layer, Background. External: TMDB proxy endpoints. Risks: low (UI/metadata only). License: none found.

- bwa.to_rc — Lampac-style aggregator with SignalR “rch” hub. Dynamically loads rc.bwa.to scripts (signalR, invc-rch.js), opens a WebSocket to a hub, registers remote calls, and queries multiple “balanser” sources; tracks number of requests. Hooks: Lampa.Reguest, Explorer, Filter, Controller, Noty. External: <http://rc.bwa.to> over HTTP, plus many host sources via hub. Risks: WebSocket remote invoke, HTTP transport, privacy exposure. License: none found.

- nemiroff.github.io_lampa_rr.js — Radio browser/player. Fetches station list from lampa.insomnia247.nl, displays items using a custom Template, and plays streams (HLS or AAC) via Audio/Hls.js with a header mini-player control. Hooks: Reguest, Scroll, Controller, Template, Background. External: HTTP endpoints for JSON and streams. Risks: HTTP usage; low otherwise. License: none found.

- and7ey.github.io_lampa_head_filter.js — Header UI toggles. Adds Settings to show/hide header elements (search, settings, premium, profile, etc.), listens to Storage changes, and toggles DOM visibility. Hooks: SettingsApi, Storage.listener, Template. External: none. Risks: low (UI only). License: none found.

- and7ey.github.io_lampa_kinopoisk.js — Kinopoisk “Planned to Watch” sync. Performs Yandex OAuth device flow to get a token, calls a Google Apps Script as a CORS proxy to Kinopoisk GraphQL, correlates items via Alloha API to TMDB, and stores a list in Storage; optional add to favorites. Hooks: Reguest, Modal, Noty, Storage, Activity. External: oauth.yandex.ru, Google Apps Script, api.alloha.tv, tmdb.cub domain. Risks: tokens in Storage, multiple external HTTP(S) calls, privacy disclosure. License: none found.

- and7ey.github.io_lampa_synology_dlna.js — Synology DLNA client. Uses SOAP (UPnP ContentDirectory) over HTTP to browse a NAS, optional local proxy for CORS, renders folders/files with icons, plays via Lampa.Player, and supports image fullscreen. Hooks: Template.js, Scroll, Controller, Player. External: local NAS endpoints over HTTP; optional proxy. Risks: HTTP LAN traffic, user-configured proxy. License: none found.

- plugin.rootu.top_ts-preload.js — TorrServer preload override and player wrapper. Adjusts Torserver stream URLs to force play without &preload, and wraps Lampa.Player to queue playlist/stat callbacks. Hooks: Lampa.Torserver, Lampa.Player, Modal utilities inside script. External: Torserver local endpoint. Risks: alters playback behavior; low-medium. License: none found.

- plugin.rootu.top_wsoff.js — Disables Lampa.Socket on certain old Android/Crosswalk devices to work around expired root certificates. Hooks: Lampa.Socket. External: none. Risks: disables WebSocket features on legacy devices; low. License: none found.

Notes

Entries above reflect concrete code we examined in analysis/raw at this time. Additional URLs can be added following the same template.

