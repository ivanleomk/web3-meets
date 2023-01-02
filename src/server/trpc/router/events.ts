import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const eventRouter = router({
  addEvent: publicProcedure
    .input(
      z.object({
        title: z.string(),
        startTime: z.date(),
        endTime: z.date(),
        description: z.string(),
        url: z.string(),
        location: z.string(),
        image: z.string(),
        freeEvent: z.boolean(),
        online: z.boolean(),
        organiserName: z.string(),
        user: z.string(),
        city: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const event = await ctx.prisma.event.create({
        data: {
          title: input.title,
          startTime: input.startTime,
          endTime: input.endTime,
          description: input.description,
          url: input.url,
          location: input.location,
          image: input.image,
          freeEvent: input.freeEvent,
          online: input.online,
          organiserName: input.organiserName,
          City: {
            connect: {
              name: input.city,
            },
          },
          user: {
            connect: {
              id: input.user,
            },
          },
        },
      });

      return event;
    }),
});
