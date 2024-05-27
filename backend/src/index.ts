import mongoose from 'mongoose';
import app from './app';

const { DB_HOST, PORT = 3000 } = process.env;

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
