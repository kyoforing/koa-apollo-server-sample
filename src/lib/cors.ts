const koa_cors = require('koa-cors');

const options = {
    origin: function (ctx) {
        let origin = ctx.req.headers.origin || '';
        let allowDomain: string = 'http://localhost:8080';
        let whiteList = [];

        //Multiple CORS domain
        whiteList = process.env.WHITE_LIST.split(',');

        whiteList.forEach(domain => {
            if (origin.includes(domain)) {
                allowDomain = origin;
            }
        });

        return origin; //Bypass
        //return allowDomain;
    },
    allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE']
};

const cors = () => koa_cors(options);

export { cors }