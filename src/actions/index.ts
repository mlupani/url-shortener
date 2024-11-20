import { crearShortenerURL } from "./crearShortenerURL";
import { getUrlByShortenedUrl } from "./getUrlByShortenedUrl";
import { getUrlByUser } from "./getUrlsByUser";


export const server = {
    getUrlByShortenedUrl,
    crearShortenerURL,
    getUrlByUser
}