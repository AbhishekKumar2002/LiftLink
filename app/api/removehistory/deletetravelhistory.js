import { db } from "@/lib/db";

export async function deleteTravelhistory(id) {
  try {
    const res = await db.travel.delete({
        where: {
            id
        }
    })
    return res
  } catch (err) {
    console.error(err);
    return {
      message: err.message,
    };
  }
}
