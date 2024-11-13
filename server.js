import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import morgan from "morgan";
import jwt from "jsonwebtoken";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./resolvers.js";
import { typeDefs } from "./index.schema.js";
import connectDB from "./db/mongoose.js";

dotenv.config(); // Import Mongoose connection

const morganFormat = ":method :url :status :response-time ms";

const corsOptions = {
  origin: "http://localhost:3000/graphql",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Connect to MongoDB
await connectDB(); // Call the Mongoose connection function here

await server.start();

app.use(
  "/graphql",
  cors(corsOptions),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      console.log(req.body.operationName);
      const token = req.headers.authorization;
      console.log("Received token:", token);
      const decodedToken = jwt.verify(context.token, process.env.JWT_SECRET);
      console.log("Decoded token:", decodedToken);
      return { user: decodedToken };
    },
  })
);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
