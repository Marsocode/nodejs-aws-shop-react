import * as Yup from "yup";

export const ProductSchema = Yup.object({
  id: Yup.string(),
  title: Yup.string().required().default(""),
  description: Yup.string().default(""),
  price: Yup.number().positive().required().defined().default(0),
  image: Yup.string().url().nullable().notRequired(),
});

export const AvailableProductSchema = ProductSchema.shape({
  count: Yup.number().integer().min(0).required().defined().default(0),
});

export type Product = Omit<Yup.InferType<typeof ProductSchema>, "image"> & {
  image?: string | null;
};
export type AvailableProduct = Omit<
  Yup.InferType<typeof AvailableProductSchema>,
  "image"
> & {
  image?: string | null;
};
