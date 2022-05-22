export type orders = {
  id?: string | undefined;
  user_id: number;
  products: orderp[];
  status?: string | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
};
export type orderp = {
  product_id: number;
  quantity: number;
};
