import MockApiResponses from "../../constants/MockApiResponses";

import Booru from "../Booru";
import GelbooruPost from "./GelbooruPost";

interface Dictionary<T> {
    [key: string]: T;
}

export default class Gelbooru implements Booru {
    static readonly ENDPOINT = "/index.php";

    name = "Gelbooru";
    host = "https://gelbooru.com";

    constructor(
        public userId: string,
        private apiKey: string,
    ) {}

    private apiBase = this.host + Gelbooru.ENDPOINT;

    private get hasCredentials() {
        return this.userId.length !== 0 && this.apiKey.length !== 0;
    }

    private get credentialsPairs() {
        return { "user_id": this.userId, "api_key": this.apiKey };
    }

    /**
     * Perform an API call and return the JSON result.
     * @param pairs A dictionary of GET parameter key-value pairs.
     */
    private async api(pairs: Dictionary<string>): Promise<any> {
        if (__DEV__) console.warn("We are in development mode; try to keep network API calls to a minimum.");

        const params = this.hasCredentials ?
            Object.assign(this.credentialsPairs, pairs) :
            pairs;
        const url = this.apiBase + "?json=1" +
            Object.entries(params).map(kv => "&" + kv.join("=")).join("");
        console.log("Calling API:", url);
        return (await fetch(url)).json();
    }

    async getPosts(tags: string[]): Promise<GelbooruPost[]> {
        if (__DEV__) return GelbooruPost.fromJson(MockApiResponses.posts);

        const json = await this.api({
            page: "dapi", s: "post", q: "index", limit: "50",
            tags: tags.join(" "),
        });
        return GelbooruPost.fromJson(json);
    }
}
