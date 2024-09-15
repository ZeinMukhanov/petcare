import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <H1 className="text-center">Log in</H1>
      <AuthForm type="login" />
      <div className="mt-2">
        <p className="mt-6 text-sm text-zinc-500 ">
          No account?{" "}
          <Link href="/signup" className="font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
