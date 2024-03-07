import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { ButtonQuizzStatus, ButtonSize, ResponseButton, SimpleButton } from "../components/ButtonComponents";
import { HeaderQuizzComponents } from "../components/HeaderQuizzComponents";
import { Color } from "../components/labels/color";
import { AnsweredQuestion, QuestionDTO, ResponseDTO, ResponseStartGameDTO, StateResponseDTO } from "../utils/dto";
import { ResultQuizScreenParam } from "./ResultQuizScreen";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

enum StateScreen {
  ResponseMode,
  ResultMode
};

export type QuizzScreenParams = {
  response_start: ResponseStartGameDTO
  question: number
  nb_good_response: number
};

export const QuizzScreen = ({ route, navigation }: any) => {
  const [params, setParams] = useState(route.params as QuizzScreenParams);
  const [idGame, setIdGame] = useState(params.response_start.guid);
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState(Array<ResponseDTO>);
  const [choiceResponse, setChoiceResponse] = useState([false, false, false, false])
  const [goodResponse, setGoodResponse] = useState([false, false, false, false])
  const [stateScreen, setStateScreen] = useState(StateScreen.ResponseMode);
  const [requestResult, setRequestResult] = useState(Object);
  const nb_good_response: number = params.nb_good_response;

  const select_response = (button_status: ButtonQuizzStatus, id: number) => {
    switch (button_status) {
      case ButtonQuizzStatus.Selected:
        choiceResponse[id] = true;
        break;
      case ButtonQuizzStatus.Unselected:
        choiceResponse[id] = false;
        break;
    }
  };

  const send_response = () => {
    if (stateScreen == StateScreen.ResultMode) {
      const resp: QuizzScreenParams = {
        response_start: params.response_start,
        nb_good_response: (requestResult as StateResponseDTO).state ? nb_good_response + 1 : nb_good_response,
        question: params.question + 1
      };
      if ((requestResult as StateResponseDTO).end_game) {
        const result_quizz: ResultQuizScreenParam = {
          good_responses: (requestResult as StateResponseDTO).state ? nb_good_response + 1 : nb_good_response,
          max_responses: 12
        };
        navigation.navigate("QuizResult", result_quizz);
        return;
      } else {
        setStateScreen(StateScreen.ResponseMode);
        setGoodResponse([false, false, false, false]);
        setChoiceResponse([false, false, false, false])
        setParams(resp);
        GetQuizzQuestion(idGame).then((value) => {
          setQuestion(value.question);
          setResponses(value.response);
        });
      }
      return;
    }
    const resultIds: Array<string> = new Array<string>();
    choiceResponse.forEach((value: boolean, index: number) => {
      if (value) {
        resultIds.push(String(responses[index].id));
      }
    })
    SendResult({
      guid: idGame,
      id_response: resultIds
    }).then((value) => {
      value.id_good_response.forEach(value => {
        const index: number = responses.findIndex((predicate: ResponseDTO) => predicate.id == Number(value));
        goodResponse[index] = true;
      });
      setRequestResult(value);
      setStateScreen(StateScreen.ResultMode);
    })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetQuizzQuestion(idGame).then((value) => {
      setQuestion(value.question);
      setResponses(value.response);
    });
  }, []);

  return (
    <View style={styles.principal_container}>
      <HeaderQuizzComponents
        max_question={12}
        question_number={params.question}
        number_good_response={params.nb_good_response}
        on_end_time={send_response}
        display_result={stateScreen == StateScreen.ResultMode}
      />
      <View style={styles.question_response_container}>
        <View style={{
          alignItems: "center",
        }}>
          <View>
            <Image style={styles.image}
              source={require("../../assets/mayoo/img/quizz_image.png")} />
          </View>
          <Text style={styles.text_question}>
            {question}
          </Text>
          <View style={{
            marginTop: hp(1),
          }}>
            {responses.map((element: ResponseDTO, id: number) => {
              return (
                <View key={id} style={styles.button_response}>
                  <ResponseButton
                    response={element.response}
                    action={(button_status: ButtonQuizzStatus) => select_response(button_status, id)}
                    good_response={goodResponse[id]}
                    result_mode={stateScreen == StateScreen.ResultMode} />
                </View>
              );
            })}
          </View>
        </View>
        <View style={{
          marginTop: hp(2)
        }}>
          {stateScreen == StateScreen.ResponseMode &&
            <SimpleButton name="Valider"
              size={ButtonSize.Big}
              color={Color.OrangeLight}
              action={send_response} />}
          {stateScreen == StateScreen.ResultMode &&
            <SimpleButton name="Suivant"
              size={ButtonSize.Big}
              color={Color.Orange}
              action={send_response} />}
        </View>
      </View>
    </View >
  );
};

async function GetQuizzQuestion(guid: string): Promise<QuestionDTO> {
  let path_url: URL = new URL(`${process.env.EXPO_PUBLIC_API_GAME_URL}/game/question`);
  path_url.searchParams.append("guid", guid);
  try {
    var response: Response = await fetch(path_url);
  }
  catch (err: any) {
    throw err;
  }

  if (response.status == 200) {
    return (await response.json() as QuestionDTO);
  }
  if (response.status == 404) {
    throw new Error("L'id de la partie est inexistant");
  }
  throw new Error("Erreur inconue");
}

async function SendResult(answered_question: AnsweredQuestion): Promise<StateResponseDTO> {
  let path_url: URL = new URL(`${process.env.EXPO_PUBLIC_API_GAME_URL}/game/question`);
  try {
    var response: Response = await fetch(path_url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(answered_question)
    });
  }
  catch (err: any) {
    throw err;
  }

  switch (response.status) {
    case 201:
      return (await response.json() as StateResponseDTO);
    case 400:
      throw new Error("La partie est finis");
    case 401:
      throw new Error("La partie a expiré");
    case 404:
      throw new Error("Ressource non trouvé");
    case 500:
      throw new Error("Erreur avec le serveur");
    default:
      throw new Error("Erreur inconue");
  }
}

const styles = StyleSheet.create({
  principal_container: {
    flex: 1,
    paddingVertical: 5,
  },
  question_response_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  image: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: 150,
    marginTop: hp(5)
  },
  text_question: {
    marginTop: hp(5),
    width: wp(88),
    textAlign: "center",
    fontWeight: "500",
    fontSize: hp(1.7)
  },
  button_response: {
    marginVertical: hp(1.5)
  }
});
