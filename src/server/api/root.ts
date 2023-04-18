import { createTRPCRouter } from '~/server/api/trpc';
import { productRouter } from '~/server/api/routers/product';
import { userRouter } from '~/server/api/routers/user';
import { projectRouter } from '~/server/api/routers/project';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  user: userRouter,
  project: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
