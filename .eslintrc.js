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
    'jasmine': true
  },
  'rules': {
    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx'] }],
  },
  'parser': 'babel-eslint'
};
