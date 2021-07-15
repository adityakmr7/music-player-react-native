import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { globalColor } from "../theme";
const { width: wWidth, height: wHeight } = Dimensions.get("window");
interface IconButtonProps {
  onPress: () => void;
  iconName: any;
  size: number;
  buttonType: "filled" | "outline";
}

const IconButton = ({
  onPress,
  iconName,
  size,
  buttonType,
}: IconButtonProps) => {
  const styles = StyleSheet.create({
    btnbtn: {
      //       backgroundColor: "cyan",
      backgroundColor: "#ffffff",
      height: size * 1.2,
      width: size * 1.2,
      borderRadius: (size * 1.2) / 2,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const renderButton = () => {
    if (buttonType === "filled") {
      return (
        <LinearGradient
          style={styles.btnbtn}
          colors={[globalColor[6], globalColor[5]]}
        >
          <Icon name={iconName} size={size} color="white" />
        </LinearGradient>
      );
    } else {
      return <Icon name={iconName} size={size} color="white" />;
    }
  };
  return <TouchableOpacity {...{ onPress }}>{renderButton()}</TouchableOpacity>;
};
IconButton.defaultProps = {
  size: 46,
};

export default IconButton;
