# Deploying to cPanel (SSH access)

This site needs a real Node.js server, not static hosting — it has an API
route (`/api/contact`, sends email via SMTP) and dynamic routes
(`/opengraph-image`, `/sitemap.xml`). That means your cPanel account must
have the **"Setup Node.js App"** tool (Application Manager, built on
CloudLinux's Node.js Selector). If you don't see that in cPanel, your
hosting plan doesn't support Node and this app can't run there as-is.

Node version: pick the **newest available** in the Node.js Selector —
Next.js 16 needs a recent Node 20.x/22.x LTS. `node -v` after activating
the app's environment (step 2) to confirm.

## Your setup

Hosting account: `promarkbd.com` (this is the cPanel account/primary
domain — a separate, unrelated site, don't touch its `public_html`).
`kahinistudios.com` is added as a parked/addon domain with its own
document root already provisioned at:

```
/home/promarkb/kahinistudios.com
```

(Confirm this in cPanel → **Domains** → the Document Root column for
`kahinistudios.com`, before the first deploy — it should NOT point back
into `public_html`. If it does, stop and park/addon it properly first, or
the app would end up serving from the same folder as promarkbd.com's site.)

That folder is what the steps below use as the app's home.

## One-time setup

1. **Get the code onto the server.** Over SSH:
   ```bash
   cd /home/promarkb/kahinistudios.com
   git clone <your-repo-url> .
   ```
   (Or upload via SFTP/File Manager, minus `node_modules`, `.next`, `.git`.)

2. **Create the Node app in cPanel** (Setup Node.js App → Create Application):
   - **Application root**: `kahinistudios.com` (i.e.
     `/home/promarkb/kahinistudios.com`)
   - **Application URL**: `kahinistudios.com` (pick it from the domain
     dropdown — it's already registered to this account)
   - **Application startup file**: `.next/standalone/server.js` (doesn't
     exist yet — created by the build in step 4 below, but cPanel lets you
     save this path now)
   - **Node.js version**: the newest available

   Saving this provisions a dedicated Node virtualenv and shows an "Enter
   to the virtual environment" command — something like:
   ```bash
   source /home/promarkb/nodevenv/kahinistudios.com/20/bin/activate && cd /home/promarkb/kahinistudios.com
   ```
   (cPanel shows you the exact path/version — copy it from there, this is
   just an example.) Run that over SSH before any `npm`/`node` command
   below — it points `npm`/`node` at the version cPanel assigned this app,
   not the system default.

3. **Set environment variables** in the same cPanel screen (see
   `.env.example` for the full list): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
   `SMTP_PASS`, `SMTP_SECURE`, `CONTACT_TO_EMAIL`. These reach the *running*
   app.

   `NEXT_PUBLIC_SITE_URL` is different — it's inlined into the client
   bundle at **build time**, so cPanel's env var panel won't affect it.
   Export it in your SSH session before building instead:
   ```bash
   export NEXT_PUBLIC_SITE_URL=https://kahinistudios.com
   ```

## Every deploy (first time and updates)

```bash
# 1. Activate this app's Node environment (exact command from cPanel's
#    Setup Node.js App page for this app)
source /home/promarkb/nodevenv/kahinistudios.com/20/bin/activate
cd /home/promarkb/kahinistudios.com

# 2. Pull the latest code
git pull

# 3. Install ALL dependencies (build needs devDependencies like typescript;
#    they aren't shipped in the final output, just needed to produce it)
npm install

# 4. Build + assemble the standalone deploy folder (public/, .next/static)
export NEXT_PUBLIC_SITE_URL=https://kahinistudios.com
./scripts/build-for-cpanel.sh
```

Then in cPanel's Setup Node.js App screen, click **Restart**. Passenger
picks up the new `.next/standalone/server.js`.

## What "standalone" output means here

`next.config.ts` sets `output: "standalone"`. A normal `next build` +
`next start` needs the full `node_modules` present on the server forever —
often too much for shared hosting, and risks lockfile/version drift on
every deploy. Standalone mode traces only what's actually needed at
runtime into `.next/standalone`, including a self-contained `server.js`
that listens on `process.env.PORT` (which is exactly what Passenger expects
from a Node app). `scripts/build-for-cpanel.sh` runs the build and copies
the two things standalone mode deliberately leaves out — `public/` and
`.next/static` — verified locally end-to-end (booted the standalone
server, hit `/`, a poster image, `/api/contact`, and `/sitemap.xml`, all
200 as expected).

## Verifying after deploy

- Visit `kahinistudios.com` — homepage should load with posters, and
  `promarkbd.com` should be completely unaffected.
- `/sitemap.xml` and `/robots.txt` should return real content, not 404.
- Submit the contact form once for real. If SMTP env vars are missing or
  wrong, the form shows a graceful "something went wrong" toast rather than
  crashing — check the app's error log in cPanel (Setup Node.js App →
  your app → shows a log path) for the specific SMTP error if that happens.
