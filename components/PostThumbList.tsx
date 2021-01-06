import * as React from "react";
import { FlatList } from "react-native";
import Post from "../api/Post";
import PostThumb from "./PostThumb";

interface PostThumbListProps {
    posts: Post[];
}

export default function PostThumbList(props: PostThumbListProps) {
    const [posts, setPosts] = React.useState([] as Post[]);

    const renderItem = ({ item }: { item: Post }) => {
        console.log("renderItem", item.id);
        return (
            <PostThumb
                postId={item.id}
                postStuff={item.isDetailsLoaded}
                postUrlSmall={item.urlSmall}
                onPress={handlePress}
            ></PostThumb>
        );
    };

    React.useEffect(() => {
        console.log("posts prop changed");
        // update our state posts by adding only the prop posts that we don't already have
        const postsNew: Post[] = [];
        for (const propPost of props.posts) {
            const statePost = findPost(propPost.id);
            if (statePost != null) {
                postsNew.push(statePost);
            } else {
                postsNew.push(propPost);
            }
        }
        setPosts(postsNew);
    }, [props.posts]);

    function handlePress(postId: string) {
        console.log("handlePress.");
        setPosts(posts.map(post => {
            if (post.id === postId) {
                post.isDetailsLoaded = !post.isDetailsLoaded;
            }
            return post;
        }));
    }

    // Find a post in our state posts
    function findPost(postId: string) {
        for (const statePost of posts) {
            if (statePost.id === postId) {
                return statePost;
            }
        }
        return null;
    }

    return (
        <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={post => post.id}
        ></FlatList>
    );
}
