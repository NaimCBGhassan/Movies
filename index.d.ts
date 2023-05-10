import { User } from "./src/types/models";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
