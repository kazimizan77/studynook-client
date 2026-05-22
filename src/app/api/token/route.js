import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SignJWT } from "jose";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT({
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    return Response.json({ token });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
