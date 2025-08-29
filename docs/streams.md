# Streams: sources, failover, proxies, DRM

Build resilient playback: support multiple sources, provide fallbacks, and avoid unsafe practices.

## Supported sources

- HLS (.m3u8): best cross-device compatibility.
- DASH (.mpd): may not work on all WebViews; test.
- Progressive (.mp4): simple but no adaptive bitrate.
- TorrServer: local streaming via torrent engine (legal/privacy risk; user opt‑in only).

## Open the player

```js
const src = { title: 'Demo', url: 'https://cdn.example/video.m3u8' }
Lampa.Player.play(src)
Lampa.Player.playlist([
  { title: '720p', url: 'https://cdn.example/720.m3u8' },
  { title: '1080p', url: 'https://cdn.example/1080.m3u8' }
])
```

## Failover strategy

Offer multiple mirrors and auto-retry on errors.

```js
const mirrors = ['https://a.example/1080.m3u8','https://b.example/1080.m3u8']
let idx = 0

function start(){ Lampa.Player.play({ title: 'Demo', url: mirrors[idx] }) }
Lampa.Player.callback((e) => {
  if (e.type === 'error' && idx < mirrors.length - 1) {
    idx++
    start()
  }
})
start()
```

## Subtitles and audio tracks

```js
const subs = [ { label: 'EN', url: 'https://cdn.example/en.vtt' } ]
const audio = [ { label: 'ENG', url: 'https://cdn.example/audio_eng.m3u8' } ]
// Implement a simple selector UI and re-open with chosen tracks if needed.
```

## TorrServer notes

- Detect user configuration via `Lampa.Torserver` helpers if present.
- Always inform the user about privacy/legal implications; do not enable silently.
- Avoid modifying playback URLs unexpectedly (e.g., forcing preload) without a clear toggle.

## CORS and proxies

- Prefer HTTPS with proper CORS from origin.
- If a proxy is required, disclose endpoint and purpose in Settings, and allow opt‑out.
- Avoid generic open proxies; pin hosts and sanitize query parameters.

## DRM considerations

- Many webviews lack Widevine/PlayReady; avoid DRM streams or detect capability and warn.
- Provide a graceful fallback (trailer, alt source) when DRM playback is impossible.

## Error handling checklist

- Validate MIME and extension (m3u8/mp4).
- Implement retries and mirror fallback.
- Time out slow requests and surface a user-friendly Noty message.
