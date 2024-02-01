import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

app.use('/graphql', expressMiddleware(server));

export default app;
