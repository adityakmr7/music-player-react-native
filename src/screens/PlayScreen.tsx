import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { IconButton } from "../component";
import Slider from "@react-native-community/slider";
import { StackNavProps } from "../../App";
import { Audio, AVPlaybackStatus } from "expo-av";
import { _getDurationSecond, _getMMSSFromMillis } from "../utils/playscreen";
import { globalColor } from "../theme";
const { width: wWidth } = Dimensions.get("window");
const BORDER_RADIUS = 20;
const BACKGROUND_COLOR = globalColor[2];
const TEXT_COLOR = globalColor[7];
const PlayScreen = ({ navigation, route }: StackNavProps<"Play">) => {
  const data = route.params;
  const [sound, setSound] = useState<any>();
  const [playing, setPlaying] = useState(false);

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
    const { sound, status } = await Audio.Sound.createAsync(
      data.data,
      // initialStatus,
      undefined,
      _handlePlayBackStatus
    );
    setSound(sound);
    playAndPause(sound);
    // playBackStatus(status);
  };
  // const playBackStatus = (status: any) => {
  //   setState((prev) => ({
  //     ...prev,
  //     ...status,
  //   }));
  // };

  const playAndPause = async (status: any) => {
    if (state.isPlaying) {
      await status.pauseAsync();
      setPlaying(false);
    } else {
      await status.playAsync();
      setPlaying(true);
    }
  };
  const _handlePlayBackStatus = async (status: AVPlaybackStatus) => {
    setState((prev) => ({
      ...prev,
      ...status,
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

  const _handleMute = async () => {
    if (sound !== "") {
      await sound.setIsMutedAsync(!state.isMuted);
    }
  };
  const _handleSeek = async (value: any) => {
    if (sound !== "") {
      await sound.playFromPositionAsync(value);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Image
              style={styles.image}
              source={{
                uri: "https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/the-weeknd-starboy-no-1_erufgn/the-weeknd-starboy-every-song-charting-hot-100-drake.jpg",
              }}
            />
          </View>
        </View>
        <View style={styles.sleekContainer}>
          <View>
            <Slider
              onValueChange={_handleSeek}
              style={{ width: wWidth * 0.95, height: 40 }}
              value={state.positionMillis}
              maximumValue={state.durationMillis}
              thumbTintColor={globalColor[3]}
              minimumTrackTintColor={globalColor[3]}
              maximumTrackTintColor={globalColor[6]}
            />
            <View style={styles.sliderLabel}>
              <Text style={styles.sleekduration}>
                {state.isLoaded
                  ? _getMMSSFromMillis(state.positionMillis)
                  : "0:00"}
              </Text>
              <Text style={styles.sleekduration}>
                {state.isLoaded
                  ? _getMMSSFromMillis(state.durationMillis)
                  : "0:00"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.btn}>
            <IconButton
              buttonType="outline"
              onPress={() => {}}
              iconName="chevron-left"
            />
            <IconButton
              buttonType="filled"
              size={60}
              onPress={() => _handlePlay()}
              iconName={playing ? "pause" : "play"}
            />
            <IconButton
              buttonType="outline"
              onPress={() => {}}
              iconName="chevron-right"
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <IconButton
            buttonType="outline"
            size={20}
            onPress={_handleMute}
            iconName={state.isMuted ? "volume-x" : "volume"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
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
  sleekduration: {
    color: TEXT_COLOR,
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
    borderRadius: BORDER_RADIUS,
  },
  image: { width: wWidth * 0.8, height: wWidth, borderRadius: BORDER_RADIUS },
  bottomContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PlayScreen;
