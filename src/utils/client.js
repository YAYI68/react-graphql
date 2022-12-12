import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const typeDefs = gql`
  extend type User{
    age:int
  }
  extend type Pet{
    vacinated:boolean
  }
  `


const resolvers = {
  User:{
    age(){
      return 30
    }
  },
  Pet:{
    vacinated(){
      return true;
    }
  }
}

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
    typeDefs,
    resolvers
  });
 
  
  // client.query({
  //   query:gql`
  //      query Allpets {
  //       pets{
  //         name
  //         type
  //       }
  //      }
  //      `
  // }).then(result =>console.log({result}))

  export default client;