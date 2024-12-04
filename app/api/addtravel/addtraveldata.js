import { db } from "@/lib/db";

export async function addTravelData(username, from, to, date,onlyDate) {
  try {
    const user = await db.users.findUnique({
      where: {
        username: username, 
      },
    });

    if (!user) {
      return {
        message: "User not found",
      };
    }

    const out = await db.travel.create({
      data: {
        usersId: user.id,
        from,
        to,
        date,
        onlyDate: new Date(onlyDate)
      },
    });
    return out;
  } catch (err) {
    console.error(err);
    return {
      message: err.message,
    };
  }
}
