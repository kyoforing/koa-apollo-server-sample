const originalMorgan = require('morgan')
const uaParser = require('ua-parser-js');

//Apollo GraphQL Log
class BasicLogging {
  requestDidStart({ queryString, variables }) {
    const query = queryString;
    console.log('GraphQL request log:');
    if (query) console.log(`Query: ${query}`);
    if (variables) console.log(`Variables: ${variables}`);
  }

  willSendResponse({ graphqlResponse }) {
    if (graphqlResponse) console.log(`GraphQL response log: ${JSON.stringify(graphqlResponse, null, 2)}`);
  }
}

//morgan => koa-morgan
function koa_morgan(format, options) {
  const fn = originalMorgan(format, options)
  return (ctx, next) => {
    return new Promise((resolve, reject) => {
      fn(ctx.req, ctx.res, (err) => {
        err ? reject(err) : resolve(ctx)
      })
    }).then(next)
  }
}

koa_morgan.compile = originalMorgan.compile
koa_morgan.format = originalMorgan.format
koa_morgan.token = originalMorgan.token

//Collect log message to koa-morgan
let logger = (tokens, req, res) => {
  //IP check
  let user_ip: string = '';
  if (req.headers['x-forwarded-for']) {
    user_ip = req.headers['x-forwarded-for'].split(', ')[0];
  }

  if (!user_ip) {
    if (req.connection) {
      if (req.connection.remoteAddress) user_ip = req.connection.remoteAddress;
      else if (req.connection.socket && req.connection.socket.remoteAddress) user_ip = req.connection.socket.remoteAddress;
    } else if (req.socket && req.socket.remoteAddress) user_ip = req.socket.remoteAddress;
  }

  if (user_ip === '::1') user_ip = '127.0.0.1';

  //User-Agent check
  let ua = uaParser(req.headers['user-agent']);
  if (ua.ua) delete ua.ua;
  ua = JSON.stringify(ua);

  let logArr = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    'Referrer:',
    tokens.req(req, res, 'referer'),
    '-',
    'IP:',
    user_ip,
    '-',
    'User-Agent:',
    ua,
    '-',
  ];
  return logArr.join(' ');
}

module.exports.logger = logger;
module.exports.koa_morgan = koa_morgan;
module.exports.BasicLogging = BasicLogging;