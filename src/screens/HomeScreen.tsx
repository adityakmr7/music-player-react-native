import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { StackNavProps } from "../../App";
import { globalColor } from "../theme";

const HomeScreen = ({ navigation }: StackNavProps<"Home">) => {
  const [mediaFile, setMediaFile] = useState<MediaLibrary.Asset[]>([]);
  useEffect(() => {
    getMediaFiles();
  }, []);

  const getMediaFiles = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    const options = {
      mediaType: MediaLibrary.MediaType.audio,
    };
    if (status === "granted") {
      const media = await MediaLibrary.getAssetsAsync(options);
      const { assets } = media;
      console.log("assets", assets);
      setMediaFile(assets);
    } else {
      console.log("Ohh No Permissions Granted");
    }
  };
  const handleNavigation = (item: MediaLibrary.Asset) => {
    // TODO:  handle Navigation to play screen
    navigation.navigate("Play", {
      data: item,
    });
  };
  return (
    <View style={styles.root}>
      <ScrollView>
        {mediaFile.map((item, i) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleNavigation(item)}
            >
              <View style={styles.box}>
                <Text style={styles.songTitle}>{item.filename}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: globalColor[2],
  },
  box: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    height: 60,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  songTitle: {
    color: globalColor[7],
  },
});
export default HomeScreen;
