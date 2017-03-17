const ApolloClient = require('apollo-client').ApolloClient;
const createNetworkInterface = require('apollo-client').createNetworkInterface;
const gql = require('graphql-tag');

global.fetch = require('node-fetch');

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://127.0.0.1:3000/graphql'
  })
});

client.query({
  query: gql`
    query Query {
      hello
    }
  `,
})
  .then(data => console.log(data))
  .catch(error => console.error(error));