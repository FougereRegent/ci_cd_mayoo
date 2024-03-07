import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color } from "../components/labels/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DeveloppementScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
      <Image style={styles.image}
        source={require("../../assets/mayoo/developpement_screen/developpement_img.png")} />
      <View style={styles.containerText}>
        <Text style={{
          fontSize: wp(3),
          fontStyle: "italic",
          fontWeight: "bold",
          marginBottom: hp(2)
        }}>Mayoo est en train de développer cette fonctionnalité !</Text>
        <Text style={{
          fontSize: wp(2.5)
        }}>Elle arrive bientôt</Text>
      </View>
    </View>
  );
};

export default DeveloppementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BackGround,
    justifyContent: "center",
    alignItems: "center"
  },
  containerText: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: wp(75),
    height: wp(75)
  }
})
