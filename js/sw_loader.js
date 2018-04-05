
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('registered sw');
  }).catch((error) => {
    console.log('Failed to register sw', error);
  });
}
