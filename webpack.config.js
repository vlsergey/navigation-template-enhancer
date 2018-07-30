const path = require('path');
const StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
  mode: "none", // no defaults

  entry: './src/app.js',

  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        // enforce: "pre",
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true,
        }
      },
      // configure replacements for file patterns
      {
        test : /\.js$/,
        loader : StringReplacePlugin.replace({
          replacements : [ {
            pattern : /\/\/fb\.me\//ig,
            replacement : function(match, p1, offset, string) {
              return "//fb-removeme.me/";
            }
          },
         ]
        })
      }
    ]
  },

  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ],
  },

  performance: {
    hints: false,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },

  plugins: [
      // an instance of the plugin must be present
      new StringReplacePlugin()
   ]

};
