import * as React from "react";
import { StyleSheet, Button } from "react-native";

import { Text, View } from "../components/Themed";

import GlobalState from "../GlobalState";
import PostThumbList from "../components/PostThumbList";
import Post from "../api/Post";

export default function TabOneScreen() {
    const [posts, setPosts] = React.useState([] as Post[]);

    async function exampleApiCall() {
        console.log("Button press!");
        const b = GlobalState.instance.booru;
        const resPosts = await b.getPosts(["matoi_ryuuko"]);
        console.log("got", resPosts.length, "posts");
        setPosts(resPosts);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Button title="My magic button" onPress={exampleApiCall}></Button>
            <PostThumbList posts={posts}></PostThumbList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
