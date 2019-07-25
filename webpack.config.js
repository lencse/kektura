const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const commandLineArgs = require('command-line-args')
const webpackMerge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')

const args = commandLineArgs([
    { name: 'watch', type: Boolean },
    { name: 'open', type: Boolean },
])

const devMode = true === args.watch || true === args.open

const dirs = {
    dist: 'public',
    views: 'build/views'
}

const extra = devMode ?
    {
        mode: 'development',
        devtool: 'inline-source-map',
        plugins: [
            new LiveReloadPlugin()
        ],
        devServer: {
            port: 6100
        }
    } : {
        mode: 'production',
        optimization: {
            minimizer: [
                new TerserPlugin()
            ]
        },
        plugins: [
            new OptimizeCssPlugin({
                cssProcessor: cssnano,
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: true
            })
        ]
    }

const filenames = {
    js: devMode ? '[name].js' : '[name].[hash].js',
    css: devMode ? '[name].css' : '[name].[hash].css',
    cssChunks: devMode ? '[id].css' : '[id].[hash].css'
}

module.exports = webpackMerge(
    {
        entry: [
            './build/compile/src/app.js',
            './styles/main.scss'
        ],
        output: {
            filename: filenames.js,
            path: path.resolve(__dirname, dirs.dist)
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: `${dirs.views}/index.ejs`,
                filename: 'index.html',
                inject: 'body'
            }),
            new MiniCssExtractPlugin({
                filename: filenames.css,
                chunkFilename: filenames.cssChunks
            })
        ],
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {}
                        },
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        performance: {
            hints: false
        }
    },
    extra
)