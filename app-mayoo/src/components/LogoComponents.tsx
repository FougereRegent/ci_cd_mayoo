import React from "react";
import { View, Image, Text, StyleSheet } from "react-native"

const Logo = () => {
  return (
    <View
      style={styles.container}>
      <Image source={require("../../assets/mayoo/mayoo-logo.png")}
        style={styles.img}
      />
      <Text
        style={styles.text}>Mayoo</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 65,
    height: 80,
  },
  text: {
    marginTop: 5,
    color: 'gray',
    textAlign: 'center',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: 'bold'
  }
})

export default Logo;
