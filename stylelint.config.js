export default {
  extends: ['stylelint-config-standard-scss'],

  ignoreFiles: ['dist/**/*', 'coverage/**/*', 'storybook-static/**/*'],

  rules: {
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'declaration-block-no-redundant-longhand-properties': null,
  },
};
