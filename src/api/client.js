export default {
  fetchItems(url, cb, errorCb) {
    fetch(url)
      .then((r) => r.json())
      .then((jsonObj) => {
        setTimeout(() => cb(jsonObj), 1500); // Emulate network delay
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        if (errorCb) errorCb(error);
      });
  },
  addItem(url, book, cb, errorCb) {
    setTimeout(() => {
      // simulate random failure.
      // eslint-disable-next-line no-unused-expressions
      (Math.random() > 0.5) ? cb() : errorCb();
    }, 100);
  },
};
