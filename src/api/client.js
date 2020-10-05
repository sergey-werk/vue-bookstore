const delay = 1500;

export default {
  fetchItems(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch(url)
          .then((r) => r.json())
          .then((jsonObj) => {
            resolve(jsonObj);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
            reject(new Error('Fetch error.'));
          });
      }, delay);
    });
  },
  addItem(url, book, cb, errorCb) {
    setTimeout(() => {
      // simulate random failure.
      // eslint-disable-next-line no-unused-expressions
      (Math.random() > 0.5) ? cb() : errorCb();
    }, delay);
  },
};
