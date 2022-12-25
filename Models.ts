export interface CommentInterface {
  id: string;
  text: string;
  user: string;
  userId: string;
  userPhoto?: string;
}

export interface RatedByInterface {
  rating: number;
  userId: string;
}

export interface RatingInterface {
  rate: number;
  count: number;
}

export interface ProductInterface {
  category: string;
  comments: CommentInterface[];
  description: string;
  id: string;
  image: string;
  price: number;
  ratedBy: RatedByInterface[];
  rating: RatingInterface;
  title: string;
}

export interface DisplayProductInterface {
  category: string;
  comments: CommentInterface[];
  description: string;
  id: string;
  image: string;
  price: number;
  ratedBy: RatedByInterface[];
  rating: RatingInterface;
  title: string;
  displayElement: boolean;
}

export interface ShoppingCartProductInterface {
  category: string;
  comments: CommentInterface[];
  description: string;
  id: string;
  image: string;
  price: number;
  ratedBy: RatedByInterface[];
  rating: RatingInterface;
  title: string;
  quantity: number;
}

export interface AlgoliaResultInterface {
  id: string;
  title: string;
  image: string;
  price: number;
}
