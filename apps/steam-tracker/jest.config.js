module.exports = {
  displayName: 'steam-tracker',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/steam-tracker',
  coverageThreshold: {
    branches: 100,
    lines: 100,
    functions: 100,
    statements: 100,
  },
};
