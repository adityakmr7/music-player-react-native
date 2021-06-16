import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import PlayScreen from "./src/screens/PlayScreen";

export type StackParams = {
  Home: undefined;
  Play: undefined;
};
export type StackNavProps<T extends keyof StackParams> = {
  navigation: StackNavigationProp<StackParams, T>;
  route: RouteProp<StackParams, T>;
};
const Stack = createStackNavigator<StackParams>();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Play" component={PlayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default function App() {
  return <Navigator />;
}
