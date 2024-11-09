export type Order = {
  id: string;
  userId?: string;
  productId?: string;
  pricePaidInCents: number;
  createdAt: Date;
  updatedAt: Date;
};
