# MITOMS website: Next.js static frontend + PHP backend

This is the complete editable source project prepared for Hostinger shared hosting where a persistent Node.js server is unavailable.

## Architecture

- Next.js is used locally to develop and generate a static export.
- The production frontend is generated in `out/`.
- The consultation forms submit to `public/api/consultation.php`.
- Hostinger runs only the generated static files and PHP endpoint.

## Build on Windows

Double-click:

```text
build-hostinger.bat
```

The script installs dependencies, runs the production build, and creates:

```text
MITOMS-PublicHTML-Build.zip
```

Upload and extract that generated ZIP directly inside Hostinger's `public_html` folder.

## Build manually

```bash
npm install
npm run build
```

Then zip everything **inside** `out/`, including `.htaccess`.

## Email configuration

Edit these constants in `public/api/consultation.php` before building:

```php
const CONSULTATION_TO_EMAIL = 'sales@mitoms.com';
const FROM_EMAIL = 'sales@mitoms.com';
const FROM_NAME = 'MITOMS Website';
```

The mailbox should exist on Hostinger before the contact form is tested.

See `HOSTINGER-PHP-DEPLOYMENT.txt` for complete instructions.
