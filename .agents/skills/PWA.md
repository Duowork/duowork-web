---
name: progressive-web-app
dewcription: Progressive Web Apps with service workers, web manifest, offline support, installation prompts. Use for installable web apps, offline functionality, push notifications, or encountering service worker registration, cache strategy, manifest configuration errors.
---

## Progressive Web Apps (PWA)
Applications that use modern web capabilities to deliver an app-like experience to users. They combine the reach of the web with the features of native apps, such as offline support, push notifications, and installability.

## Key Features

- **Service Workers**: Background scripts that enable offline functionality, push notifications, and background sync
- **Web App Manifest**: JSON file that controls how the app appears to users and how it's launched
- **Offline Support**: Users can access the app even without an internet connection
- **Installability**: Users can "install" the app to their home screen for quick access
- **Push Notifications**: Send timely updates to users even when the app is not open
- **Background Sync**: Defer actions until the user has a stable connection

## Common Tasks

- Registering service workers for offline support
- Configuring web app manifests
- Implementing cache-first or network-first strategies
- Handling push notification subscriptions
- Creating installation prompts for users
- Debugging service worker caching issues
- Adding background sync capabilities

## When to Use

Use PWA skills when:

- Building installable web applications
- Need offline functionality for web apps
- Want to send push notifications to web users
- Developing cross-platform applications
- Migrating from native apps to the web
- Encountering service worker registration or cache strategy issues

## How to use

### Web App Manifest

```json
{
  "name": "<application name>",
  "short_name": "<application short name>",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    { "src": "/<icon name>.<type>", "sizes": "<size>", "type": "image/<type>" },
    { "src": "/<icon name>.<type>", "sizes": "<size>", "type": "image/<type>" }
  ]
}
```

### Service Worker

```javascript
const CACHE_NAME = "app-v1";
const STATIC_ASSETS = ["/", "/index.html", "/styles.css", "/app.js"];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)),
  );
});

// Fetch with cache-first strategy
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (response.status === 200) {
          const clone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    }),
  );
});
```

### Install Prompt

```javascript
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

async function installApp() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log("Install outcome:", outcome);
  deferredPrompt = null;
}
```

### Push Notification
```javascript
async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: VAPID_PUBLIC_KEY
  });

  await sendSubscriptionToServer(subscription);
}
```

## Example Use Cases

1. **Offline-first e-commerce app** - Users can browse products and place orders even without internet
2. **News app with push notifications** - Deliver breaking news alerts to users' home screens
3. **Task management PWA** - Users can add tasks offline and sync when they're back online
4. **Progressive enhancement for existing websites** - Add PWA features to improve user experience
5. **Cross-platform mobile apps** - Build apps that work on Android, iOS, and desktop


## Best Practices

- Always use HTTPS for service workers
- Keep service workers small and efficient
- Implement proper cache invalidation strategies
- Provide clear feedback to users about offline status
- Test on multiple devices and browsers
- Use versioning for service workers
- Fast loading (<3s on 3G)
- Responsive design
- Include fallback content for offline scenarios
- Installable

## Troubleshooting

If you encounter issues with PWAs, check for:

- Service worker not registering (check browser console for errors)
- Cache strategy not working as expected (use Chrome DevTools to inspect cache)
- Manifest not being recognized (ensure correct JSON format and MIME type)
- Push notifications not being received (verify notification permissions)
- Installation prompt not appearing (check browser compatibility and PWA requirements)

<!--
### Resources

- [MDN Web Docs - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_Web_Apps)
- [Google Developers - PWA](https://developer.chrome.com/docs/web/progressive-web-apps)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox) -->
