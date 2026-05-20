import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";

const handler = async (req) => {
  await connectDB();
  return auth.handler(req);
};

export { handler as GET, handler as POST };
