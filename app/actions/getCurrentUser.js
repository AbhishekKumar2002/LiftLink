import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  
  try {
    if (!session) {
      return null;
    }
    const currentUser = await db.users.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    // console.log(currentUser);
    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }

}
