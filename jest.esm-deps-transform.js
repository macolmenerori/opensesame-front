// Jest transformer for ESM-only dependencies (react-router v8 and its `cookie-es` dep).
//
// ts-jest happily down-levels their ESM to CommonJS, but it cannot rewrite
// `import.meta`, which react-router uses in a single file
// (lib/dom/ssr/routeModules.js) to detect Vite HMR in framework mode. That code
// path is unreachable in this app, so we neutralise the expression before
// handing the source to ts-jest.
const { default: tsJest } = require('ts-jest');

const tsJestTransformer = tsJest.createTransformer();

const stripImportMeta = (sourceText) => sourceText.replace(/import\.meta/g, '({})');

module.exports = {
  canInstrument: false,
  process(sourceText, sourcePath, options) {
    return tsJestTransformer.process(stripImportMeta(sourceText), sourcePath, options);
  },
  getCacheKey(sourceText, sourcePath, options) {
    return tsJestTransformer.getCacheKey(stripImportMeta(sourceText), sourcePath, options);
  }
};
