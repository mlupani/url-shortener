
import { defineAction } from "astro:actions";
import { db, eq, Url } from "astro:db";
import { z } from 'zod'

export const getUrlByShortenedUrl = defineAction({
    accept: 'json',
    input: z.string(),
    handler: async (shortUrl, context) => {

        if(!shortUrl){
            throw new Error('Shortened URL is required');
        }

        const [data] = await db.select().from(Url).where(eq(Url.short_url, import.meta.env.SITE_URL+shortUrl));
        return data.url;

    },
});