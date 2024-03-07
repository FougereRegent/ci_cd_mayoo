import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SimpleButton, ButtonSize } from "../components/ButtonComponents";
import { Color } from "../components/labels/color";
import { Bold } from "../components/TextComponents";
import { QuizzNewsDTO, ResponseStartGameDTO, StartGameDTO } from "../utils/dto";
import { QuizzScreenParams } from "./QuizzScreen";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const QuizzIntroScreen = ({ route, navigation }: any) => {
  const dto: QuizzNewsDTO = route.params as QuizzNewsDTO;
  const name = dto.name;
  const id: number = dto.id;

  return (
    <View style={styles.principal_container}>
      <Image
        style={styles.image}
        source={require("../../assets/mayoo/img/quizz_image.png")} />
      <View style={styles.text_container}>
        <Bold style={{
          fontSize: hp(1.6),
          marginBottom: hp(2)
        }}>
          Bienvenue, {name}
        </Bold>
        <Text style={styles.text_style}>
          Découvre si tu es un champion de l’alimentation{`\n`}Chaque semaine, l'on te propose un quiz basé sur les{`\n`}
          aliments du menu proposé par ta cantine{`\n`}
          <Bold style={styles.text_style}>12 questions en 12 secondes chacune.</Bold>{`\n`}
          <Bold style={styles.text_style}>Plusieurs bonnes réponses sont parfois possibles.</Bold>{`\n`}
          <Bold style={styles.text_style}>Nature des questions :</Bold>{`\n`}
          <Bold style={styles.text_style}>Santé :</Bold> Les super pouvoirs des aliments{`\n`}
          <Bold style={styles.text_style}>Région :</Bold> Où ça pousse en France ?{`\n`}
          <Bold style={styles.text_style}>Saisonnalité :</Bold> En quelle saison sont-ils top ?{`\n`}
          <Bold style={styles.text_style}>Devine :</Bold> Nomme l'aliment de la photo.{`\n`}
          <Bold style={styles.text_style}>Pays Producteur :</Bold> Quel pays produit le plus{`\n`}
          Allez, lance-toi et montre ce que t'as dans le ventre ! 😜
        </Text>
      </View>
      <View>
        <SimpleButton
          name="C'est parti"
          size={ButtonSize.Big}
          color={Color.Orange}
          action={async () => {
            try {
              const guid: ResponseStartGameDTO = await StartGame(id);
              const response: QuizzScreenParams = {
                question: 1,
                response_start: guid,
                nb_good_response: 0
              };
              navigation.navigate("Quizz", response)
            }
            catch (err: any) {
              console.log(err);
            }
          }} />
      </View>
    </View >
  );
};

async function StartGame(id_quizz: number): Promise<ResponseStartGameDTO> {
  const path_url: string = "/game/start/";
  let start_game: StartGameDTO = {
    user_name: "damien",
    id_quizz: id_quizz
  };
  try {
    var response: Response = await fetch(`${process.env.EXPO_PUBLIC_API_GAME_URL}${path_url}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(start_game)
    });

  }
  catch (err: any) {
    throw err;
  }

  if (response.status == 201) {
    return (await response.json() as ResponseStartGameDTO);
  }
  if (response.status == 404) {
    console.log(await response.text());
    throw new Error("Le quizz existe pas");
  }
  throw new Error("Erreur inconue");
}

const styles = StyleSheet.create({
  principal_container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: wp(30),
    height: wp(30),
    backgroundColor: Color.Primary,
    borderRadius: 100,
    marginVertical: hp(2)
  },
  text_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  text_style: {
    color: Color.SecondaryColorText,
    fontSize: hp(1.6),
    textAlign: "center"
  }
});
