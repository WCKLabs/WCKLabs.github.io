// WCK Innovation Kitchen lab — service worker skeleton

// Install: can be expanded later for asset caching.
self.addEventListener("install", (event) => {
  // Immediately activate updated SW on install.
  self.skipWaiting();
});

// Activate: claim clients so the SW starts controlling open tabs.
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Placeholder push handler.
// Later, when we have a backend sending real Web Push messages,
// we'll parse event.data and show a meaningful notification.
self.addEventListener("push", (event) => {
  let data = { title: "WCK lab", body: "New update from WCK Innovation Kitchen." };

  try {
    if (event.data) {
      const parsed = event.data.json();
      data = {
        title: parsed.title || data.title,
        body: parsed.body || data.body
      };
    }
  } catch (e) {
    // If parsing fails, fall back to default text.
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png"
    })
  );
});
