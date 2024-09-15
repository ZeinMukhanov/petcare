import { Button } from "./ui/button";
// import { useFormStatus } from "react-dom";

type PetFormBtnProps = {
  actionType: "add" | "edit";
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  return (
    <Button type="submit" className="mt-5 self-end cursor-pointer">
      {actionType == "add" ? "Add" : "Save"}
    </Button>
  );
}
