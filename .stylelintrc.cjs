module.exports = {
  extends: [
    'stylelint-config-recess-order',
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended',
    'stylelint-config-recommended-scss',
    'stylelint-prettier',
  ],
  rules: {},
  plugins: ['stylelint-scss'],
  customSyntax: 'postcss-scss',
};
