
import { defineAction } from "astro:actions";
import { db, Url } from "astro:db";
import { getSession } from "auth-astro/server";
import { z } from 'zod'

export const crearShortenerURL = defineAction({
    accept: 'json',
    input: z.object({
        url: z.string(),
        slug: z.string()
    }),
    handler: async ({url, slug}, context) => {
            if(!url){
                throw new Error('URL is required');
            }

            const session = await getSession(context.request);
            const email = session?.user?.email ?? null;

            const shortUrl = slug +"/"+Math.random().toString(36).substr(2, 5);

            const [data] = await db.insert(Url).values({
                url: url,
                short_url: import.meta.env.SITE_URL+shortUrl,
                userId: email
            }).returning();
            return data;
    },
});