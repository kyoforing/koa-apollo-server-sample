const { ApolloServer, gql } = require('apollo-server-koa');
const { createTestClient } = require('apollo-server-testing');
const { typeDefs } = require('../dist/typeDefs');
const { resolvers } = require('../dist/resolvers');
const { knex } = require('../dist/config/knexfile');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: false
});

const { query, mutate } = createTestClient(server);

test('find author', async () => {
    const FIND_AUTHOR = gql`
        query {
            author(author_id: 1) {
                id
                name
            }
        }
    `;

    const {
        data: { author }
    } = await query({ query: FIND_AUTHOR });

    expect(author).toEqual({ id: '1', name: 'kyo' });
});

test('create author', async () => {
    const CREATE_AUTHOR = gql`
        mutation {
            authorCreate(input: { name: "kyo123" }) {
                author {
                    id
                    name
                }
            }
        }
    `;

    const {
        data: {
            authorCreate: {
                author: { name }
            }
        }
    } = await mutate({ query: CREATE_AUTHOR });

    expect(name).toEqual('kyo123');
});

afterAll(async done => {
    await knex.destroy();
    done();
});
