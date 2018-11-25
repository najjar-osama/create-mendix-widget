process.env.NODE_ENV = "development";
const path = require("path");
const widgetSrc = path.resolve(__dirname, "..", "src");
const widgetDist = path.resolve(__dirname, "..", "dist");

module.exports = {
    mode: "development",
    entry: widgetSrc,
    output: {
        path: widgetDist,
        filename: "widget.js",
        libraryTarget: 'umd',
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [{
            // lint before babel process the JS
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            use: [{
                options: {
                    formatter: require.resolve('react-dev-utils/eslintFormatter'),
                    eslintPath: require.resolve('eslint'),

                },
                loader: require.resolve('eslint-loader'),
            }, ],
            include: widgetSrc,
        }, {
            oneOf: [{
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: 10000,
                        name: `${widgetDist}/assets`,
                    },
                },
                {
                    test: /\.(js|jsx)$/,
                    include: widgetSrc,
                    loader: require.resolve('babel-loader'),
                    options: {
                        customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                        plugins: [
                            [
                                require.resolve('babel-plugin-named-asset-import'),
                                {
                                    loaderMap: {
                                        svg: {
                                            ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                                        },
                                    },
                                },
                            ],
                        ],
                        // This is a feature of `babel-loader` for webpack (not Babel itself).
                        // It enables caching results in ./node_modules/.cache/babel-loader/
                        // directory for faster rebuilds.
                        cacheDirectory: true,
                        // Don't waste time on Gzipping the cache
                        cacheCompression: false,
                    },
                },
                // Process any JS outside of the app with Babel.
                // Unlike the application JS, we only compile the standard ES features.
                {
                    test: /\.(js)$/,
                    exclude: /@babel(?:\/|\\{1,2})runtime/,
                    loader: require.resolve('babel-loader'),
                    options: {
                        babelrc: false,
                        configFile: false,
                        compact: false,
                        presets: [
                            [
                                require.resolve('babel-preset-react-app/dependencies'),
                                {
                                    helpers: true
                                },
                            ],
                        ],
                        cacheDirectory: true,
                        // Don't waste time on Gzipping the cache
                        cacheCompression: false,

                        // If an error happens in a package, it's possible to be
                        // because it was compiled. Thus, we don't want the browser
                        // debugger to show the original code. Instead, the code
                        // being evaluated would be much more helpful.
                        sourceMaps: false,
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            // Options for PostCSS as we reference these options twice
                            // Adds vendor prefixing based on your specified browser support in
                            // package.json
                            loader: require.resolve('postcss-loader'),
                            options: {
                                // Necessary for external CSS imports to work
                                // https://github.com/facebook/create-react-app/issues/2677
                                ident: 'postcss',
                                plugins: () => [
                                    require.resolve('postcss-flexbugs-fixes'),
                                    require.resolve('postcss-preset-env')({
                                        autoprefixer: {
                                            flexbox: 'no-2009',
                                        },
                                        stage: 3,
                                    }),
                                ],
                            },
                        },
                    ]

                },
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                importLoaders: 2
                            }
                        },
                        {
                            // Options for PostCSS as we reference these options twice
                            // Adds vendor prefixing based on your specified browser support in
                            // package.json
                            loader: require.resolve('postcss-loader'),
                            options: {
                                // Necessary for external CSS imports to work
                                // https://github.com/facebook/create-react-app/issues/2677
                                ident: 'postcss',
                                plugins: () => [
                                    require.resolve('postcss-flexbugs-fixes'),
                                    require.resolve('postcss-preset-env')({
                                        autoprefixer: {
                                            flexbox: 'no-2009',
                                        },
                                        stage: 3,
                                    }),
                                ],
                            },
                        },
                        require.resolve("sass-loader")
                    ]
                }

            ]
        }]
    }

}