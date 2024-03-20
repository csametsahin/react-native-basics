import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation, TextInput, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getSelf, setSelfUser } from "./src/hooks/useAuthentication";

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

              return label;
            }}
          />
        )}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="home" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Settings",
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="cog" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {
  //States
  const selfRef = useRef<string | undefined>(undefined);

  //Fetch Data
  const fetchData = async () => {
    const self = await getSelf();
    selfRef.current = self ?? undefined;
  };

  //Effects
  useEffect(() => {
    fetchData();
  });

  //Handlers
  const handleInputSelf = async () => {
    await setSelfUser(selfRef.current ?? "");
    await fetchData();
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">
        {selfRef.current ? selfRef.current : ""}
      </Text>
      {!selfRef.current && (
        <>
          <TextInput
            label="your name "
            style={{ width: 200 }}
            onChangeText={(text) => (selfRef.current = text)}
          ></TextInput>
          <Button onPress={handleInputSelf}>Set</Button>
        </>
      )}
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
