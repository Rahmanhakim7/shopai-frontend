export type ProductFormValues = {
  name: string;
  description: string;
  price: string;
  stock: string;
  status: "active" | "inactive" | "sold_out";
  condition: "new" | "used";
};
