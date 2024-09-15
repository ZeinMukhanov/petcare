import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <H1 className="text-center">Sign up</H1>
      <AuthForm type="signup" />
      <div className="mt-2">
        <p className="mt-6 text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
