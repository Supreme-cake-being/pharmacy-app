import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import typeDefs from './schema';
import resolvers from './resolvers';
import { context } from './context';

import authRouter from '@routes/auth';

const app = express();

app.use(cors<cors.CorsRequest>());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();

app.use(expressMiddleware(server, { context }));

app.use('/api/users', authRouter);

export default app;
