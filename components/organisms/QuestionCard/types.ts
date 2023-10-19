export interface Props {
  onClick?: () => void;
  title: string;
  tags?: Tag[];
  user: User;
}

export type User = {
  name: string;
  picture: string;
};
export type Tag = {
  name: string;
  description: string;
  createdOn: Date;
};
