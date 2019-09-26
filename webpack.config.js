const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const loadersOfStyles = [
  {
    loader: 'css-loader',
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: [
        autoprefixer({
          browsers: [
            'ie >= 8',
            'last 3 version',
          ],
        }),
      ],
    },
  },
  {
    loader: 'sass-loader',
  },
];

module.exports = (env) => {
  const common = {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      // eslint-disable-next-line no-undef
      path: path.join(__dirname, 'public')
    },
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        path: path.join(__dirname, 'public'),
        filename: 'index.html',
        template: 'assets/index.html',
        files: {
          css: [
            'css/main.css',
          ],
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
      ],
    },
  };

  switch (env) {
    case 'dev':
      return merge([
        common,
        {
          devServer: {
            // eslint-disable-next-line no-undef
            contentBase: path.join(__dirname, 'public'),
            compress: false,
            port: 1337,
            historyApiFallback: true,
          },
          module: {
            rules: [
              {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'style-loader',
                  },
                  ...loadersOfStyles
                ],
              },
            ],
          },
          devtool: 'source-map',
        }
      ]);

    case 'build':
      return merge([
        common,
        {
          module: {
            rules: [
              {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: '../',
                      fallback: 'style-loader',
                    }
                  },
                  ...loadersOfStyles
                ],
              },
            ],
          },
          plugins: [
            new MiniCssExtractPlugin({
              filename: 'css/main.css',
            }),
          ],
        }
      ]);
  }
};
