import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import PlayScreen from "./src/screens/PlayScreen";
import { globalColor } from "./src/theme";

export type StackParams = {
  Home: undefined;
  Play: { data: MediaLibrary.Asset };
};
export type StackNavProps<T extends keyof StackParams> = {
  navigation: StackNavigationProp<StackParams, T>;
  route: RouteProp<StackParams, T>;
};
const Stack = createStackNavigator<StackParams>();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            elevation: 0,
            backgroundColor: globalColor[2],
          },
          headerTitleStyle: {
            color: "#FFFFFF",
          },
          headerTintColor: "#ffffff",
        }}
      >
        <Stack.Screen
          options={{ title: "Wapp Player" }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Play" component={PlayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default function App() {
  return <Navigator />;
}
