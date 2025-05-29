import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { RootStackParamList } from "../utils/type/authType";
import Colors from "../theme/colors";
import AppIcon from "../assets/icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: Colors.black,
        borderTopWidth: 0,
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.white,
    }}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AppIcon name="home" color={color} size={30} />
        ),
      }}
    />
    <Tab.Screen
      name="FavoritesTab"
      component={FavoritesScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AppIcon name="heart" color={color} size={30} />
        ),
      }}
    />
    <Tab.Screen
      name="SearchTab"
      component={SearchScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AppIcon name="magnify" color={color} size={30} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AppIcon name="account" color={color} size={30} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
