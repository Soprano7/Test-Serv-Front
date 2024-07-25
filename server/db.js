import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let dbConnection;

export const connectToDb = cb => {
  MongoClient.connect(process.env.DB_LINK)
    .then(client => {
      console.log("DB job");
      dbConnection = client.db();
      return cb();
    })
    .catch(err => cb(err));
};

export const getDb = () => dbConnection;
