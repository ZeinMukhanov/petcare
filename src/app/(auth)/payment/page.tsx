"use client";

import { serverCreateCheckoutSession } from "@/app/serveractions/actions";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isPending, startTransition] = useTransition();
  const { data: session, update, status } = useSession();
  const router = useRouter();

  return (
    <main className="flex flex-col items-center space-y-10">
      <H1>
        Pet<span className="font-semibold">Care</span> access requires payment
      </H1>

      {searchParams.success && (
        <Button
          onClick={async () => {
            await update(true);
            router.push("/app/dashboard");
          }}
          disabled={status === "loading" || session?.user.hasAccess}
        >
          Access PetCare
        </Button>
      )}

      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await serverCreateCheckoutSession();
            });
          }}
        >
          Buy lifetime access for $99
        </Button>
      )}
      {searchParams.success && (
        <p className="text-sm text-green-500">Payment successful!</p>
      )}
      {searchParams.cancelled && (
        <p className="text-sm text-red-500">
          Payment cancelled. You can try again.
        </p>
      )}
    </main>
  );
}
