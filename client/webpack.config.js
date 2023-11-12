import nodeExternals from 'webpack-node-externals';

export default {
  // Other webpack configuration options...
  target: 'node',
  externals: [nodeExternals()],
  // Other webpack configuration options...
};