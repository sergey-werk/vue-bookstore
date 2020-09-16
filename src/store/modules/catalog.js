const state = {
  columns: [
    'title',
    'subtitle',
    'isbn13',
    'price',
    'image',
  ],
  authors: [

  ],
  items: [
    {
      title: 'Getting to Know Vue.js',
      subtitle: 'Learn to Build Single Page Applications in Vue from Scratch',
      isbn13: '9781484237809',
      price: '$27.96',
      image: 'https://itbook.store/img/books/9781484237809.png',
      url: 'https://itbook.store/books/9781484237809',
    },
    {
      title: 'Building Progressive Web Applications with Vue.js',
      subtitle: 'Reliable, Fast, and Engaging Apps with Vue.js',
      isbn13: '9781484253335',
      price: '$19.89',
      image: 'https://itbook.store/img/books/9781484253335.png',
      url: 'https://itbook.store/books/9781484253335',
    },
    {
      title: 'Full-Stack Web Development with Vue.js and Node',
      subtitle: 'Build scalable and powerful web apps with modern web stack: MongoDB, Vue, Node.js, and Express',
      isbn13: '9781788831147',
      price: '$35.99',
      image: 'https://itbook.store/img/books/9781788831147.png',
      url: 'https://itbook.store/books/9781788831147',
    },
    {
      title: 'Building Applications with Spring 5 and Vue.js 2',
      subtitle: 'Build a modern, full-stack web application using Spring Boot and Vuex',
      isbn13: '9781788836968',
      price: '$44.99',
      image: 'https://itbook.store/img/books/9781788836968.png',
      url: 'https://itbook.store/books/9781788836968',
    },
    {
      title: 'ASP.NET Core 2 and Vue.js',
      subtitle: 'Full Stack Web Development with Vue, Vuex, and ASP.NET Core 2.0',
      isbn13: '9781788839464',
      price: '$44.99',
      image: 'https://itbook.store/img/books/9781788839464.png',
      url: 'https://itbook.store/books/9781788839464',
    },
    {
      title: 'Vuex Quick Start Guide',
      subtitle: 'Centralized State Management for your Vue.js applications',
      isbn13: '9781788999939',
      price: '$23.99',
      image: 'https://itbook.store/img/books/9781788999939.png',
      url: 'https://itbook.store/books/9781788999939',
    },
    {
      title: 'VuePress Quick Start Guide',
      subtitle: 'Build blazing-fast static websites with the power of Vue.js',
      isbn13: '9781789535754',
      price: '$29.99',
      image: 'https://itbook.store/img/books/9781789535754.png',
      url: 'https://itbook.store/books/9781789535754',
    },
    {
      title: 'Complete Vue.js 2 Web Development',
      subtitle: 'Learn Vue.js by building 6 web apps',
      isbn13: '9781789959901',
      price: '$49.99',
      image: 'https://itbook.store/img/books/9781789959901.png',
      url: 'https://itbook.store/books/9781789959901',
    },
    {
      title: 'Pro Vue.js 2',
      subtitle: '',
      isbn13: '9781484238042',
      price: '$35.16',
      image: 'https://itbook.store/img/books/9781484238042.png',
      url: 'https://itbook.store/books/9781484238042',
    },
    {
      title: 'Vue.js: Up and Running',
      subtitle: 'Building Accessible and Performant Web Apps',
      isbn13: '9781491997246',
      price: '$32.38',
      image: 'https://itbook.store/img/books/9781491997246.png',
      url: 'https://itbook.store/books/9781491997246',
    },
  ],
};

state.items = state.items.concat(state.items);

const getters = {
  item: (_state) => (itemId) => {
    const found = _state.items.find((item) => item.id === itemId);
    return found;
  },
};

export default {
  namespaced: true,
  state,
  getters,
};
