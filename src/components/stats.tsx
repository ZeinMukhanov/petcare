"use client";

import { usePetContext } from "@/lib/hooks";

export default function Stats() {
  const { numberOfPets } = usePetContext();
  return (
    <section>
      <p className="text-2xl font-bold leading-6 text-center drop-shadow-md">
        {numberOfPets}
      </p>
      <p className="opacity-80 drop-shadow-md">current guests</p>
    </section>
  );
}
