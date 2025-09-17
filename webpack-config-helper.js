/**
 * Webpack Configuration Helper for CKEditor React Wrapper
 * 
 * This helper provides webpack configuration to prevent CKEditor duplicated modules error.
 * Use this in your webpack.config.js or next.config.js
 */

const path = require('path');

/**
 * Creates webpack configuration to resolve CKEditor duplicated modules issue
 * @param {Object} existingConfig - Existing webpack configuration
 * @returns {Object} Updated webpack configuration
 */
function createCKEditorWebpackConfig(existingConfig = {}) {
  return {
    ...existingConfig,
    resolve: {
      ...existingConfig.resolve,
      alias: {
        ...existingConfig.resolve?.alias,
        // Force webpack to use only one version of CKEditor modules
        '@ckeditor/ckeditor5-editor-classic': require.resolve('@ckeditor/ckeditor5-editor-classic'),
        '@ckeditor/ckeditor5-core': require.resolve('@ckeditor/ckeditor5-core'),
        '@ckeditor/ckeditor5-engine': require.resolve('@ckeditor/ckeditor5-engine'),
        '@ckeditor/ckeditor5-ui': require.resolve('@ckeditor/ckeditor5-ui'),
        '@ckeditor/ckeditor5-utils': require.resolve('@ckeditor/ckeditor5-utils'),
        '@ckeditor/ckeditor5-clipboard': require.resolve('@ckeditor/ckeditor5-clipboard'),
        '@ckeditor/ckeditor5-enter': require.resolve('@ckeditor/ckeditor5-enter'),
        '@ckeditor/ckeditor5-paragraph': require.resolve('@ckeditor/ckeditor5-paragraph'),
        '@ckeditor/ckeditor5-select-all': require.resolve('@ckeditor/ckeditor5-select-all'),
        '@ckeditor/ckeditor5-typing': require.resolve('@ckeditor/ckeditor5-typing'),
        '@ckeditor/ckeditor5-undo': require.resolve('@ckeditor/ckeditor5-undo'),
        '@ckeditor/ckeditor5-upload': require.resolve('@ckeditor/ckeditor5-upload'),
        '@ckeditor/ckeditor5-watchdog': require.resolve('@ckeditor/ckeditor5-watchdog'),
        '@ckeditor/ckeditor5-widget': require.resolve('@ckeditor/ckeditor5-widget'),
      },
    },
    // Additional optimization to prevent duplication
    optimization: {
      ...existingConfig.optimization,
      splitChunks: {
        ...existingConfig.optimization?.splitChunks,
        cacheGroups: {
          ...existingConfig.optimization?.splitChunks?.cacheGroups,
          ckeditor: {
            test: /[\\/]node_modules[\\/]@ckeditor[\\/]/,
            name: 'ckeditor',
            chunks: 'all',
            priority: 10,
          },
        },
      },
    },
  };
}

/**
 * Next.js specific configuration
 * Use this in your next.config.js
 */
function createNextJSConfig() {
  return {
    webpack: (config, { isServer }) => {
      // Apply CKEditor configuration
      const ckeditorConfig = createCKEditorWebpackConfig(config);
      
      // For server-side rendering, we need to handle CKEditor differently
      if (isServer) {
        config.externals = config.externals || [];
        config.externals.push({
          '@ckeditor/ckeditor5-editor-classic': 'commonjs @ckeditor/ckeditor5-editor-classic',
        });
      }
      
      return ckeditorConfig;
    },
    // Disable static optimization for pages using CKEditor
    experimental: {
      ...config.experimental,
      esmExternals: 'loose',
    },
  };
}

module.exports = {
  createCKEditorWebpackConfig,
  createNextJSConfig,
};
