const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://test-unified.client-api.vyyer.id',
            changeOrigin: true,
        })
    );
};