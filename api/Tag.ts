export enum TagKind {
    Unknown, // e.g. when we've received a posts list but haven't yet requested detailed post info
    Artist,
    Character,
    Copyright,
    Metadata,
    Content, // a.k.a. "Tag" on the Gelbooru site
}

export default class Tag {
    constructor(
        public name: string,
        public kind = TagKind.Unknown,
        public id = "",
        public count = -1,
    ) {}
}
