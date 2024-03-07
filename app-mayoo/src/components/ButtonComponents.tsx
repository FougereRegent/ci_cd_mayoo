import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, TouchableOpacityProps, Button, TouchableWithoutFeedback } from "react-native";
import { Color } from "./labels/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export enum ButtonSize {
  Small = 10,
  Medium = 20,
  Big = 30
};

export enum ButtonQuizzStatus {
  Win = Color.Green,
  Fail = Color.Red,
  Unselected = Color.White,
  Selected = Color.WhiteGray
};

type ButtonProps = {
  name: string,
  action(): void,
  size: number
  color: Color
};

type ResponseButton = {
  response: string,
  action(button_status: ButtonQuizzStatus): void
  result_mode: boolean
  good_response: boolean
};

type Size = {
  width: number,
  height: number,
  fontSize: number
}

function getSize(buttonSize: ButtonSize): Size {
  let size: Size;
  switch (buttonSize) {
    case ButtonSize.Small:
      size = {
        width: wp("15%"),
        height: hp("1%"),
        fontSize: 8
      };
      break
    case ButtonSize.Medium:
      size = {
        width: wp("45%"),
        height: hp("3%"),
        fontSize: 16
      };
      break;
    case ButtonSize.Big:
      size = {
        width: wp("75%"),
        height: hp("5%"),
        fontSize: 18
      };
      break;
  }

  return size;
}

export const SimpleButton = (props: ButtonProps) => {
  let size: Size = getSize(props.size);
  return (
    <TouchableOpacity
      style={{
        borderRadius: 20,
        padding: 10,
        height: size.height,
        width: size.width,
        backgroundColor: props.color,
        justifyContent: "center"
      }}
      onPress={props.action}>
      <View>
        <Text style={{
          textAlign: "center",
          fontSize: size.fontSize,
          color: Color.PrimaryColorText
        }}>
          {props.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const ResponseButton = (props: ResponseButton) => {
  const [buttonStatus, setButtonStatus] = useState(ButtonQuizzStatus.Unselected);
  useEffect(() => {
    if (props.result_mode) {
      const status: ButtonQuizzStatus = props.good_response ? ButtonQuizzStatus.Win : ButtonQuizzStatus.Fail;
      setButtonStatus(status)
    } else if (!props.result_mode) {
      switch (buttonStatus) {
        case ButtonQuizzStatus.Unselected:
          break;
        case ButtonQuizzStatus.Selected:
          break;
        default:
          setButtonStatus(ButtonQuizzStatus.Unselected);
          break;
      }
    }
  })
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        switch (buttonStatus) {
          case ButtonQuizzStatus.Unselected:
            setButtonStatus(ButtonQuizzStatus.Selected);
            props.action(ButtonQuizzStatus.Selected);
            break;
          case ButtonQuizzStatus.Selected:
            setButtonStatus(ButtonQuizzStatus.Unselected);
            props.action(ButtonQuizzStatus.Unselected);
            break;
        }
      }}>
      <View style={{
        borderRadius: 20,
        height: hp("5%"),
        width: wp("75%"),
        backgroundColor: String(buttonStatus),
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Text style={{
          fontSize: 18
        }}>
          {props.response}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 10,
    color: Color.PrimaryColorText
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: Color.Orange,
  }
});
