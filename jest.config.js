module.exports = {
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  collectCoverage: false,
  globalSetup: '<rootDir>/jest-global-setup.js',
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // <https://jestjs.io/docs/webpack#mocking-css-modules>
    '^.+\\\\.module\\\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '\\.(css|scss)$': '<rootDir>/src/mocks/fileMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/src/mocks/fileMock.js`
  },
  moduleDirectories: ['node_modules', 'src', '<rootDir>/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.github/',
    '<rootDir>/build/',
    '<rootDir>/public/'
  ],
  transform: {
    // Must come first: ESM-only deps need `import.meta` neutralised before ts-jest
    '/node_modules/.+\\.(js|mjs)$': '<rootDir>/jest.esm-deps-transform.js',
    '^.+\\.(js|jsx|mjs|ts|tsx)$': ['ts-jest']
  },
  // react-router v8 and its `cookie-es` dep are ESM-only, so they must be
  // transpiled to CJS instead of being skipped like the rest of node_modules.
  // The `.pnpm/` lookahead is needed because pnpm stores packages at
  // /node_modules/.pnpm/<pkg>@<version>/node_modules/<pkg>/
  transformIgnorePatterns: [
    '/node_modules/(?!\\.pnpm/)(?!react-router/)(?!cookie-es/)',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  testEnvironment: 'jest-environment-jsdom',
  testTimeout: 15000,
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/jest.polyfills.js'],
  testEnvironmentOptions: {
    customExportConditions: ['']
  }
};
