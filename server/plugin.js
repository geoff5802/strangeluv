const StrangeluvCore = require('strangeluv-core/lib/plugin');
const Webpack = require('webpack');
const WebpackConfig = require('../config/webpack.config');
const Config = require('../config/main');
const Package = require('../package.json');
const ReactDOM = require('react-dom/server');
const ReactRouter = require('react-router');

// Compile with `npm run compile` using the current messed-up webpack config
const App = require('../dist/server');

const internals = {};

// The app as a plugin

module.exports = (server, options, next) => {

    // To hit this route make sure to comment-out the
    // history-related onRequest extension in strangeluv-core
    server.route({
        path: '/counter',
        method: 'get',
        handler: (request, reply) => {

            ReactRouter.match({
                routes: App.routes,
                location: request.url
            }, (err, redirect, renderProps) => {

                const AppContainer = App.create(renderProps);

                reply(err || ReactDOM.renderToString(AppContainer));
            });
        }
    });

    server.register({
        register: StrangeluvCore,
        options: {
            dist: Config.utils_paths.dist(),
            static: Config.utils_paths.client('static'),
            compiler: (Config.env === 'dev') && Webpack(WebpackConfig),
            assets: {
                publicPath: WebpackConfig.output.publicPath,
                contentBase: Config.utils_paths.client(),
                hot: true,
                quiet: Config.compiler_quiet,
                noInfo: Config.compiler_quiet,
                lazy: false,
                stats: Config.compiler_stats
            }
        }
    }, next);
};

module.exports.attributes = {
    pkg: Package
};
