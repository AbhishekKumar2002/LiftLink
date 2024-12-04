"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { checkout } from "../../../checkout";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Loading from "@/app/loading";

const formSchema = z.object({
  username: z.string().min(2, {
    message:
      "Username must be at least 3 characters and can only contain alphabets, numbers, underscore, and dot.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function SignInForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    const loadingToastId = toast.loading("Signing in...");
    // isverified check
    const res = await fetch("/api/checkverification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.getValues("username"),
        email: form.getValues("username"),
      }),
    });

    if (!res.ok) {
      toast.error("Please Verify your account first");
      toast.dismiss(loadingToastId)
      router.push("/signup");
    } else {
      const signInData = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });
      if (signInData?.error) {
        console.log(signInData.error);
        toast.dismiss(loadingToastId);
        toast.error(
          "Sign-in failed. Please check your credentials and try again."
        );
      } else {
        toast.dismiss(loadingToastId);
        toast.success("Logged In Successfully😊");
        router.push("../");
      }
    }
  }
  if (status === "loading") {
    return <Loading />;
  } else if (status === "authenticated") {
    router.replace("/");
    return <></>;
  }
  return (
    <section className="dark:bg-gray-900 bg-slate-200 mt-16 bg-primaryBG dark:bg-secondaryBG dark:text-slate-400">
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-0">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="dark:bg-slate-950 bg-slate-400 xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border rounded-2xl pl-8 pr-8 pt-8 pb-8">
            <h2 className="text-3xl font-bold leading-tight  text-white-900 sm:text-4xl text-center">
              Sign In
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
                <div className="space-y-5">
                  <FormField
                    className="text-base font-medium text-gray-900 relative z-50"
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username/Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Username"
                            {...field}
                            className="rounded-xl bg-slate-200"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    className="text-base font-medium text-gray-900"
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                            className="rounded-xl bg-slate-200"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <p class="text-sm dark:text-gray-500 sm:mt-0">
                    Don't have an account? &nbsp;
                    <Link
                      href="/signup"
                      className="dark:text-gray-400 underline"
                    >
                      SignUp for free...
                    </Link>
                    .
                  </p>
                </div>
                <button
                  type="submit"
                  className="relative mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-slate-800 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Sign In
                </button>
              </form>
              <div></div>
              
              <div></div>
              {/* <div className="mt-3 space-y-3">
                <button
                  type="button"
                  className="relative inline-flex w-full items-center justify-center rounded-2xl border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                >
                  <span className="mr-2 inline-block">
                    <svg
                      className="h-6 w-6 text-rose-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                  </span>
                  Sign in with Google
                </button>
              </div> */}
            </Form>
          </div>
        </div>

        <div className="flex items-center justify-center h-full w-full mt-[-4]">
          <img
            className="mx-auto object-cover h-[80%] w-[80%] rounded-2xl "
            src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          />
        </div>
      </div>
    </section>
  );
}
