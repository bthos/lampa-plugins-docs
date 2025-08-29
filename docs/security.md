# Security Guidance for Lampa Plugins

This doc flags common risky patterns and safer alternatives.

## Risky patterns

- eval/new Function/Function constructor, dynamic remote code.
- Open proxies (CORS any-origin), credential leakage.
- Torrent/TorrServer auto-start without clear consent.
- Disabling WebSocket protections or tampering with CSP.
- Hardcoded tokens, API keys, or user identifiers.

## Safer approaches

- Bundle static code; if remote config needed, validate and sign.
- Use least-privilege network requests and validate responses.
- Provide opt-in toggles for high-risk features, with warnings.
- Respect regional laws; do not circumvent DRM or geo-blocks.
- Do not collect PII; if telemetry is needed, make it anonymous and opt-in.
