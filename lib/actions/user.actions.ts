"use server";
import { connectToDatabase } from "../mongoose";

import * as Models from "../model";
import { revalidatePath } from "next/cache";
import { User } from "@/types/shared";

// export async function deleteUser(clearkId: string) {
//   try {
//     connectToDatabase();

//     const user = await Models.User.findOneAndDelete({
//       clearkId: clearkId,
//     });
//     if (!user) {
//       throw new Error("User not found!");
//     }
//     const userQuestionsIds = await Models.Question.find({
//       auther: user._id,
//     }).distinct("_id");

//     //delete user questions
//     await Models.Question.deleteMany({ auther: user._id });

//     const deleteUser = await Models.User.findByIdAndDelete(user._id);

//     //todo:delete answare as well here using userQuestionId
//     return deleteUser;
//   } catch (error) {
//     throw error;
//   }
// }

export async function getUserById(userId: string) {
  try {
    connectToDatabase();

    const user = await Models.User.findOne({
      clerkId: userId,
    });

    if (!user) throw new Error("User not found!");

    return user as User;
  } catch (error) {
    throw error;
  }
}

export async function createUser(userData: Partial<Models.IUser>) {
  try {
    connectToDatabase();

    const newUser = await Models.User.create(userData);
    return newUser;
  } catch (error) {
    throw error;
  }
}

interface UpdateUserParams {
  clearkId: string;
  updateData: Partial<Models.IUser>;
  path: string;
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clearkId, path, updateData } = params;

    await Models.User.findOneAndUpdate(
      {
        clearkId: clearkId,
      },
      updateData,
      {
        new: true,
      }
    );
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    connectToDatabase();

    const allUsers = await Models.User.find({}).sort({
      createdAt: -1,
    });

    return allUsers;
  } catch (error) {
    throw error;
  }
}
