import { UserDocument } from "@/models/User";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      role: UserDocument["role"];
    }
  }
}
