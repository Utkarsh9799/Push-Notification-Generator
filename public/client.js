const publicVapidKey = 'BGElE2g3jSv8XpleYspc4A9YX-NGcub-s4pK9uX-zojO3FPpDBzYqaENzOgyMP4dXS-SfQ9Q2ZYh30werqTwnrA';

// Checking for service worker
if('serviceWorker' in navigator)
{
    send().catch(err => console.log(err));
}

// Registering service worker, push and send push
async function send()
{
    // Registering service worker
    console.log('Registering service worker..');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('Service worker registered!');

    // Registering push
    console.log('Registering push..');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    console.log('Push registered!');

    //Sending push notification
    console.log('Sending push notification');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push Sent!')
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}