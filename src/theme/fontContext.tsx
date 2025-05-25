import React, { createContext, ReactNode, useContext } from "react";
import { Text, TextProps } from "react-native";
import { Fonts } from "./fonts";

const FontContext = createContext({
  fontFamily: Fonts.fontFamily.regular,
});

export const FontProvider = ({ children }: { children: ReactNode }) => {
  return (
    <FontContext.Provider value={{ fontFamily: Fonts.fontFamily.regular }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => useContext(FontContext);

export const CustomText = (props: TextProps) => {
  const { fontFamily } = useFont();
  return <Text {...props} style={[{ fontFamily }, props.style]} />;
};
