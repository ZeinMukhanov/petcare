import Branding from "@/components/branding";
import Stats from "@/components/stats";
import SearchForm from "@/components/search-form";
import PetList from "@/components/pet-list";
import PetDetails from "@/components/pet-details";
import ContentBlock from "@/components/content-block";
import PetButton from "@/components/pet-button";

export default async function Page() {
  //useState is not viable cuz it requires the page.tsx to become a client component -> async fetching and all the other components that are being imported become client components -> losing the main purpose of using next.js (load speed)

  //state managment solution contextAPI

  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <Branding />
        <Stats />
      </div>

      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[600px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>

        <div className="relative md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <ContentBlock>
            <PetList />
            <div className="absolute bottom-4 right-4">
              <PetButton actionType="add" />
            </div>
          </ContentBlock>
        </div>

        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
