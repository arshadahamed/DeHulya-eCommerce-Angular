import { Product } from "../../models/product.model";


export interface apiResultFormat {
  data: Product[];
  totalData: number;
}
