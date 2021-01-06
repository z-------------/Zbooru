import Post from "./Post";

export default interface Booru {
    name: string;
    host: string;
    userId: string;

    getPosts(tags: string[]): Promise<Post[]>;
}
