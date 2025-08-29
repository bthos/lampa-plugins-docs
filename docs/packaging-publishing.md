# Packaging & Publishing

## Files

- manifest.json: id, name, version, entry (main.js), author, description.
- main.js: registration logic.
- ui.js, styles.css: optional.

## Versioning

- Use semantic versioning: MAJOR.MINOR.PATCH.
- Document breaking changes in `migration.md`.

## Distribution

- Host your plugin JS on HTTPS with correct MIME type.
- Provide a landing page with description and install URL.
- Sign releases or publish checksums.
