"use server";
import { connectToDatabase } from "../mongoose";
import * as Models from ".././model";

export async function viewQuestion(params: {
  userId?: string;
  questionId: string;
}) {
  try {
    await connectToDatabase();

    const { questionId, userId } = params;

    if (userId) {
      const existingInteraction = await Models.Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) return console.log("User has already viewed.");

      //create interations
      await Models.Question.findByIdAndUpdate(questionId, {
        $inc: { views: 1 },
      });

      await Models.Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    throw error;
  }
}
