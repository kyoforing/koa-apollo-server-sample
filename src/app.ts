'use strict';

const Koa = require('koa');
const helmet = require('koa-helmet');
const cors = require('koa-cors');
const dotenv = require('dotenv');
const { ApolloServer, gql } = require('apollo-server-koa');
const graphqlLog = require('./lib/logging');

const env = process.env.NODE_ENV || 'development';
const app = new Koa();

dotenv.config({ path: `.env.${env}` });

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// API Log setting
app.use(graphqlLog.koa_morgan((tokens, req, res) => graphqlLog.logger(tokens, req, res)));

// CORS setting
const options = {
  origin: function(ctx) {
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

      return allowDomain;
  },
  allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE']
};
app.use(cors(options));

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
  extensions: [() => new graphqlLog.BasicLogging()],
});

server.applyMiddleware({ app });
app.listen({ port: 8080 }, () =>
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
);
