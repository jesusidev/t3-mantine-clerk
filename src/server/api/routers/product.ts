import { createTRPCRouter, protectedProcedure } from '../trpc';
import { productInput, productProjectInput, updateProductInput } from '~/types/product';
import { z } from 'zod';

export const productRouter = createTRPCRouter({
  get: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.findUnique({
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        remaining: true,
      },
      where: {
        id: input.id,
      },
    });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      orderBy: [{ createdAt: 'desc' }],
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        remaining: true,
      },
      where: {
        userId: ctx.auth.userId,
      },
    });
    return products;
  }),
  getByProject: protectedProcedure.input(z.object({ projectId: z.string() })).query(async ({ ctx, input }) => {
    const products = await ctx.prisma.product.findMany({
      orderBy: [{ createdAt: 'desc' }],
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      where: {
        userId: ctx.auth.userId,
        projectId: input.projectId,
      },
    });
    return products;
  }),
  createByProject: protectedProcedure
    .input(productProjectInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.create({
        data: {
          name: input.name,
          brand: input.brand,
          sku: input.sku,
          project: {
            connect: {
              id: input.projectId,
            },
          },
          user: {
            connect: {
              id: ctx.auth.userId,
            },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(productInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.create({
        data: {
          name: input.name,
          brand: input.brand,
          sku: input.sku,
          isFavorite: input.isFavorite,
          remaining: {
            create: {
              quantity: input.quantity,
            },
          },
          user: {
            connect: {
              id: ctx.auth.userId,
            },
          },
        },
      });
    }),
  createCategory: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.update({
        where: {
          id: input.id,
        },
        data: {
          categories: {
            create: [
              {
                category: {
                  create: {
                    name: input.name,
                  },
                },
              },
            ],
          },
        },
      });
    }),
  update: protectedProcedure
    .input(updateProductInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          brand: input.brand,
          sku: input.sku,
          isFavorite: input.isFavorite,
        },
      });
    }),
  delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.product.delete({
      where: {
        id: input.id,
      },
    });
  }),
});
