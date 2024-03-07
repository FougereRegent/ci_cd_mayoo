import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Color } from "./labels/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type ButtonProps = {
  name: string,
  id: number,
  onClick(screen: string, id: number): boolean,
  isClicked: boolean,
  status: Array<boolean>
};

export const MenuBar = (props: any) => {
  const navigation: any = props.navigation;
  const state: any = props.state;

  const [clicked, setClickedButton] = useState([true, false, false, false]);

  const click = (screen: string, id: number) => {
    if (state.index != id) {
      clicked[0] = false;
      clicked[1] = false;
      clicked[2] = false;
      clicked[3] = false;

      clicked[id] = true;
      navigation.navigate(screen);
      return true;
    }
    return false;
  };

  return (
    <View style={{
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#F6F2EF"
    }}>
      <View style={styles.containerWashButton}>
        <TouchableOpacity style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FF815E",
          width: wp(12),
          height: wp(12),
          borderRadius: 100
        }}>
          <Image
            style={{
              width: wp(10),
              height: wp(10)
            }}
            source={require("../../assets/mayoo/tabbar/hand_washing.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerBarMenu}>
        <BarMenuButton name="Acceuil" id={0} onClick={click} status={clicked} isClicked={clicked[0]} />
        <BarMenuButton name="Actualités" id={1} onClick={click} status={clicked} isClicked={clicked[1]} />
        <BarMenuButton name="Défis durables" id={2} onClick={click} status={clicked} isClicked={clicked[2]} />
        <BarMenuButton name="Profil" id={3} onClick={click} status={clicked} isClicked={clicked[3]} />
      </View>
    </View >
  )
};

export default MenuBar;

/*Internal component*/
const BarMenuButton = (props: ButtonProps) => {
  const buttonState = props.isClicked;
  const name: string = props.name;
  const id: number = props.id;

  const buttonStyle = StyleSheet.create({
    buttonStyle: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    buttonText: {
      textAlign: "center",
      fontSize: 11,
      color: buttonState ? "orange" : "gray"
    },
  });

  let resultIcon: any;

  switch (props.name) {
    case "Acceuil":
      resultIcon = buttonState ? require("../../assets/mayoo/tabbar/home_color.png") : require("../../assets/mayoo/tabbar/home.png");
      break;
    case "Actualités":
      resultIcon = buttonState ? require("../../assets/mayoo/tabbar/actuality_color.png") : require("../../assets/mayoo/tabbar/actuality.png");
      break;
    case "Défis durables":
      resultIcon = buttonState ? require("../../assets/mayoo/tabbar/classement_color.png") : require("../../assets/mayoo/tabbar/classement.png");
      break;
    case "Profil":
      resultIcon = buttonState ? require("../../assets/mayoo/tabbar/profil_color.png") : require("../../assets/mayoo/tabbar/profil.png");
      break
  };

  return (
    <View style={buttonStyle.buttonStyle}>
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={() => {
          props.onClick(name, id);
        }}>
        <Image source={resultIcon}
          style={styles.imageButton} />
      </TouchableOpacity>
      <Text style={buttonStyle.buttonText}>
        {props.name}
      </Text>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  containerWashButton: {
    alignItems: "center",
    justifyContent: "center",
    width: wp(5),
    height: wp(5),
    backgroundColor: Color.Secondary,
    alignSelf: "center",
    top: hp(1.5),
    borderRadius: 100,
    zIndex: 1
  },
  containerBarMenu: {
    flexDirection: "row",
    borderStyle: "solid",
    borderTopLeftRadius: wp(2),
    borderTopRightRadius: wp(2),
    backgroundColor: Color.Secondary,
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5)
  },
  imageButton: {
    width: wp(7),
    height: wp(7),
  },
  touchableButton: {
    width: wp(7),
    height: wp(7)
  }
});
