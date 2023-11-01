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

export type HomePageFilter =
  | "unanswered"
  | "recommended questions"
  | "newest"
  | "frequent";

export type CommunityFilter = "new user" | "old user" | "top contributors";

export type CollectionFilter =
  | "most recent"
  | "oldest"
  | "most voted"
  | "most viewed"
  | "most answered";

export type TagsFilter = "popular" | "recent" | "name" | "old";

export type TagQuestionFilter =
  | "highestupvotes"
  | "lowestupvotes"
  | "recent"
  | "old";

export type AnswerFilter =
  | "highestupvotes"
  | "lowestupvotes"
  | "recent"
  | "old";

export type SearchParams = {
  search: string;
};

export type HomePageSearchParams = {
  search: string;
  filter: HomePageFilter;
  page: string;
};

export type CommunitySearchParams = {
  search: string;
  filter: CommunityFilter;
};

export type CollectionSearchParams = {
  search: string;
  filter: CollectionFilter;
};

export type TagSearchParams = {
  search: string;
  filter: TagsFilter;
};

export type TagQuestionParams = {
  id: string;
};

export type QuestionParams = {
  id: string;
};

export type QuestionSearchParams = {
  search: string;
  filter: AnswerFilter;
};

export type TagQuestionSearchParams = {
  search: string;
  filter: TagQuestionFilter;
};

export type TagQuestionPage = {
  params: TagQuestionParams;
  searchParams: TagQuestionSearchParams;
};

export type QuestionPage = {
  params: QuestionParams;
  searchParams: QuestionSearchParams;
};
