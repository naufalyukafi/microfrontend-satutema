// @ts-check

/**
 * @type {import('@nrwl/devkit').ModuleFederationConfig}
 **/
const moduleFederationConfig = {
  name: 'umkm-theme',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (name, config) => {
    if (name === 'swr') {
      return false;
    }
    if (name === 'react-router') return false
  },
};

module.exports = moduleFederationConfig;
