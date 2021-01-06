import { decode } from "html-entities";

import Booru from "../Booru";
import Post from "../Post";
import Tag from "../Tag";

interface Dictionary<T> {
    [key: string]: T;
}

interface JsonResponseItem {
    [key: string]: string | number;
}

export class GelbooruPost implements Post {
    id: string;
    sourceUrl: string;
    tags: Tag[];
    isFavorited = false;
    isDetailsLoaded = false;
    
    urlFull: string;
    get urlLarge(): string { return `https://img2.gelbooru.com/samples/${this.directory}/sample_${this.hash}.jpg`; }
    get urlSmall(): string { return `https://thumbs.gelbooru.com/${this.directory}/thumbnail_${this.hash}.jpg`; }
    get siteUrl(): string { return `https://gelbooru.com/index.php?page=post&s=view&id=${this.id}`; }

    private directory: string;
    private hash: string;

    constructor(json: JsonResponseItem) {
        this.id = json["id"].toString();
        this.sourceUrl = decode(json["source"] as string);
        this.directory = json["directory"] as string;
        this.hash = json["hash"] as string;
        this.urlFull = json["file_url"] as string;

        this.tags = (json["tags"] as string)
            .split(" ")
            .map(tagName => new Tag(tagName));
    }

    static fromJson(jsonArr: JsonResponseItem[]): GelbooruPost[] {
        return jsonArr.map(jsonItem => new GelbooruPost(jsonItem));
    }

    // TODO: loadDetails(): Promise<void>;
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
        const params = this.hasCredentials ?
            Object.assign(this.credentialsPairs, pairs) :
            pairs;
        const url = this.apiBase + "?json=1" +
            Object.entries(params).map(kv => "&" + kv.join("=")).join("");
        return (await fetch(url)).json();
    }

    async getPosts(tags: string[]): Promise<GelbooruPost[]> {
        const json = await this.api({
            page: "dapi", s: "post", q: "index",
            tags: tags.join(" "),
        });
        return GelbooruPost.fromJson(json);
    }
}
