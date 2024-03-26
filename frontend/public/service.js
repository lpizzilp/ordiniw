self.addEventListener('install', function () {
    console.log('Service Worker installato.');
});

self.addEventListener('activate', function () {
    console.log('Service Worker attivato.');
});

self.addEventListener('message', function (event) {
    // Esegui qui la logica per mostrare la notifica
    self.registration.showNotification("Preparati in cassa", {
        body: "Il tuo numero sta per essere raggiunto da quello dell'eliminacode, preparati in cassa.\n Numero corrente " + event.data.parametro,
        Image: "/Icona.png",
        badge: "/Icona.png",
        vibrate: [500, 200, 500],
        requireInteraction: true,
        showOnLockScreen: true,
        data: {
            messageId: 12345,
            currentmum: event.data.parametro,
            url: "https://localhost:8080/?id=001"
            // Altri dati pertinenti
        }
        // Altre opzioni per la notifica
    });
});

self.addEventListener('notificationclick', function (event) {
    // Chiudi la finestra della notifica
    event.notification.close();

    // Prendi l'URL dall'oggetto 'data' della notifica
    var url = event.notification.data.url;

    // Apri l'URL
    event.waitUntil(
        clients.openWindow(url)
    );
});
