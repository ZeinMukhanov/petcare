"use client";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

type AuthFormBtnProps = {
  type: "login" | "signup";
};
export default function AuthFormBtn({ type }: AuthFormBtnProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
    >
      {type === "login" ? "Log in" : "Sign up"}
    </Button>
  );
}
