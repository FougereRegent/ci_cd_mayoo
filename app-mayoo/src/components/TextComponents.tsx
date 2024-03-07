import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native"
import { Color } from "./labels/color";


export enum TitleType {
  H1,
  H2,
  H3,
  H4,
  H5,
  TitleComponent
}

type TitleProps = {
  TypeTitle: TitleType,
  children: JSX.Element | JSX.Element[] | string
};

type TextProps = {
  children: JSX.Element | JSX.Element[] | string
};

type LabelProps = {
  children: JSX.Element | JSX.Element[] | string
};

export type BoldProps = {
  style: StyleProp<TextStyle>
  children: JSX.Element | JSX.Element[] | string | any
}



export const Title = (props: TitleProps) => {
  let style: any;

  switch (props.TypeTitle) {
    case TitleType.H1:
      style = styles.h1;
      break;
    case TitleType.H2:
      style = styles.h2;
      break;
    case TitleType.H3:
      style = styles.h3;
      break;
    case TitleType.H4:
      style = styles.h4;
      break;
    case TitleType.H5:
      style = styles.h5;
      break;
    case TitleType.TitleComponent:
      style = styles.titleComponent;
      break;
  }


  return (
    <View>
      <Text style={style}>
        {props.children}
      </Text>
    </View>
  );
}

export const Label = (props: any) => {
  return (
    <Text style={styles.textLabel}>
      {props.children}
    </Text>
  );
}

export const Bold = (props: BoldProps) => {
  return (
    <Text style={[{
      fontWeight: "bold"
    }, props.style]}>
      {props.children}
    </Text >
  )
}

export const Description = (props: any) => {
  return (
    <Text style={styles.text}>
      {props.children}
    </Text>
  )
}

export const TextBox = (props: TextProps) => {
  return (
    <View>
      <Text style={styles.text}>
        {props.children}
      </Text>
    </View >
  );
}


const styles = StyleSheet.create({
  h1: {
    color: Color.PrimaryColorText,
    fontSize: 24,
    textAlign: "center"
  },
  h2: {
    color: Color.PrimaryColorText,
    fontSize: 22,
  },
  h3: {
    color: Color.PrimaryColorText,
    fontSize: 20,
  },
  h4: {
    color: Color.PrimaryColorText,
    fontSize: 18,
  },
  h5: {
    color: Color.PrimaryColorText,
    fontSize: 16,
  },
  textLabel: {
    color: Color.PrimaryColorText,
    fontSize: 14,
  },
  titleComponent: {
    color: Color.SecondaryColorText,
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "500"
  },
  text: {
    color: Color.SecondaryColorText,
    fontSize: 12,
  }
});
