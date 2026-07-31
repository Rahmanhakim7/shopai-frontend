import { ProductQueryParams } from "../types/product";

export const PRODUCT_SORT_OPTIONS: {
  label: string;
  value: NonNullable<ProductQueryParams["ordering"]>;
}[] = [
  {
    label: "Terbaru",
    value: "latest",
  },
  {
    label: "Harga Terendah",
    value: "price_asc",
  },
  {
    label: "Harga Tertinggi",
    value: "price_desc",
  },
  {
    label: "Nama A-Z",
    value: "name_asc",
  },
  {
    label: "Nama Z-A",
    value: "name_desc",
  },
];
