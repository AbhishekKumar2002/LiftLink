import { db } from "@/lib/db";
import Card from "./Card";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import kitish from '@/public/team/kitish.jpg'
import ayush from '@/public/team/ayush.jpg'
import { random } from "glowing-engine";
import profileImg from "@/public/images/login-animation.gif"

const images = [kitish,ayush]
export const revalidate = 5;
export default async function Event({ params: { username } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = await db.users.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      gender: true,
      userimg: true,
      created: true,
    },
  });
  if (!user) notFound();
  const history = await db.travel.findMany({
    where: {
      usersId: user.id,
    },
    select: {
      id: true,
      users: false,
      usersId: false,
      date: true,
      from: true,
      to: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row mt-28 justify-evenly items-center mb-2">
        <div className="flex flex-col justify justify-center items-center">
          <Image
            src={profileImg}
            width={200}
            height={200}
            className="h-[20rem] w-[20rem] rounded-2xl"
          />
        </div>

        <div className="flex flex-col justify-start text-justify">
          <div className="mb-4 flex justify-between items-center">
            <label htmlFor="name" className="font-bold text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="font-semibold px-4 py-2 rounded border border-gray-300 bg-gray-500/40"
              value={user.name}
              disabled
            />
          </div>

          <div className="mb-4 flex justify-between items-center">
            <label htmlFor="username" className="font-bold text-gray-600">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="font-semibold px-4 py-2 rounded border border-gray-300 bg-gray-500/40"
              value={user.username}
              disabled
            />
          </div>

          <div className="mb-4 flex justify-between items-center">
            <label htmlFor="email" className="font-bold text-gray-600">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="font-semibold px-4 py-2 rounded border border-gray-300 bg-gray-500/40"
              value={user.email}
              disabled
            />
          </div>

          <div className="mb-4 flex justify-between items-center">
            <label htmlFor="gender" className="font-bold text-gray-600">
              Gender:
            </label>
            <input
              type="text"
              id="gender"
              className="font-semibold px-4 py-2 rounded border border-gray-300 bg-gray-500/40"
              value={user.gender}
              disabled
            />
          </div>
          <div className="mb-4 flex justify-between items-center">
            <label htmlFor="created" className="font-bold text-gray-600">
              Created:
            </label>
            <input
              type="text"
              id="created"
              className="font-semibold px-4 py-2 rounded border border-gray-300 bg-gray-500/40"
              value={user.created}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-200 dark:bg-slate-900 pb-4 relative">
        <div className="h-16">
          <h1 className="text-4xl font-bold z-10 bg-white/75 dark:bg-black/75 w-full p-4">
            {`Your Creation's`}
          </h1>
        </div>
        <div>
          {history.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {history.map(({ from, to, date, id }, index) => (
                <Card
                  key={index}
                  from={from}
                  cardId={id}
                  to={to}
                  date={date}
                  remove={session.user.username !== username}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2 mb-5">
              <div>
                <Image src="/empty.png" alt="empty" height={450} width={450} />
              </div>

              <h1 className="text-4xl text-center">Nothing found</h1>
              <Link href="/">
                <button
                  type="button"
                  className="bg-blue-500 w-full text-black p-3 rounded-xl hover:bg-blue-500/55 transition-all"
                >
                  <p className="font-semibold text-xs">Create one</p>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
