const format = require('../lib/format');
const apiRouter = require('koa-router');
const router = (module.exports = new apiRouter());

router.get('/v1/api', async ctx => {

    ctx.body = format.success(null, 'Hello World', ctx);
});