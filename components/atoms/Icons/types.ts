export type IconType =
  | "avatar"
  | "account"
  | "arrow-left"
  | "arrow-right"
  | "arrow-up-right"
  | "au"
  | "like"
  | "message"
  | "bronze-medal"
  | "calendar"
  | "carbon-location"
  | "chevron-down"
  | "chevron-right"
  | "clock-2"
  | "clock"
  | "close"
  | "computer"
  | "currency-dollar-circle"
  | "downvote"
  | "downvoted"
  | "edit"
  | "eye"
  | "gold-medal"
  | "hamburger"
  | "home"
  | "job-search"
  | "link"
  | "location"
  | "mingcute-down-line"
  | "moon"
  | "question"
  | "search"
  | "sign-up"
  | "silver-medal"
  | "star-filled"
  | "star-red"
  | "star"
  | "stars"
  | "suitcase"
  | "sun"
  | "tag"
  | "trash"
  | "upvote"
  | "upvoted"
  | "user"
  | "users"
  | "filled-down-votes"
  | "filled-up-votes";

export interface Props {
  type?: IconType;
  className?: string;
  size?: number;
  color?: string;
  onClick?: () => void;
  uri?: string;
}
