import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

app.use(cors());
app.use(express.json());
app.use('/graphql', expressMiddleware(server));

export default app;
