"use client";
import { logOut } from "@/app/serveractions/actions";
import { Button } from "./ui/button";
import { useTransition } from "react";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          await logOut();
        });
      }}
    >
      Sign out
    </Button>
  );
}
