const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')


module.exports = (env, argv) => ({
  // http://bit.ly/2w4ndaR - new in Webpack 4.
  mode: env.prod ? 'production' : 'development',

  /*
    http://bit.ly/2vZm5Ft
    The base directory, an absolute path, for resolving
    entry points and loaders from configuration.
  */
  context: path.resolve(__dirname, './'),

  /*
    http://bit.ly/2w3Ahxa
    The point(s) to enter the application.
  */
  entry: (() => {
    const entry = {
      datepicker: path.resolve(__dirname, 'src/datepicker.js'),
      app: env.dev
        ? path.resolve(__dirname, 'sandbox/dev/dev-app.js')
        : env.test
          ? path.resolve(__dirname, 'sandbox/test/test-app.js')
          : null,
      'shadow-dom': env.test && path.resolve(__dirname, 'sandbox/test/shadow-dom.js')
    }

    return Object.keys(entry).reduce((acc, key) => {
      if (entry[key]) acc[key] = entry[key]
      return acc
    }, {})
  })(),

  /*
    http://bit.ly/2w55YpG
    Instructs Webpack to target a specific environment.
    This is the default value.
  */
  target: 'web',

  /*
    http://bit.ly/2JojX2u
    The top-level output key contains a set of options instructing webpack
    on how and where it should output your bundles, assets and anything else
    you bundle or load with webpack.
  */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: env.prod ? 'datepicker.min.js' : '[name].js',
    library: 'datepicker', // The name of the global variable the library is set to.
    libraryTarget: 'umd' // "Universal" export - Node, browser, amd, etc.
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'sandbox/dev'),
          path.resolve(__dirname, 'sandbox/test')
        ],
        use: [
          MiniCssExtractPlugin.loader, // https://goo.gl/uUBr8G
          'css-loader',
          'postcss-loader', // https://goo.gl/BCwCzg - needs to be *after* `css-loader`.
          'sass-loader'
        ]
      }
    ].filter(Boolean)
  },
  devServer: {
    /*
      https://goo.gl/eFdUfe
      Tell the dev server where to serve content from.
      This is only necessary if you want to serve static files.
      Content not served from Webpack's devServer is served from here.
    */
    contentBase: path.resolve(__dirname, './'),

    /*
      https://goo.gl/A8ZvxG
      Want to view your site on your phone?
      Make sure your computer and phone are on the same wifi network,
      and navigate to your computer's ip addres: 192.1.2.3:<dev server port>
    */
    host: '0.0.0.0',

    // https://goo.gl/fZ1Hff
    open: true,

    // https://goo.gl/EVMMyC
    port: 9001,

    /*
      https://goo.gl/mrysGp, https://goo.gl/srfqLB
      Nobody wants to see 0.0.0.0 in the browser. This get's rid of that.
    */
    public: 'http://localhost:9001',

    // http://bit.ly/3ckBowj - automatically open a specific html file without it being in the url.
    index: env.dev ? 'dev.html' : 'test.html'
  },

  devtool: !env.prod && 'cheap-module-eval-source-map',

  // https://goo.gl/bxPV7L
  optimization: {
    minimize: !!env.prod,
    minimizer: [
      // https://goo.gl/yWD5vm - List of reasons we're using Terser instead (Webpack is too!).
      new TerserPlugin({ // https://goo.gl/YgdtKb
        cache: true, // https://goo.gl/QVWRtq
        parallel: true, //https://goo.gl/hUkvnK
        terserOptions: { // https://goo.gl/y3psR1
          ecma: 5,
          output: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: env.prod ? 'datepicker.min.css' : '[name].min.css' // https://stackoverflow.com/a/56457578/2525633
    }),

    // Development & test.
    !env.prod && new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `sandbox/${env.dev ? '/dev/dev' : '/test/test'}.ejs`),
      title: env.dev ? 'Datepicker Development' : 'Cypress E2E Testing',
      filename: env.dev ? 'dev.html' : 'test.html',

      // http://bit.ly/2SSVJlc - Order Webpack assets manually. Requires `entry` above to be an object.
      chunks: [
        'datepicker',
        'app',
      ],
      chunksSortMode: 'manual'
    }),

    // Test - shadow DOM tests.
    !env.prod && env.test && new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'sandbox/test/shadow-dom.ejs'),
      title: 'Cypress E2E Testing - Shadow DOM',
      filename: 'shadow-dom.html',
      chunks: [
        'datepicker',
        'shadow-dom',
        'app'
      ],
      chunksSortMode: 'manual'
    })
  ].filter(Boolean)
})
