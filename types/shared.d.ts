export type Tag = {
  name: string;
  description: string;
  questions: Question[];
  followers: User[];
  createdOn: Date;
};

export type User = {
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
  savedQuestions: Question[];
  joinedAt: Date;
};

export type Question = {
  title: string;
  content: string;
  tags: Tag[];
  views: number;
  upvotes: User[];
  downvotes: User[];
  auther: User;
  // answers: Schema.Types.ObjectId[];
  createdAt: Date;
};
