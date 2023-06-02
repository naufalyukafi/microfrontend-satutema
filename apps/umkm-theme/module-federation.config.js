const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const CssnanoPlugin = require('cssnano');

const moduleFederationConfig = {
  name: 'umkm-theme',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (name, config) => {
  },
  optimization: {
    sideEffects: false,
    minimize: true,
    minimizer: [
      new TerserPlugin(), // Plugin untuk mengompresi dan meminify JavaScript
      new CssMinimizerPlugin({ // Plugin untuk mengompresi dan meminify CSS
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }, // Menghapus komentar CSS
            },
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CompressionPlugin(), // Plugin untuk mengaktifkan kompresi gzip
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/images', to: 'assets/images' }, // Menyalin folder gambar
      ],
    }),
    new ImageminWebpackPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }), // Plugin untuk mengompresi gambar
    new CssnanoPlugin(), // Plugin untuk mengompresi CSS
  ],
};

module.exports = moduleFederationConfig;
