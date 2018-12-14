const getRelPath = path => __dirname + path

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: true,
        antd: true,
        routes: {
          exclude: [/model\.(j|t)sx?$/, /service\.(j|t)sx?$/, /models\//, /components\//, /services\//]
        },
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: '/components/plugins/Loading',
          level: 1
        },
        pwa: {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'cdn',
          },
        },
      }
    ]
  ],
  disableCSSModules: true,
  ignoreMomentLocale: true,
  alias: {
    components: getRelPath('/src/components'),
    config: getRelPath('/src/config'),
    images: getRelPath('/src/images'),
    pages: getRelPath('/src/pages'),
    utils: getRelPath('/src/utils'),
    services: getRelPath('/src/services'),
    layouts: getRelPath('/src/layouts')
  }
}
