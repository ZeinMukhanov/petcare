"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/lib/auth-no-edge";
import { redirect } from "next/navigation";
import { checkAuth, getPetByPetId } from "@/lib/server-utils";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ---User actions---
export async function logIn(prevState: unknown, formData: unknown) {
  // await sleep(1000);
  if (!(formData instanceof FormData)) {
    return { message: "Invalid form data." };
  }
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { message: "Invalid credentials." };
        }

        default: {
          return { message: "Could not sign in." };
        }
      }
    }
    throw error; // nextjs redirect throws the error
  }
}

export async function logOut() {
  // await sleep(1000);
  await signOut({ redirectTo: "/" });
}

export async function signUp(prevState: unknown, formData: unknown) {
  // await sleep(1000);
  // check if formData is a FormData type
  if (!(formData instanceof FormData)) {
    return { message: "Invalid form data." };
  }
  // convert formData to object
  const formDataEntries = Object.fromEntries(formData.entries());

  // validation
  const validatedAuthData = authSchema.safeParse(formDataEntries);
  if (!validatedAuthData.success) {
    return { message: "Invalid auth data." };
  }
  const hashedPassword = await bcrypt.hash(validatedAuthData.data.password, 10);

  try {
    await prisma.user.create({
      data: {
        email: validatedAuthData.data.email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Email already exists." };
      }
    }
    return { message: "Could not create a user." };
  }

  await signIn("credentials", formData);
}

// Payment actions
export async function serverCreateCheckoutSession() {
  const session = await checkAuth();
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
  });
  redirect(checkoutSession.url);
}

// ---Pet actions---
export async function serverAddPet(pet: unknown) {
  // console.log("serverAddPet", pet);
  // await sleep(1000);
  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return { message: "Invalid pet data." };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return { message: "Could not add a pet." };
  }

  revalidatePath("/app", "layout");
}

export async function serverEditPet(petId: unknown, newPet: unknown) {
  // await sleep(1000);
  // auth check
  const session = await checkAuth();
  // validation check
  const validatedPet = petFormSchema.safeParse(newPet);

  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPet.success || !validatedPetId.success) {
    return { message: "Invalid pet data." };
  }

  // authorization check (user owns pet)
  const pet = await getPetByPetId(validatedPetId.data);
  if (!pet) {
    return { message: "Pet not found." };
  }

  if (pet.userId !== session.user.id) {
    return { message: "Not authorized." };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return { message: "Could not edit a pet" };
  }
  revalidatePath("/app", "layout");
}

export async function serverDeletePet(petId: unknown) {
  // await sleep(1000);

  // auth check
  const session = await checkAuth();

  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return { message: "Invalid pet data." };
  }

  // authorization check (user owns pet)
  const pet = await getPetByPetId(validatedPetId.data);

  if (!pet) {
    return { message: "Pet not found." };
  }

  if (pet.userId !== session.user.id) {
    return { message: "Not authorized." };
  }

  // database mutation
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return { message: "Could not delete a pet" };
  }
  revalidatePath("/app", "layout");
}
