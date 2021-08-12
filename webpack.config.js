const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-ts');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (webpackConfigEnv, argv) => {
    const orgName = 'mtfh';
    const defaultConfig = singleSpaDefaults({
        orgName,
        projectName: 'root-config',
        webpackConfigEnv,
        argv,
        disableHtmlGeneration: true,
    });

    return merge(defaultConfig, {
        plugins: [
            new HtmlWebpackPlugin({
                inject: false,
                template: 'src/index.ejs',
                templateParameters: {
                    isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
                    APP_ENV: process.env.APP_ENV || 'production',
                    VERSION: '1.0.0',
                    ROOT_APP_URL:
                        process.env.ROOT_APP_URL ||
                        '//localhost:9000/mtfh-root-config.js',
                    HEADER_APP_URL:
                        process.env.HEADER_APP_URL ||
                        '//localhost:8090/mtfh-header.js',
                    AUTH_APP_URL:
                        process.env.AUTH_APP_URL ||
                        '//localhost:8080/mtfh-auth.js',
                    SEARCH_APP_URL:
                        process.env.SEARCH_APP_URL ||
                        '//localhost:8070/mtfh-search.js',
                    PERSON_DETAILS_APP_URL:
                        process.env.PERSON_DETAILS_APP_URL ||
                        '//localhost:8060/mtfh-personal-details.js',
                    COMMENTS_APP_URL:
                        process.env.COMMENTS_APP_URL ||
                        '//localhost:8050/mtfh-comments.js',
                    COMMON_APP_URL:
                        process.env.COMMON_APP_URL ||
                        '//localhost:8040/mtfh-common.js',
                    TENURE_APP_URL:
                        process.env.TENURE_APP_URL ||
                        '//localhost:8030/mtfh-tenure.js',
                    ACTIVITIES_APP_URL:
                        process.env.ACTIVITIES_APP_URL ||
                        '//localhost:8020/mtfh-activity-history.js',
                    PROPERTY_APP_URL:
                        process.env.PROPERTY_APP_URL ||
                        '//localhost:8010/mtfh-property.js',
                },
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
            ],
        },
    });
};
