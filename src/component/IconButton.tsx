import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
const { width: wWidth, height: wHeight } = Dimensions.get("window");
interface IconButtonProps {
  onPress: () => void;
  iconName: any;
  size: number;
}

const IconButton = ({ onPress, iconName, size }: IconButtonProps) => {
  const styles = StyleSheet.create({
    btnbtn: {
      //       backgroundColor: "cyan",
      backgroundColor: "#000000",
      height: size * 1.2,
      width: size * 1.2,
      borderRadius: (size * 1.2) / 2,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <TouchableOpacity {...{ onPress }}>
      <View style={styles.btnbtn}>
        <Icon name={iconName} size={size} color="white" />
      </View>
    </TouchableOpacity>
  );
};
IconButton.defaultProps = {
  size: 46,
};

export default IconButton;
