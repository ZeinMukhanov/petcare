"use client";
import { logIn, signUp } from "@/app/serveractions/actions";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import AuthFormBtn from "./auth-form-btn";
import { useFormState } from "react-dom";

type AuthFormProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined);
  return (
    <div>
      {/* <!-- Auth form --> */}
      <form
        action={type === "login" ? dispatchLogIn : dispatchSignUp}
        className="max-w-sm mx-auto space-y-4"
      >
        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            maxLength={100}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
          />
        </div>

        {/* <!-- Password --> */}
        <div>
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            maxLength={100}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
          />
        </div>

        <div>
          <AuthFormBtn type={type} />
          {signUpError && <p className="text-red-500">{signUpError.message}</p>}
          {logInError && <p className="text-red-500">{logInError.message}</p>}
        </div>
      </form>
    </div>
  );
}
