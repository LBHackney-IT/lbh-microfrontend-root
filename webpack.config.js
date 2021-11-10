const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-ts');
const path = require('path');
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

    const config = merge(defaultConfig, {
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
                        process.env.HEADER_APP_URL || '//localhost:8090',
                    AUTH_APP_URL:
                        process.env.AUTH_APP_URL || '//localhost:8080',
                    SEARCH_APP_URL:
                        process.env.SEARCH_APP_URL || '//localhost:8070',
                    PERSON_DETAILS_APP_URL:
                        process.env.PERSON_DETAILS_APP_URL ||
                        '//localhost:8060/mtfh-personal-details.js',
                    COMMENTS_APP_URL:
                        process.env.COMMENTS_APP_URL ||
                        '//localhost:8050/mtfh-comments.js',
                    COMMON_APP_URL:
                        process.env.COMMON_APP_URL || '//localhost:8040',
                    TENURE_APP_URL:
                        process.env.TENURE_APP_URL || '//localhost:8030',
                    ACTIVITIES_APP_URL:
                        process.env.ACTIVITIES_APP_URL || '//localhost:8020',
                    PROPERTY_APP_URL:
                        process.env.PROPERTY_APP_URL ||
                        '//localhost:8010/mtfh-property.js',
                    PROCESSES_APP_URL:
                        process.env.PROCESSES_APP_URL || '//localhost:8990',
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

    config.entry = {
        'root-config': config.entry,
        'formik': 'formik/dist/formik.esm.js',
        'yup': 'yup/es',
    };

    config.output.filename = '[name].[contenthash:8].js';
    config.output.uniqueName = '[name]';
    config.output.devtoolNamespace = '[name]';
    config.externals.push('react');

    return config;
};
