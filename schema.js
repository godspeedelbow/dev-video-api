// schema.js
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

let count = 0;

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      count: {
        type: GraphQLInt,
        // add the description
        description: 'The count!',
        resolve: function() {
          return count++;
        }
      }
    }
  })
});
export default schema;
