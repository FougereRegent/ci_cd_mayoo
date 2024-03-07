import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NewsComponent, TagType } from "../components/NewsSelectComponent";
import { QuizzIntroScreen } from "./QuizzIntroScreen";
import { QuizzScreen } from "./QuizzScreen";
import { QuizzNewsDTO } from "../utils/dto";
import { ResultQuizScreen } from "./ResultQuizScreen";

const NewsStack = createNativeStackNavigator();

const NewsScreen = ({ navigation }: any) => {
  const [quizzElement, setquizzElement] = useState(new Array());

  useEffect(() => {
    GetAllQuiz().then((value: Array<QuizzNewsDTO>) => {
      setquizzElement(value);
    });
  }, [])


  return (
    <View style={{
      flex: 1,
      display: "flex",
      flexDirection: "column"
    }}>
      {quizzElement.map((element: QuizzNewsDTO, id: number) => {
        return (<NewsComponent key={id}
          tags={[TagType.MAYOO, TagType.QUIZZ]}
          title={element.name}
          description={element.description}
          action_button={() => navigation.navigate("Introduction", element)}
        />)
      })}
    </View>
  );
};

async function GetAllQuiz(): Promise<Array<QuizzNewsDTO>> {
  const path_url: URL = new URL(`${process.env.EXPO_PUBLIC_API_QUIZZ_URL}/quizz`);
  try {
    var result: Response = await fetch(path_url);
    if (result.status == 200) {
      var quizz: any[] = await result.json();
      return quizz.map(element => {
        var value: QuizzNewsDTO = {
          id: element.id,
          name: element.name,
          description: element.description
        }
        return value;
      });
    }
  }
  catch (err: any) {
    throw err;
  }
  return new Array<QuizzNewsDTO>();
}

export const NewsStackScreen = () => {
  return (
    <NewsStack.Navigator initialRouteName="Fil d'Actualités">
      <NewsStack.Screen name="Fil d'Actualités" component={NewsScreen} />
      <NewsStack.Screen name="Introduction" options={{ title: "Quizz" }} component={QuizzIntroScreen} />
      <NewsStack.Screen name="Quizz" options={{ headerShown: false }} component={QuizzScreen} />
      <NewsStack.Screen name="QuizResult" options={{ title: "Résultat" }} component={ResultQuizScreen} />
    </NewsStack.Navigator>
  );
};

