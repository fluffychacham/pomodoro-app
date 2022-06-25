const {CracoAliasPlugin, configPaths} = require('react-app-rewire-alias');

const aliasMap = configPaths('./tsconfig.paths.json');
const CracoLessPlugin = require('craco-less');

module.exports = {
   plugins: [
      {
         plugin: CracoAliasPlugin,
         options: {alias: aliasMap}
      },
      {
         plugin: CracoLessPlugin,
         options: {
            lessLoaderOptions: {
               lessOptions: {
                  javascriptEnabled: true,
               },
            },
         },
      }
   ]
}