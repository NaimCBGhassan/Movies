import { connect } from "mongoose";
import { MONGODB_URL } from "./env";

const DBConnection = async () => {
  try {
    const db = await connect(MONGODB_URL);
    console.log(`Connected to collection: ${db.connection.name}`);
  } catch (error) {
    console.log("DB_ERROR");
    console.log(error);
  }
};

DBConnection();
