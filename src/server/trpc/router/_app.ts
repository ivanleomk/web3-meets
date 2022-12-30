import { router } from "../trpc";
import { eventRouter } from "./events";

export const appRouter = router({
  events: eventRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
