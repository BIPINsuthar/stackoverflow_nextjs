export interface Props {
  onClick?: () => void;
  title: string;
  tags?: Tag[];
}

export type Tag = {
  name: string;
  description: string;
  createdOn: Date;
};
