"use client";
import axios from "axios";
import { useRef, useState } from "react";
import { HTTP_BACKEND_URL } from "../../config";
import { useRouter } from "next/navigation";

interface AuthPageProps{
    isSignin:boolean;
}

function AuthPage({ isSignin  }: AuthPageProps) {
  const [isSignIn, setIsSignIn] = useState(isSignin);
  const inputNameRef=useRef<HTMLInputElement>(null)
  const inputPasswordRef=useRef<HTMLInputElement>(null)
  const inputEmailRef=useRef<HTMLInputElement>(null);
  const router=useRouter()

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();  
  const username = inputNameRef?.current?.value;
  const email = inputEmailRef.current?.value;
  const password = inputPasswordRef.current?.value;

  try {
    const endpoint=isSignIn?"signin":"signup";
    const res = await axios.post(`${HTTP_BACKEND_URL}/${endpoint}`, {
      username,
      email,
      password,
    });
     if (!res.status) {
        console.log(`Error occured during ${endpoint}`);
        throw new Error(`Error Occured during ${endpoint}`)

      }
    if(isSignIn){
      const token=res.data.token
      const userId=res.data.userId;
    console.log(res.data.token);
      localStorage.setItem("token",token);
      localStorage.setItem("userId",userId);
      router.replace("/room");
    }else{
      setIsSignIn(true)
    }

  } catch (error) {
    console.log("error in axios", error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md p-8 bg-secondary-background rounded-2xl shadow-shadow border border-border">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignIn ? "Sign In to Wavy Chat" : "Create Your Account"}
        </h2>

        <form className="space-y-4">
          {!isSignIn && (
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                ref={inputNameRef}
                type="text"
                id="username"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-main"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              ref={inputEmailRef}
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-main"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
            ref={inputPasswordRef}
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-main"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 rounded-lg bg-main text-main-foreground font-semibold shadow-shadow hover:opacity-90 transition"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="ml-1 text-main font-medium hover:underline"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
