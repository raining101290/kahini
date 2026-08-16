# Deploying to cPanel (no terminal access)

This site needs a real Node.js server, not static hosting — it has an API
route (`/api/contact`, sends email via SMTP) and dynamic routes
(`/opengraph-image`, `/sitemap.xml`). That means your cPanel account must
have the **"Setup Node.js App"** tool (Application Manager, built on
CloudLinux's Node.js Selector). If you don't see that in cPanel, your
hosting plan doesn't support Node and this app can't run there as-is.

## Your setup

Hosting account: `promarkbd.com` (a separate, unrelated site — don't touch
its `public_html`). `kahinistudios.com` has its own document root:

```
/home/promarkb/kahinistudios.com
```

That's where the app goes.

## Why this guide doesn't use `git clone` / `npm run build` directly

Normally you'd SSH in, `git clone`, then `npm install && npm run build`.
Without a terminal, cPanel gives you exactly one build trigger: the **"Run
NPM Install"** button on the Setup Node.js App screen. This project is set
up so that button does the whole job — installing dependencies **and**
building — via a `postinstall` script (`scripts/postinstall-build.js`) that
only activates when you set `CPANEL_BUILD=1` as an environment variable (so
it doesn't slow down or interfere with anyone's normal local development).

## Step 1 — Get the source onto the server

You don't need `node_modules` or a `.next` folder — those get created by
the "Run NPM Install" step. Just the source:

1. Download the project source as a zip (from wherever you're reading this
   — ask whoever's helping you package it, or in GitHub: the repo page →
   **Code → Download ZIP**).
2. cPanel → **File Manager** → navigate into `kahinistudios.com`.
3. **Upload** → select the zip → wait for it to finish.
4. Right-click the uploaded zip → **Extract**. This unpacks the source
   directly into `kahinistudios.com`.
5. Delete the zip file afterward (housekeeping, not required).

You should now see `src/`, `public/`, `package.json`, etc. directly inside
`/home/promarkb/kahinistudios.com`.

## Step 2 — Create the Node.js app

cPanel → **Setup Node.js App** → **Create Application**:

- **Node.js version**: the newest available (Next.js 16 needs a recent
  Node 20.x/22.x LTS)
- **Application mode**: Production
- **Application root**: `kahinistudios.com`
- **Application URL**: `kahinistudios.com` (pick it from the domain
  dropdown)
- **Application startup file**: `.next/standalone/server.js`
  (doesn't exist yet — created by Step 3 — but cPanel lets you type this
  path in now and save)

Click **Create**.

## Step 3 — Set environment variables, then build

Still on this app's page, scroll to **Environment Variables** and add:

```
CPANEL_BUILD=1
NEXT_PUBLIC_SITE_URL=https://kahinistudios.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=hello@kahinistudios.com
SMTP_PASS=<your Google Workspace App Password>
```

(Leave `SMTP_PASS` blank / skip the SMTP vars entirely for now if you just
want the simulated-send demo behavior a bit longer — see the note on
simulation mode below.)

**Save.** Then scroll up and click **Run NPM Install**.

This installs dependencies, then automatically runs the production build
and assembles everything the server needs (this takes a minute or two —
Next.js builds are not instant). Watch the output cPanel shows; it should
end with something like:

```
[postinstall-build] done — startup file is .next/standalone/server.js
```

If it stops with an error instead, see **Troubleshooting** below before
continuing.

## Step 4 — Restart

Back on the Setup Node.js App screen for this app, click **Restart**.

## Step 5 — Verify

- Visit `kahinistudios.com` — homepage should load with posters, and
  `promarkbd.com` should be completely unaffected.
- `/sitemap.xml` and `/robots.txt` should return real content, not 404.
- Submit the contact form. If you left SMTP unset, you'll see the same
  success message a real send would show, but nothing is actually
  emailed — check the app's error log (this same cPanel screen shows a log
  file path) for a line starting `[contact] SMTP not configured —
  simulating a successful send`, which confirms the form itself is working
  correctly end-to-end. Once you add real `SMTP_*` values and re-run **Run
  NPM Install** + **Restart**, submissions start actually sending.

## Every future update

Repeat Steps 1 and 3's "Run NPM Install" — re-upload the changed source
(replacing the old files) and click **Run NPM Install** again, then
**Restart**. There's no way to `git pull` without a terminal, so re-zipping
and re-uploading is the update mechanism here.

## Troubleshooting

- **"Run NPM Install" fails or times out**: shared hosting sometimes limits
  memory available to build processes, and a Next.js production build can
  need more than a very small plan allows. If it fails consistently, that's
  the most likely cause — worth asking your hosting provider what memory
  limit applies to Node apps on this account.
- **It seems to skip the build (no `[postinstall-build]` lines in the
  output)**: some hosts run npm install with script execution disabled for
  security. If so, this specific approach can't work without a terminal —
  worth asking your hosting provider to either enable shell/SSH access for
  this account, or run one `npm run build` for you as a one-time favor.
- **Site loads but images look broken / contact form 500s**: almost always
  a leftover env var typo, or the build partially failed. Re-check Step 3's
  values, re-run **Run NPM Install**, and check the error log.
