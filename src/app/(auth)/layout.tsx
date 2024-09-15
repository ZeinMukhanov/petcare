import Logo from "@/components/logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen gap-y-5">
      <Logo />
      {children}
    </div>
  );
}
