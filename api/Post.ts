import Tag from "./Tag";

export default interface Post {
    id: string;
    sourceUrl: string;
    tags: Tag[];

    urlSmall: string; // image used as thumbnail
    urlLarge: string; // image shown in detail view
    urlFull: string; // the full-sized image

    siteUrl: string; // the url of the booru post

    isFavorited: boolean;

    isDetailsLoaded: boolean;
    // loadDetails(): Promise<void>;
}
