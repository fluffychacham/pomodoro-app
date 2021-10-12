const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@body-background': '#414066',
              '@component-background': '#414066',
              '@color-1': '#524e6f',
              '@color-2': '#676380',
              '@color-3': '#7a7993',
              '@color-4': '#9795aa',
              '@color-5': '#bdbbc8',
              '@color-6': '#e3e1e6',
              '@color-7': '#ecdee2',
              '@color-8': '#f6e8e9',
              '@color-9': '#f9ecec',
              '@color-10': '#fbeeed',
            },
            javascriptEnabled: true,
          },
        },
      },
    }
  ]
}
