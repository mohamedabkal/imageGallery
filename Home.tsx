import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";

const { height, width } = Dimensions.get("window");

const images = new Array(8)
  .fill("0")
  .map((_, i) => `https://picsum.photos/id/23${i}/200/200`);

export const Home = () => {
  const { navigate } = useNavigation();

  return (
    <>
      <StatusBar style="dark" />
      <FlatList
        data={images}
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        numColumns={2}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => navigate("Photos", { index })}>
            <Image source={item} style={styles.image} />
          </Pressable>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 60,
  },
  image: {
    width: width / 2,
    height: width / 2,
  },
});
