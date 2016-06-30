const Thunk = require('redux-thunk').default;
const RouterMiddleware = require('react-router-redux').routerMiddleware;

// No history for server-side
// const History = require('./history');

module.exports = [
    Thunk,
    RouterMiddleware(/* History */)
];
