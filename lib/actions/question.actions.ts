"use server";

import { connectToDatabase } from "../mongoose";

export async function createQuestion() {
  console.log("called");
  try {
    connectToDatabase();
  } catch (error) {}
}
