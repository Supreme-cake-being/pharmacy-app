import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import resolvers from './resolvers';
import typeDefs from './schema';
import 'dotenv/config';

const app = express();

app.use(cors<cors.CorsRequest>());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();

app.use(expressMiddleware(server));

export default app;
