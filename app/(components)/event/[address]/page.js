import { db } from "@/lib/db";
import Card from "./Card";
import PagenationPage from "./PagenationPage";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Event({ params: { address } }) {
  const location = address.split("%26");
  const from = location.at(0).split("%20").join(" ");
  const to = location.at(1).split("%20").join(" ");
  let date = location
    .at(2)
    .split("%20")
    .join(" ")
    .split("%3A")
    .join(":")
    .split("%2B")
    .join("+");
  date = new Date(date);
  const data = await db.travel.findMany({
    where: {
      from,
      to,
      onlyDate: date
    },
    select: {
      id: true,
      from: true,
      to: true,
      usersId: true,
      date: true,
      users: {
        select: {
          username: true,
          email: true,
          name: true,
          gender: true,
          requested: true
        },
      },
      friends: true
    },
  });

  const user = data.map(({ id, from, to, usersId, date, users, friends }) => ({
    id,
    from,
    to,
    usersId,
    date,
    ...users,
    friends
  }));

  const session = await getServerSession(authOptions)
  const currentUsername = session?.user?.username
  let currentUserId = null
  if(session){
    currentUserId = await db.users.findUnique({
      where: {
        username: currentUsername
      },
      select: {
        id: true
      }
    })
  }
  if (user.length <= 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-2 mb-5 min-h-screen">
        <div>
          <Image src="/empty.png" alt="empty" height={450} width={450} />
        </div>

        <h1 className="text-4xl text-center">No User Found</h1>
        <Link href="/">
          <button
            type="button"
            className="bg-blue-500 w-full text-black p-3 rounded-xl hover:bg-blue-500/55 transition-all mt-4"
          >
            <p className="font-semibold text-xs">Create one</p>
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className="mt-16 bg-slate-200 dark:bg-slate-900 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {user.map(
          (
            { id,name, from, to, usersId, date, username, email, gender, requested, friends },
            index
          ) => (
            <Card
              key={index}
              cardId={id}
              name={name}
              from={from}
              to={to}
              usersId={usersId}
              date={date}
              username={username}
              email={email}
              gender={gender}
              currentUsername={currentUsername}
              requested={requested}
              friends={friends}
              currentUserId={currentUserId}
            />
          )
        )}
      </div>
    </div>
  );
}
