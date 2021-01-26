import { decode } from "html-entities";
import Post from "../Post";
import Tag from "../Tag";

interface JsonResponseItem {
    [key: string]: string | number;
}

export default class GelbooruPost implements Post {
    id: string;
    sourceUrl: string;
    tags: Tag[];
    isFavorited = false;
    isDetailsLoaded = false;
    
    urlFull: string;
    urlLarge: string;
    urlSmall: string;
    siteUrl: string;

    private directory: string;
    private hash: string;

    constructor(json: JsonResponseItem) {
        this.id = json["id"].toString();
        this.sourceUrl = decode(json["source"] as string);
        this.directory = json["directory"] as string;
        this.hash = json["hash"] as string;

        this.urlFull = json["file_url"] as string;
        this.urlLarge = `https://img2.gelbooru.com/samples/${this.directory}/sample_${this.hash}.jpg`;
        this.urlSmall = `https://thumbs.gelbooru.com/${this.directory}/thumbnail_${this.hash}.jpg`;
        this.siteUrl = `https://gelbooru.com/index.php?page=post&s=view&id=${this.id}`;

        this.tags = (json["tags"] as string)
            .split(" ")
            .map(tagName => new Tag(tagName));
    }

    static fromJson(jsonArr: JsonResponseItem[]): GelbooruPost[] {
        return jsonArr.map(jsonItem => new GelbooruPost(jsonItem));
    }

    // TODO: loadDetails(): Promise<void>;
}
