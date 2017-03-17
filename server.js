const Koa = require('koa');
const KoaRouter = require('koa-router');
const convert = require('koa-convert');

const apolloKoa = require('apollo-server').apolloKoa;
const koaBody = require('koa-body');
const GraphQL = require('graphql');
const graphql = GraphQL.graphql;

const app = new Koa();
const router = new KoaRouter();
const PORT = 3000;


var schema = new GraphQL.GraphQLSchema({
  query: new GraphQL.GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQL.GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

router.post('/graphql', apolloKoa({
  schema: schema
}));

router.post('/test', (ctx, next) => {
  ctx.body = 'Hello World!';
});

app
  .use(convert(koaBody()))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT);
