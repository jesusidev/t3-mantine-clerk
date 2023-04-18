import { createTRPCRouter, protectedProcedure } from '../trpc';
import { projectInput } from '~/types/project';
import { z } from 'zod';

export const projectRouter = createTRPCRouter({
  get: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input: { id } }) => {
    return await ctx.prisma.project.findUnique({
      where: {
        id: id,
      },
    });
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const projects = await ctx.prisma.project.findMany({
      where: {
        userId: ctx.auth.userId,
      },
    });
    return projects.map(({ name, updatedAt, id, status }) => ({ name, updatedAt, id, status }));
  }),
  create: protectedProcedure.input(projectInput).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.project.create({
      data: {
        name: input.name,
        userId: ctx.auth.userId,
      },
    });
  }),
});