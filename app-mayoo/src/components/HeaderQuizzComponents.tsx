import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Color } from "./labels/color";
import { QuizzTag, TagType } from "./NewsSelectComponent";
import { AntDesign } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type HeaderQuizzComponentsProps = {
  question_number: number
  max_question: number
  number_good_response: number
  display_result: boolean
  on_end_time(): void
};

type TimeBarProps = {
  max_time: number
  display_result: boolean
  on_end_time(): void
};

export const HeaderQuizzComponents = (props: HeaderQuizzComponentsProps) => {
  return (
    <View style={styles.principal_container}>
      <View style={styles.header_top_section}>
        <QuizzTag tagType={TagType.QUIZZ} />
        <TimeBar max_time={12}
          on_end_time={props.on_end_time}
          display_result={props.display_result}
        />
        <Text>
          {props.question_number}/{props.max_question}
        </Text>
      </View>
      <View style={styles.header_bottom_section}>
        <AntDesign name="star"
          size={18}
          color={Color.Yellow} />
        <Text style={styles.text_styles}>
          {props.number_good_response}
        </Text>
      </View>
    </View>
  );
};

const TimeBar = (props: TimeBarProps) => {
  const freq: number = 10;
  const [baseTimeEllapsed, setTimeEllapsed] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (time >= (props.max_time * 1000)) {
        props.on_end_time();
        setTimeEllapsed(0);
        setTime(0);
        clearInterval(timerId);
        return;
      }
      if (!props.display_result) {
        setTime(time + freq);
        setTimeEllapsed(baseTimeEllapsed + 1 / (props.max_time * freq * 10));
      }
      if (props.display_result) {
        setTime(0);
        setTimeEllapsed(0);
      }
    }, freq);
    return () => clearInterval(timerId);
  });

  return (
    <View style={styles.time_container}>
      <View style={{
        backgroundColor: Color.Primary,
        borderRadius: 10,
        flex: baseTimeEllapsed
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  principal_container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: Color.PrimaryColorText,
    marginHorizontal: wp(2),
    borderRadius: 5,
    paddingVertical: hp(1),
    paddingHorizontal: wp(1.8)
  },
  header_top_section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(1.5),
  },
  header_bottom_section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  text_styles: {
    textAlign: "center",
    alignSelf: "center",
    paddingHorizontal: 2
  },
  time_container: {
    display: "flex",
    flexDirection: "row",
    width: wp(50),
    height: hp(2),
    borderRadius: 10,
    backgroundColor: Color.WhiteGray,
    shadowColor: Color.WhiteGray,
  },
});
