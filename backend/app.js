import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const app = express();

const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

app.use(cors());
app.use(express.json());
app.use('/graphql', expressMiddleware(server));

export default app;
