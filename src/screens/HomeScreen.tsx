import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { StackNavProps } from "../../App";

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
  const handleNavigation = () => {
    // TODO:  handle Navigation to play screen
    navigation.navigate("Play");
  };
  return (
    <View style={styles.root}>
      <ScrollView>
        {mediaFile.map((item, i) => {
          return (
            <TouchableOpacity key={item.id} onPress={handleNavigation}>
              <View style={styles.box}>
                <Text>{item.filename}</Text>
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
    backgroundColor: "#ffff",
  },
  box: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    height: 60,
    justifyContent: "center",
    marginHorizontal: 20,
  },
});
export default HomeScreen;
