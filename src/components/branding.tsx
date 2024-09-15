import H1 from "./h1";
export default function Branding() {
  return (
    <section>
      <H1 className="drop-shadow-md">
        Pet<span className="font-semibold">Care</span>
      </H1>
      <p className="text-lg opacity-80 drop-shadow-md">Pet daycare made easy</p>
    </section>
  );
}
