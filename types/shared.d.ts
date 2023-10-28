export type Tag = {
  _id: string;
  name: string;
  description: string;
  questions: Question[];
  followers: User[];
  createdOn: Date;
};

export type User = {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  savedQuestions: Schema.Types.ObjectId[];
  joinedAt: Date;
};

export type Question = {
  _id: string;
  title: string;
  content: string;
  tags: Tag[];
  views: number;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: User;
  answers: Schema.Types.ObjectId[];
  createdAt: Date;
};

export type Answer = {
  _id: string;
  content: string;
  question: Question;
  author: User;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
};

export interface CreateAnswerParams {
  clerkId: string;
  questionId: string;
  content: string;
  path: string;
}
