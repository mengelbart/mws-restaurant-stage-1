
const dbPromise = idb.open('restaurant-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('restaurants', {keyPath: 'id'});
});
