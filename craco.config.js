// Customize webpack to avoid bundling Node.js core modules in the browser.
// libxml2-wasm conditionally references 'module' (Node core) which webpack
// tries to resolve during static analysis. Mark them as unavailable.
const path = require('path');
module.exports = {
  webpack: {
    configure: (config) => {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        module: false,
        fs: false,
        path: false,
        url: false,
        // add typical node builtins as false to be safe
        util: false,
        stream: false,
        buffer: false,
        crypto: false,
      };

      // Suppress noisy source map warnings from libxml2-wasm (no .mts sources packaged)
  const libxml2WasmLib = path.resolve(process.cwd(), 'node_modules/libxml2-wasm/lib');
      if (config.module && Array.isArray(config.module.rules)) {
        config.module.rules.forEach((rule) => {
          // CRA's source-map-loader rule has enforce: 'pre'
          const uses = rule && (rule.use || []);
          const isSourceMapLoader =
            rule && rule.enforce === 'pre' && (
              (rule.loader?.includes?.('source-map-loader')) ||
              (Array.isArray(uses) && uses.some((u) => u.loader?.includes?.('source-map-loader')))
            );
          if (isSourceMapLoader) {
            const toExclude = [libxml2WasmLib];
            if (Array.isArray(rule.exclude)) {
              rule.exclude.push(...toExclude);
            } else if (rule.exclude) {
              rule.exclude = [rule.exclude, ...toExclude];
            } else {
              rule.exclude = toExclude;
            }
          }
        });
      }

      config.ignoreWarnings = [
        ...(config.ignoreWarnings || []),
        /Failed to parse source map.*libxml2-wasm/,
      ];
      return config;
    },
  },
};
