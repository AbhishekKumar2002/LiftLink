import { db } from "@/lib/db";

export async function addRatingData(username, feedback) {
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

    const res = await db.rating.create({
      data: {
        usersId: user.id,
        feedback,
      },
    });
    return res;
  } catch (err) {
    return {
      message: err.message,
    };
  }
}
export async function ratingData() {
  try {
    const out = await db.rating.findMany({
      select: {
        feedback: true,
        users: {
          select: {
            username: true,
            name: true,
          },
        }
      },
      take: 10,
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
    return out;
  } catch (err) {
    console.error(err);
    return {
      message: err.message,
    };
  }
}
export async function updateRatingData(username, feedback) {
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

    const res = await db.rating.update({
      where: {
        usersId: user.id,
      },
      data: {
        feedback,
      },
    });
    return res;
  } catch (err) {
    return {
      message: err.message,
    };
  }
}
