// // @ts-check

// /**
//  * @type {import('@nrwl/devkit').ModuleFederationConfig}
//  **/
// const moduleFederationConfig = {
//   name: 'host',
//   remotes: ['umkm-theme'],
// };

// module.exports = moduleFederationConfig;

module.exports = {
  name: 'host',
  remotes: ['umkm-theme'],
  shared: (name, config) => {
    // We want lodash to be tree shaken, and bundled into each host/remote separately.
    if (name === 'swr') {
      return false;
    }

    if (name === '@hookform/resolvers/yup') return false
  },
};
