import * as React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { Text } from "./Themed";

const styles = StyleSheet.create({
    postThumb: {
        width: 100,
        height: 100,
    },
});

interface PostThumbProps {
    postId: string;
    postStuff: boolean;
    postUrlSmall: string;
    onPress: (postId: string) => void;
}

export default function PostThumb({
    postId,
    postStuff,
    postUrlSmall,
    onPress
}: PostThumbProps) {
    return (
        <Pressable onPress={() => onPress(postId)}>
            <Text
                lightColor="#000000"
                darkColor="#ffffff"
            >
                {"{"}
                {postStuff ? "yes" : "no"}
                {"}"}
            </Text>
            <Image
                style={styles.postThumb}
                source={{uri: postUrlSmall}}
            />
        </Pressable>
    );
}
