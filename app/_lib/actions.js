"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

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
    .eq("id", session?.user?.guestId);

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

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  const guestBooking = await getBookings(session.user.guestId);

  const guestBookingIds = guestBooking.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("Unauthorized to delete booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  const guestBooking = await getBookings(session.user.guestId);

  const guestBookingIds = guestBooking.map((booking) => booking.id);

  const bookingId = Number(formData.get("bookingId"));

  if (!guestBookingIds.includes(bookingId))
    throw new Error("Unauthorized to update booking");

  const updateData = {
    num_guests: Number(formData.get("num_guests")),
    observations: formData.get("observations").slice(0, 500),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

// todo -> when using bind data in form actions -> the formData comes as the second argument
export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  // todo -> if theres a lot of data in form data -> we can use Object.entries(formData) to get the data

  const newBooking = {
    ...bookingData,
    guest_id: session.user.guestId,
    num_guests: Number(formData.get("num_guests")),
    observations: formData.get("observations").slice(0, 500),
    extras_price: 0,
    total_price: bookingData.cabin_price,
    status: "unconfirmed",
    has_breakfast: false,
    is_paid: false,
  };

  const { error } = await supabase
    .from("bookings")
    .insert([{ ...newBooking }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabin_id}`);

  redirect("/cabins/thankyou");
}
