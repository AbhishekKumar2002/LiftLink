import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import Card from "./Card";
import { db } from "@/lib/db";

export default async function Travel({ params: { id } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const x = id.split('%26')
  const cardId = x.at(0).split('%20').join(" ")
  const senderId = x.at(1).split("%20").join(" ")

  const card = await db.travel.findUnique({
    where: {
        id: cardId
    },
    select: {
        id: true,
        usersId: true,
        from: true,
        to: true,
        date: true,
        users: {
            select: {
                username: true,
                name: true
            }
        },
        friends: true
    }
  })
  if(!card) notFound()
  const currentUsername = session?.user?.username
  return <Card id={card.id} usersId={card.usersId} from={card.from} to={card.to} date={card.date} username={card.users.username} name={card.users.name} friends={card.friends} currentUsername={currentUsername} senderId={senderId} />
}
