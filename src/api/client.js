const products = [];

export default {
  getProducts(cb) {
    setTimeout(() => cb(products), 100);
  },

  buyProducts(prod, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      // eslint-disable-next-line no-unused-expressions
      (Math.random() > 0.5) ? cb() : errorCb();
    }, 100);
  },
};
