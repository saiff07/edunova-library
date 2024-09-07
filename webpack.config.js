const path = require('path');

module.exports = {
  entry: './index.js', // Correct path to the entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist') // Ensure this directory exists or will be created
  },
  // Add any other necessary Webpack configurations here
};
