export type Order = {
  id: string;
  pricePaidInCents: number;
  userId?: string;
  productId?: string;
  createdAt: Date;
  updatedAt: Date;
};
