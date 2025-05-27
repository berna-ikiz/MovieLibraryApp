import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../theme/colors";

type IconName =
  | "popcorn"
  | "chevron-left"
  | "home"
  | "heart"
  | "heart-outline"
  | "magnify"
  | "account"
  | "door-open"
  | "emoticon-sad"
  | "delete-empty"
  | "movie-roll"
  | "exclamation-thick"
  | "star-outline"
  | "delete-alert"
  | "movie-filter-outline"
  | "star-rate";

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
};

const AppIcon = ({
  name,
  size = 24,
  color = Colors.primary,
  style,
}: IconProps) => {
  const Icon = MaterialCommunityIcons as any;
  return <Icon name={name} size={size} color={color} style={style} />;
};

export default AppIcon;
