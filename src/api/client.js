const delay = 1500; // emulate network latency

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
  updateItems(url, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log('Items update: ', data);

        // simulate random failure.
        if (Math.random() > 0.5) {
          resolve({});
        } else {
          reject(new Error('Rangom failure'));
        }

        // TODO: post/put, not implemented yet.
      }, delay);
    });
  },
  deleteItems(url, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log('Items delete: ', data);

        // simulate random failure.
        if (Math.random() > 0.5) {
          resolve({});
        } else {
          reject(new Error('Rangom failure'));
        }

        // TODO: delete, not implemented yet.
      }, delay);
    });
  },
};
