import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./Home";
import { Photos } from "./Photos";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Photos"
          component={Photos}
          options={{
            presentation: "transparentModal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
