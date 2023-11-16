import { useNavigation, useRoute } from "@react-navigation/native";
import { useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AwesomeGallery, { GalleryRef } from "react-native-awesome-gallery";
import * as React from "react";
import { Image } from "expo-image";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const images = new Array(8)
  .fill("0")
  .map((_, i) => `https://picsum.photos/id/23${i}/200/200`);

const renderItem = ({ item, index, setImageDimensions }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Image
        source={`https://picsum.photos/id/23${index}/2000/2000`}
        style={StyleSheet.absoluteFillObject}
        contentFit="contain"
        placeholder={item}
        placeholderContentFit="contain"
        onLoad={(e) => {
          const { width, height } = e.source;
          setImageDimensions({ width, height });
        }}
        onLoadEnd={() => setLoading(false)}
        onLoadStart={() => setLoading(true)}
      />
      {loading && (
        <ActivityIndicator
          size="large"
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
          color="white"
        />
      )}
    </>
  );
};

export const Photos = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const gallery = useRef<GalleryRef>(null);
  const { top } = useSafeAreaInsets();

  const [index, setIndex] = useState(params.index);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View
        entering={FadeInUp.duration(250)}
        exiting={FadeOutUp.duration(250)}
        style={[
          styles.toolbar,
          {
            height: top + 60,
            paddingTop: top,
          },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>
            {index + 1} / {images.length}
          </Text>
        </View>
      </Animated.View>
      <AwesomeGallery
        ref={gallery}
        data={images}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        initialIndex={index}
        // onTap={onTap}
        // onDoubleTap={onTap}
        onSwipeToClose={goBack}
        disableSwipeUp={true}
        numToRender={3}
        onIndexChange={setIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toolbar: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  bottomToolBar: {
    bottom: 0,
  },
  headerText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
});
