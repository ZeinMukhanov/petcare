import BackgroundPattern from "@/components/background-pattern";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";

import { Toaster } from "@/components/ui/sonner";

import { checkAuth, getPetsByUserId } from "@/lib/server-utils";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();

  const pets = await getPetsByUserId(session.user.id);

  //let data: Pet[] = await response.json();
  // const data: Pet[] = await response.json();
  // data = data.sort((a, b) => a.name.localeCompare(b.name)); -> to sort the data in the alphabetical order, only sorts the fetched data, not viable when user would be adding new pets manually -> pets that with A would go above all the time -> inconvenient
  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col mx-auto max-w-[1050px] px-4 min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>

      <Toaster position="top-right" />
    </>
  );
}
