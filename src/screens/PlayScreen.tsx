import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { IconButton } from "../component";
import Slider from "@react-native-community/slider";
import { StackNavProps } from "../../App";
import { Audio, AVPlaybackStatus } from "expo-av";

const { width: wWidth } = Dimensions.get("window");
const PlayScreen = ({ navigation, route }: StackNavProps<"Play">) => {
  const data = route.params;
  const [sound, setSound] = useState<any>();
  const [playing, setPlaying] = useState(false);
  const [slider, setSlider] = useState({ start: 0, end: 0 });

  const [state, setState] = useState({
    isLoaded: true,
    uri: "",
    progressUpdateIntervalMillis: 0,
    durationMillis: 0, // start
    positionMillis: 0, // complete
    playableDurationMillis: 0,
    seekMillisToleranceBefore: 0,
    seekMillisToleranceAfter: 0,
    shouldPlay: false,
    isPlaying: false,
    isBuffering: false,
    rate: 0,
    shouldCorrectPitch: false,
    volume: 1,
    isMuted: false,
    isLooping: false,
    didJustFinish: false,
  });

  const _handlePlay = async () => {
    const { sound } = await Audio.Sound.createAsync(
      data.data,
      // initialStatus,
      undefined,
      _handlePlayBackStatus
    );
    setSound(sound);

    if (playing) {
      await sound.pauseAsync();
      setPlaying(false);
    } else {
      await sound.playAsync();
      setPlaying(true);
    }
  };

  const _handlePlayBackStatus = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setState((prev) => ({
        ...prev,
        ...status,
      }));
      _sliderUpdate(status.positionMillis, state.durationMillis);
    }
  };

  function _getMMSSFromMillis(millis: number) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number: any) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }
  const _getDurationSecond = (millis: number) => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    return seconds;
  };

  const _sliderUpdate = (duration: any, endDuration: any) => {
    const start = _getDurationSecond(duration);
    const end = _getDurationSecond(endDuration);
    setSlider((prev) => ({
      ...prev,
      start: start,
      end: end,
    }));
  };

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  const { isLoaded } = state;
  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Image
              style={{ width: wWidth * 0.8, height: wWidth }}
              source={{
                uri: "https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/the-weeknd-starboy-no-1_erufgn/the-weeknd-starboy-every-song-charting-hot-100-drake.jpg",
              }}
            />
          </View>
        </View>
        <View style={styles.sleekContainer}>
          <View>
            <Slider
              style={{ width: wWidth * 0.95, height: 40 }}
              value={slider.start}
              maximumValue={slider.end}
              minimumTrackTintColor="grey"
              maximumTrackTintColor="#000000"
            />
            <View style={styles.sliderLabel}>
              <Text>
                {state.isLoaded
                  ? _getMMSSFromMillis(state.positionMillis)
                  : "0:00"}
              </Text>
              <Text>
                {state.isLoaded
                  ? _getMMSSFromMillis(state.durationMillis)
                  : "0:00"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.btn}>
            <IconButton onPress={() => {}} iconName="chevron-left" />
            <IconButton
              size={60}
              onPress={() => _handlePlay()}
              iconName={playing ? "pause" : "play"}
            />
            <IconButton onPress={() => {}} iconName="chevron-right" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    marginHorizontal: 10,
    flex: 1,
  },
  header: {
    flex: 2,
  },
  sleekContainer: {
    // flex: 1,
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: "row",
    marginBottom: 30,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wWidth * 0.6,
    marginHorizontal: 60,
  },
  sliderLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
});
export default PlayScreen;
