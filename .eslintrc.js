module.exports = {
  'extends': 'airbnb',
  'plugins': [
    'react',
    'jsx-a11y',
    'import'
  ],
  'env': {
    'browser': true,
    'node': true,
    'mocha': true
  },
  'rules': {
    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx'] }],
    'global-require': 'off',
  },
  'parser': 'babel-eslint'
};
