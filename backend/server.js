// import mongoose from 'mongoose';
import app from './app.js';

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(
    `Server running. Use our API on port: ${PORT}\nGraphQL endpoint: http://localhost:${PORT}/graphql`
  );
});
