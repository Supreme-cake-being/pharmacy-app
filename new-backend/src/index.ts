import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
import resolvers from './resolvers';
import typeDefs from './schema';

const { json } = pkg;

const { DB_HOST, PORT = 3000 } = process.env;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();

app.use(cors<cors.CorsRequest>(), json(), expressMiddleware(server));

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful \nServer running. Use our API on port: ${PORT} \nGraphQL endpoint: http://localhost:${PORT}/graphql`
      );
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
