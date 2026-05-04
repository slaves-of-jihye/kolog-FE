export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)(?:\((.*)\))?!?:: (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'Feat',
        'Fix',
        'Style',
        'Refactor',
        'Docs',
        'Chore',
        'feat',
        'fix',
        'style',
        'refactor',
        'docs',
        'chore',
      ],
    ],
    'type-case': [0],
  },
};
