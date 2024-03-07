import React from "react";
import { View, Image, Text } from "react-native";
import { Color } from "../components/labels/color";
import { ButtonSize, SimpleButton } from "../components/ButtonComponents";

export type ResultQuizScreenParam = {
  good_responses: number
  max_responses: number
};

export const ResultQuizScreen = ({ route, navigation }: any) => {
  const result: ResultQuizScreenParam = (route.params as ResultQuizScreenParam)
  return (
    <View style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
      height: 700
    }}>
      <Image
        style={{
          width: 150,
          height: 150,
          backgroundColor: Color.Primary,
          borderRadius: 100,
          marginVertical: 10
        }}
        source={require("../../assets/mayoo/img/quizz_image.png")} />
      <View>
        <Text style={{
          textAlign: "center",
          fontSize: 35
        }}>
          Résultat :
        </Text>
        <Text style={{
          textAlign: "center",
          fontSize: 35,
          fontWeight: "600",
          marginTop: 10
        }}>{result.good_responses} / {result.max_responses}</Text>
      </View>
      <View style={{
        marginTop: 70
      }}>
        <SimpleButton
          name="Continuer"
          action={() => navigation.navigate("Fil d'Actualités")}
          size={ButtonSize.Big}
          color={Color.Orange}
        />
      </View>
    </View>
  );
};
