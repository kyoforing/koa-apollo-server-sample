'use strict';

const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

const Koa = require('koa');
const helmet = require('koa-helmet');
const Router = require('koa-router');

const { ApolloServer } = require('apollo-server-koa');
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");
const { gqlLogger, userLogger } = require('./lib/logger');
const { cors } = require('./lib/cors');
const { UpperCaseDirective, AuthDirective } = require('./lib/helper');
const { koa: voyagerMiddleware } = require('graphql-voyager/middleware');
const depthLimit = require('graphql-depth-limit');
const costAnalysis = require('graphql-cost-analysis').default;
const api = require('./router/api');

const app = new Koa();
const route = new Router();

// API Logger
app.use(userLogger());

// CORS
app.use(cors());

// Security setting
app.use(helmet());
app.use(helmet.noCache());
app.use(async (ctx, next) => {
  ctx.set('Strict-Transport-Security', 'max-age=15552000');
  await next();
});

// Init GraphQL Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [ 
    depthLimit(5),
    costAnalysis({
      defaultCost: 1,
      maximumCost: 200,
    }),
  ],
  extensions: [() => new gqlLogger()],
  schemaDirectives: {
    upper: UpperCaseDirective,
    auth: AuthDirective
  },
  context: ({ ctx }) => {
    const token = ctx.headers.authorization || '';
    //const user = getUser(token);
    //if (!user) throw new Error('you must be logged in'); 
    const user = {
      id: 12345,
      roles: ['USER', 'ADMIN']
    }
 
    return { user };
  },
  // 若 NODE_ENV=production 則自動為 fasle，防止外人查看 schema
  // introspection: false,
  // playground: false
});

route.all('/voyager', voyagerMiddleware({
  endpointUrl: '/graphql'
}));

app.use(api.routes());
app.use(route.routes());
app.use(route.allowedMethods());

server.applyMiddleware({ app });
app.listen({ port: 8080 }, () =>
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
);
