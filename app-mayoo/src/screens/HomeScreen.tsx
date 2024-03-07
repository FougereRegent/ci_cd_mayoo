import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MenuBar from "../components/MenuBarComponents";
import { NewsStackScreen } from "./NewsScreen";
import DeveloppementScreen from "./DeveloppementScreen";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator tabBar={props => <MenuBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Accueil" component={DeveloppementScreen} />
      <Tab.Screen name="Actualités" component={NewsStackScreen} />
      <Tab.Screen name="Défis durables" component={DeveloppementScreen} />
      <Tab.Screen name="Profil" component={DeveloppementScreen} />
    </Tab.Navigator >
  );
}

export default HomeScreen;
