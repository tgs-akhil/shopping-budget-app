"use server";
import { db } from "@/db";

export default async function DeleteData(id: number) {
  await db.shopping.delete({
    where: { id },
  });
}
