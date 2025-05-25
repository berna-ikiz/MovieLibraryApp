import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Colors from "../theme/colors";
type IconProps = {
  size?: number;
  color?: string;
  style?: any;
};

export const PopcornIcon = ({
  color = Colors.primary,
  size = 24,
  style,
}: IconProps) => (
  <MaterialCommunityIcons name="popcorn" size={size} color={color} />
);

export const ChevronLeftIcon = ({
  color = Colors.primary,
  size = 24,
  style,
}: IconProps) => (
  <MaterialCommunityIcons name="chevron-left" size={size} color={color} />
);

export const HomeIcon = ({
  color = Colors.primary,
  size = 24,
  style,
}: IconProps) => (
  <MaterialCommunityIcons name="home" size={size} color={color} />
);

export const HeartIcon = ({
  color = Colors.primary,
  size = 24,
  style,
}: IconProps) => (
  <MaterialCommunityIcons name="heart" size={size} color={color} />
);

export const MagnifyIcon = ({
  color = Colors.primary,
  size = 24,
  style,
}: IconProps) => (
  <MaterialCommunityIcons name="magnify" size={size} color={color} />
);

export const AccountIcon = ({
  color = Colors.primary,
  size = 24,
  style,
}: IconProps) => (
  <MaterialCommunityIcons name="account" size={size} color={color} />
);

export const HeartOutlineIcon = ({
  color = Colors.primary,
  size = 24,
  style,
}: IconProps) => (
  <MaterialCommunityIcons name="heart-outline" size={size} color={color} />
);

export const DoorOpenIcon = ({
  color = Colors.primary,
  size = 24,
  style,
}: IconProps) => (
  <MaterialCommunityIcons name="door-open" size={size} color={color} />
);

export const EmoticonSadIcon = ({
  color = Colors.primary,
  size = 24,
  style,
}: IconProps) => (
  <MaterialCommunityIcons name="emoticon-sad" size={size} color={color} />
);

export const DeleteEmptyIcon = ({
  color = Colors.primary,
  size = 24,
  style,
}: IconProps) => (
  <MaterialCommunityIcons name="delete-empty" size={size} color={color} />
);

export const MovieRollIcon = ({
  size = 24,
  color = Colors.gray800,
  style,
}: IconProps) => (
  <MaterialCommunityIcons name="movie-roll" size={size} color={color} />
);

export const ErrorIcon = ({
  size = 24,
  color = Colors.danger,
  style,
}: IconProps) => (
  <MaterialIcons name="error" size={size} color={color} style={style} />
);
export const StarBorderIcon = ({
  size = 24,
  color = Colors.success,
  style,
}: IconProps) => (
  <MaterialIcons name="star-border" size={size} color={color} style={style} />
);

export const DeleteVariantIcon = ({
  size = 24,
  color = Colors.success,
  style,
}: IconProps) => (
  <MaterialIcons
    name="delete-variant"
    size={size}
    color={color}
    style={style}
  />
);

export const SearchIcon = ({
  size = 24,
  color = Colors.success,
  style,
}: IconProps) => (
  <MaterialIcons name="search" size={size} color={color} style={style} />
);

export const CategoryIcon = ({
  size = 24,
  color = Colors.success,
  style,
}: IconProps) => (
  <MaterialIcons name="search" size={size} color={color} style={style} />
);

export const StarRateIcon = ({
  size = 24,
  color = Colors.success,
  style,
}: IconProps) => (
  <MaterialIcons name="star-rate" size={size} color={color} style={style} />
);
