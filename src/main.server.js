const React = require('react');
const RouterContext = require('react-router').RouterContext;
const Provider = require('react-redux').Provider;
const CreateStore = require('./wiring/create-store');
const Routes = require('./routes');

exports.store = CreateStore();
exports.routes = Routes(exports.store);
exports.mount = '#root';

// Must use RouterContext in app rather than Router for server-side
exports.create = (routerProps) => (

    <Provider store={exports.store}>
        <div style={{ height: '100%' }}>
            <RouterContext {...routerProps} />
        </div>
    </Provider>

);
