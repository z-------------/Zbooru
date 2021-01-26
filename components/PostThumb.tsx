import * as React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import Post from "../api/Post";
import { GlobalPostsState, useGlobalPostsState } from "../state/GlobalPostsState";
import { Text } from "./Themed";

const styles = StyleSheet.create({
    postThumb: {
        width: 100,
        height: 100,
    },
});

export default function PostThumb(props: {
    postId: string;
}) {
    const [post, setPost] = useGlobalPostsState(props.postId);

    function handlePress() {
        console.log("PostThumb#handlePress", props.postId);
        const newPost = Object.assign({}, post);
        newPost.isFavorited = !post.isFavorited;
        console.log("newPost.isFavorited =", newPost.isFavorited);
        setPost(newPost);
    }

    if (post.isFavorited) {
        console.log(post);
        console.log(post.urlSmall);
    }

    return (
        <Pressable onPress={handlePress}>
            <Text
                lightColor="#000000"
                darkColor="#ffffff"
            >
                {"{"}
                {post.isFavorited ? "yes" : "no"}
                {"}"}
            </Text>
            <Image
                style={styles.postThumb}
                source={{uri: post.urlSmall}}
            />
        </Pressable>
    );
}
