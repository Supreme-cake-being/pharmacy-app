import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import { context } from './context.js';
import { applyMiddleware } from 'graphql-middleware';
import permissions from './permissions/rules.js';

const app = express();

const server = new ApolloServer(
  applyMiddleware({ typeDefs, resolvers }, permissions)
);
await server.start();

app.use(cors());
app.use(express.json());
app.use('/graphql', expressMiddleware(server, { context }));

export default app;
