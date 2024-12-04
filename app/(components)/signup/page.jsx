"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import loginSignUp from "../../../public/images/login-animation.gif";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
// import { ImagetoBase64 } from "../utility/imagetoBase64";
import toast, { Toaster } from "react-hot-toast";
import { ImagetoBase64 } from "./ImagetoBase64";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";

const formSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9_.]{3,}$/, {
    message:
      "Username must be at least 3 characters and can only contain alphabets, numbers, underscore, and dot.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).refine(email => email.endsWith("@iiitl.ac.in"), {
    message: "Email domain must be @iiitl.ac.in",
  }),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  gender: z.string().min(1, {
    message: "Please Select your Gender",
  }),
  userimg: z.string().min(0, {
    message: "Please Select your image",
  }),

});

export default function ProfileForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userImage, setUserImage] = useState("");
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
      gender: "",
      userimg: "",
    },
  });

  const handleUploadProfileImage = async(e) => {

    // setShowimg(e.target.files[0])
    // const data = await ImagetoBase64(e.target.files[0]);
    // // setImg(data)
    // // console.log(data)
    // setUserImage((preve)=>{
    //     return{
    //         ...preve,
    //         userImage : data
    //     }
    // })
    // console.log(userImage.userImage);

}

  async function onSubmit(values) {
    const loadingToastId = toast.loading("Creating Account");

    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        email: values.email,
        name: values.name,
        gender: values.gender,
        userimg: "kitish"
      }),
    });

    if (response.ok) {
      setOpen(true);
      toast.dismiss(loadingToastId);
      toast.success("OTP Sent");
    } else {
      toast.dismiss(loadingToastId);
      const { message } = await response.json();
      toast.error(message);
      console.error("Registration Failed");
    }
  }

  async function handleVerifyOTP() {
    try {
      const res = await fetch("/api/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.getValues("email"),
          otp,
        }),
      });
      if (res.ok) {
        router.push("/login");
        toast.success("Account Created Successfully😊");
      } else {
        toast.error("Wrong OTP");
      }
    } catch (err) {
      console.log(err);
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
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border pl-8 pr-8 pt-8 pb-8 rounded-2xl bg-slate-400 dark:bg-slate-950">
              <h2 className="text-3xl font-bold leading-tight  text-white-900 sm:text-4xl text-center">
                Create Your Account
              </h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
                  <div className="space-y-5">
                    <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md m-auto relative">
                      <Image
                        src={userImage ? userImage.userImage : loginSignUp}
                        className="w-full h-full"
                        width={100}
                        height={100}
                      />
                      <label htmlFor="profileImage">
                        <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center">
                          <p className="text-sm p-1 text-white cursor-pointer">
                            Upload
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          id="profileImage"
                          className="hidden"
                          onChange={handleUploadProfileImage}
                        />
                      </label>
                    </div>
                    <FormField
                      className="text-base font-medium text-gray-900 relative z-50"
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Username"
                              {...field}
                              className="rounded-xl bg-slate-200"
                            />
                          </FormControl>
                          {/* <FormDescription>
                          This is your public display name.
                        </FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      className="text-base font-medium text-gray-900"
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Email address"
                              {...field}
                              className="rounded-xl bg-slate-200"
                            />
                          </FormControl>
                          {/* <FormDescription>
                          Please enter a valid email address.
                        </FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      className="text-base font-medium text-gray-900"
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Name.."
                              {...field}
                              className="rounded-xl bg-slate-200"
                            />
                          </FormControl>
                          <FormDescription>Your full name.</FormDescription>
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
                              placeholder="******"
                              {...field}
                              className="rounded-xl bg-slate-200"
                            />
                          </FormControl>
                          {/* <FormDescription>
                          Must be at least 6 characters.
                        </FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      className="text-base font-medium text-gray-900"
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormDescription>Choose your gender.</FormDescription>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className=" rounded-xl bg-slate-200 dark:bg-gray-900">
                                <SelectValue placeholder="Gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl bg-slate-200 dark:bg-gray-900">
                              <SelectItem
                                value="Male"
                                className="cursor-pointer border-b-2 "
                              >
                                Male
                              </SelectItem>

                              <SelectItem
                                value="Female"
                                className="cursor-pointer border-b-2"
                              >
                                Female
                              </SelectItem>
                              <SelectItem
                                value="Others"
                                className="cursor-pointer"
                              >
                                Others
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p class="text-sm text-black dark:text-gray-500 sm:mt-0">
                      Already have an account? &nbsp;
                      <Link href="/login" className="text-gray-400 underline">
                        Log in
                      </Link>
                      .
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="relative mt-2 inline-flex w-full items-center justify-center rounded-md bg-gray-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-slate-800"
                  >
                    Get started
                  </Button>

                  {open && <DialogTrigger asChild></DialogTrigger>}

                  <DialogContent className="rounded-3xl bg-slate-300 dark:bg-transparent flex flex-col items-center sm:max-w-[425px]">
                    <DialogTitle>Enter the OTP send to your mail</DialogTitle>
                    <InputOTP
                      className=""
                      maxLength={6}
                      value={otp}
                      onChange={(otp) => setOtp(otp)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <DialogFooter>
                      <Button
                        className="border rounded-md border-black dark:border-white dark:bg-transparent"
                        type="submit"
                        onClick={handleVerifyOTP}
                      >
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </form>
                <div></div>
                {/* <div className="mt-3 space-y-3">
                  <button
                    type="button"
                    className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
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
            <Image
              height={1000}
              width={1000}
              className="h-[80%] w-[80%] rounded-2xl"
              // src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              // src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              src="/images/new-york-1209232_1920.jpg"
            />
          </div>
        </div>
      </Dialog>
    </section>
  );
}
