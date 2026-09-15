/*! coi-serviceworker v0.1.7 - Guido Zuidhof and contributors, MIT License */
let coepCredentialless = false;
if (typeof window === 'undefined') {
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

  self.addEventListener('message', (ev) => {
    if (!ev.data) {
      return;
    }
    if (ev.data.type === 'deregister') {
      self.registration
        .unregister()
        .then(() => {
          return self.clients.matchAll();
        })
        .then((clients) => {
          clients.forEach((client) => client.navigate(client.url));
        });
    }
  });

  self.addEventListener('fetch', function (event) {
    const request = event.request;
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
      return;
    }

    if (request.mode === 'navigate') {
      event.respondWith(
        fetch(request)
          .then((response) => {
            if (response.status === 0) {
              return response;
            }

            const newHeaders = new Headers(response.headers);
            newHeaders.set('Cross-Origin-Embedder-Policy', coepCredentialless ? 'credentialless' : 'require-corp');
            newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');

            return new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: newHeaders,
            });
          })
          .catch((e) => console.error(e))
      );
      return;
    }

    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 0) {
            return response;
          }

          const newHeaders = new Headers(response.headers);
          newHeaders.set('Cross-Origin-Embedder-Policy', coepCredentialless ? 'credentialless' : 'require-corp');
          newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');

          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
          });
        })
        .catch((e) => console.error(e))
    );
  });
} else {
  (() => {
    const reloadedBySelf = window.sessionStorage.getItem('coiReloadedBySelf');
    window.sessionStorage.removeItem('coiReloadedBySelf');
    const coepDegrading = reloadedBySelf === 'coepdegrade';

    // You can customize behavior by defining window.coi before this script runs
    const custom = {
      shouldRegister: () => true,
      shouldDeregister: () => false,
      coepCredentialless: () => false,
      doReload: () => window.location.reload(),
      quiet: false,
      ...window.coi,
    };

    coepCredentialless = custom.coepCredentialless();

    const isSecureContext = window.isSecureContext;

    if (!isSecureContext) {
      !custom.quiet && console.log('COI: Cross-Origin Isolation requires a secure context (HTTPS or localhost).');
      return;
    }

    if (window.crossOriginIsolated) {
      !custom.quiet && console.log('COI: Cross-Origin Isolation is active.');
      return;
    }

    if (!('serviceWorker' in navigator)) {
      !custom.quiet && console.error('COI: Service Workers are not supported in this browser environment.');
      return;
    }

    const n = navigator.serviceWorker;

    if (custom.shouldDeregister()) {
      n.getRegistrations().then((regs) => {
        for (let r of regs) {
          r.unregister();
        }
      });
      return;
    }

    if (custom.shouldRegister()) {
      n.register(window.document.currentScript ? window.document.currentScript.src : 'coi-serviceworker.js', {
        scope: './',
      }).then(
        (registration) => {
          !custom.quiet && console.log('COI: Service Worker registered successfully with scope:', registration.scope);

          registration.addEventListener('updatefound', () => {
            !custom.quiet && console.log('COI: Reloading page to apply Cross-Origin Isolation...');
            custom.doReload();
          });

          // If the registration is already active but the page is not yet isolated, reload once
          if (registration.active && !n.controller) {
            !custom.quiet && console.log('COI: Reloading page to claim control...');
            custom.doReload();
          }
        },
        (err) => {
          !custom.quiet && console.error('COI: Service Worker registration failed:', err);
        }
      );
    }
  })();
}
