"use client";
import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";
import { flushSync } from "react-dom";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function PetButton({
  disabled,
  onClick,
  actionType,
  children,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  if (actionType == "checkout") {
    return (
      <Button variant="secondary" disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType == "add" ? (
          <Button size="icon" className="bg-[#dcb053]">
            <PlusIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new pet" : "Edit a pet"}
          </DialogTitle>

          <PetForm
            actionType={actionType}
            onFormSubmission={() => {
              flushSync(() => {
                setIsFormOpen(false);
              });
            }}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
