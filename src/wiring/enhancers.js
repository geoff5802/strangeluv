const enhancers = module.exports = [];

if (__DEBUG__) {
    /* No window for server-side
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
    */
}
