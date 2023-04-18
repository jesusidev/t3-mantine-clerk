import { z } from 'zod';
import { type RouterInputs, type RouterOutputs } from '~/utils/api';


type allProductOutputs = RouterOutputs['product']['getAll'];
type oneProductInput = RouterInputs['product']['create'];

export type Product = allProductOutputs[number];
export type ProductInput = oneProductInput;
export const productInput = z.object({
  name: z.string(),
  brand: z.string().optional(),
  sku: z.string().optional(),
  isFavorite: z.boolean().optional(),
  quantity: z.number().optional(),
});

export const productProjectInput = z.object({
  name: z.string(),
  brand: z.string().optional(),
  sku: z.string().optional(),
  projectId: z.string(),
});

export const updateProductInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  brand: z.string().optional(),
  sku: z.string().optional(),
  isFavorite: z.boolean().optional(),
});
