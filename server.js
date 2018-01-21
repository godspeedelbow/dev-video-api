import express from "express";
import schema from "./schema";
// new dependencies
import { graphql } from "graphql";
import graphqlHTTP from "express-graphql";

let app = express();
let PORT = 3000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const server = app.listen(PORT, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("GraphQL listening at http://%s:%s", host, port);
});
