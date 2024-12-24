"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateProfile(formData) {
  const session = await auth();

  if (!session) throw new Error("Not authenticated");

  const national_id = formData.get("national_id");
  const [nationality, country_flag] = formData.get("nationality").split("%");

  const idRegex = /^[a-zA-Z0-9]{6,12}$/;

  if (!idRegex.test(national_id)) throw new Error("Invalid national ID");

  const updateData = {
    nationality,
    country_flag,
    national_id,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session?.user?.guestId)
  

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");

}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
