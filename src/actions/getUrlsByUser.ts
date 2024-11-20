import { defineAction } from "astro:actions";
import { db, desc, eq, Url } from "astro:db";
import { getSession } from "auth-astro/server";

export const getUrlByUser = defineAction({
    accept: 'json',
    handler: async (_, context) => {
        const session = await getSession(context.request);
        if(!session || !session.user){
            throw new Error('Unauthorized');
        }

        const data = await db.select().from(Url).where(eq(Url.userId, session.user.email ?? '')).orderBy(desc(Url.createdAt));
        return data
    },
});