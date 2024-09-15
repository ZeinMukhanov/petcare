import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import marketphoto from "/public/marketphoto.png";

export default function Home() {
  return (
    <main className="bg-[#e0d28a] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      <Image
        src={marketphoto}
        alt="Preview of PetCare"
        width={519}
        height={472}
      />
      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[600px]">
          Pet <span className="font-semibold">daycare</span> made
          <span className="text-[#ffffff] font-extrabold drop-shadow-md">
            {" "}
            easy
          </span>
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use PetCare to easiliy keep track of pets under your care. Get
          lifetime access for $99
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
