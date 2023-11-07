import { Model } from "mongoose";
import * as Models from "../lib/model";
import { FilterType } from "./shared";

export type CreateUserProps = Partial<Models.IUser>;

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<Models.IUser>;
  path: string;
}

export interface GetAllUserProps {
  searchQuery: string;
  filter?: CommunityFilter;
  pageNo?: number;
  pageSize?: number;
}

export interface AllSavedQuestionsProps {
  userId: string;
  searchQuery?: string;
  filter?: CollectionFilter;
  pageNo?: number;
  pageSize?: number;
}

export interface GetTopInteractedTagProps {
  userId: string;
  limit?: number;
}

export interface GetAllTagsProps {
  searchQuery: string;
  filter?: TagsFilter;
  pageNo?: number;
  pageSize?: number;
}

export interface getQuestionsByTagIdProps {
  tagId: string;
  searchQuery: string;
  filter?: TagQuestionFilter;
  pageNo?: number;
  pageSize?: number;
}

export interface GetAllQuestionsProps {
  searchQuery?: string | null;
  filter?: HomePageFilter;
  pageNo?: number;
  pageSize?: number;
}

export interface CreateQuestionProps {
  title: string;
  content: string;
  tags: string[];
  author: string;
  path: string;
}

export interface UpdateQuestionProps {
  questionId: string;
  updateData: Partial<{
    title: string;
    content: string;
    tags: string[];
  }>;
  path: string;
}

export interface UpvoteQuestionsProps {
  questionId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface DownvoteQuestionProps {
  questionId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface GetUserQuestionsProps {
  userId: string;
  page: number;
  pageSize: number;
}

export interface DeleteQuestionProps {
  questionId: string;
  path: string;
}

export interface ViewQuestionProps {
  userId?: string;
  questionId: string;
}

export interface GetAllAnswerProps {
  questionId: string;
  filter: AnswerFilter;
}

export interface CreateAnswerProps {
  clerkId: string;
  questionId: string;
  content: string;
  path: string;
}

export interface UpvoteAnswerProps {
  answerId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface DownvoteAnswerProps {
  answerId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface GetUsersAnswerProps {
  userId: string;
  page: number;
  pageSize: number;
}
export interface DeleteAnswerProps {
  answerId: string;
  path: string;
}

export interface ModelAndTypesProps {
  model: Model<any, {}, {}, {}, any, any>;
  searchField: string;
  type: FilterType;
}
