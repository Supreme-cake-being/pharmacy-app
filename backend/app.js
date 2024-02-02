import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { startStandaloneServer } from '@apollo/server/standalone';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

// { typeDefs, resolvers }

const server = new ApolloServer();

app.use('/graphql', expressMiddleware(server));

export default app;
