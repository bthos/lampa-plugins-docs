# Plugin Pre-Publish Checklist

- Metadata complete: id, name, version, description.
- Settings page provided with toggles for risky features.
- Storage keys namespaced; defaults present.
- Network calls documented; avoid open proxies.
- CORS handled legally; no DRM circumvention.
- Player tested with multiple formats and fallbacks.
- Focus/Controller works on remote.
- No eval/new Function; no remote code exec.
- No hardcoded tokens; .env or config pattern if needed.
- License included; third-party attributions listed.
- QA smoke tests pass; logs are gated.
