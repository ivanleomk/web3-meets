import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const eventRouter = router({
  getEvents: publicProcedure
    .input(
      z.object({
        selectedMonth: z.number().min(0).max(12),
        selectedYear: z.number().min(2022),
      })
    )
    .query(async ({ input, ctx }) => {
      const events = await ctx.prisma.event.findMany({
        where: {
          year: input.selectedYear.toString(),
          month: input.selectedMonth.toString(),
          approved: true,
        },
      });

      return events;
    }),
  addEvent: publicProcedure
    .input(
      z.object({
        eventName: z.string(),
        eventDescription: z.string(),
        eventStart: z.date(),
        eventEnd: z.date(),
        location: z.string(),
        eventImage: z.string(),
        eventCost: z.string(),
        eventType: z.string(),
        user: z.string(),
        month: z.string(),
        year: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const event = await ctx.prisma.event.create({
        data: {
          title: input.eventName,
          description: input.eventDescription,
          eventStart: input.eventStart,
          eventEnd: input.eventEnd,
          location: input.location,
          eventImage: input.eventImage,
          eventCost: input.eventCost,
          eventType: input.eventType,
          month: input.month,
          year: input.year,
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
