"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useSession } from "next-auth/react";
import { Input } from "postcss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Card_Home() {
  const [input, setInput] = useState("");
  const [toinput, tosetInput] = useState("");
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  const handleChange = (value) => {
    setInput(value);
  };
  async function handleAddReview() {
    if (!session || !session?.user) {
      toast.error("Please login first");
      return router.push("/login");
    }
    const username = session.user.username;
    try {
      if (input.trim().length <= 0) {
        toast.error("Add Review");
        return;
      }
      setLoading(true);
      const res = await fetch("/api/rating", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          feedback: input,
          users: {
            username,
            name: username,
          },
        }),
      });
      if (res.ok) {
        toast.success("Successfully Added ✅");
        setLoading(false);
        setRefetch((prev) => !prev);
      } else {
        toast.error("Already Have ❌");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong 😥");
      setLoading(false);
    }
  }
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    async function getFeedback() {
      setRefresh(true);
      const res = await fetch("/api/rating", { cache: "no-store" });
      const data = (await res.json()).res;
      if (data) {
        const reviews = data.map((item) => ({
          title: item?.users?.name,
          description: item?.feedback,
          link: `/user/${item?.users?.username}`,
        }));
        setFeedback(reviews);
        setRefresh(false);
      }
    }
    getFeedback();
  }, [refetch]);
  if (refresh)
    return (
      <div role="status" className="w-full flex justify-center items-center p-4">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  return (
    <div className="max-w-5xl mx-auto px-8">
      <h1 className="text-white mb-4 text-4xl sm:text-4xl font-extrabold">
        <span className="flex  items-center justify-center text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-cyan-500">
          Customer Reviews
        </span>
      </h1>
      {feedback.length > 0 && <HoverEffect items={feedback} />}
      <div className="flex items-center justify-center mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                +
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="rounded bg-slate-200 dark:bg-zinc-800 dark:text-slate-200">
            <DialogHeader>
              <DialogTitle>Write Review</DialogTitle>
              <br />
              {/* <Label>Review</Label> */}
              <textarea
                type="text"
                id="from"
                placeholder="Write review"
                className="w-full mt-2 p-2 rounded h-32  resize-none outline-none"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
              />

              {/* <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription> */}
              <div className="flex items-center justify-center mt-4">
                <button
                  className="border rounded-md border-black dark:border-white p-2 w-[50%]"
                  onClick={handleAddReview}
                >
                  {loading ? "Adding..." : "Add Review"}
                </button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
