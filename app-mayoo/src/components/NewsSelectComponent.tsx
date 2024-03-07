import React from "react";
import { StyleSheet, Text, View } from "react-native"
import { SimpleButton } from "./ButtonComponents";
import { Color } from "./labels/color";
import { Description, Label, Title, TitleType } from "./TextComponents";

export enum TagType {
  QUIZZ = "Quizz",
  MAYOO = "Mayoo",
  VIDEO = "Vidéo",
  SCHOOL = "E.Scolaire",
  PODCAST = "Podcast",
  EAT = "Alimentation"
};

type QuizzTagsProps = {
  tagType: TagType
};

type NewsComponentProps = {
  title: string,
  description: string,
  tags: TagType[],
  action_button(): void
}

export const QuizzTag = (props: QuizzTagsProps) => {
  let style: any;
  switch (props.tagType) {
    case TagType.MAYOO:
      style = styles.MayooStyle;
      break;
    case TagType.QUIZZ:
      style = styles.QuizzStyle;
      break;
    case TagType.VIDEO:
      style = styles.VideoStyle;
      break;
    case TagType.SCHOOL:
      style = styles.SchoolStyle;
      break;
  }

  return (
    <View style={[style, styles.BaseStyle]}>
      <Label>{props.tagType}</Label>
    </View>);
}

export const NewsComponent = (props: NewsComponentProps) => {
  const tags: any = props.tags.map(element => (<QuizzTag tagType={element} />))
  return (
    <View style={{
      display: "flex",
      borderRadius: 10,
      margin: 5,
      padding: 10,
      backgroundColor: Color.PrimaryColorText
    }}>
      <Title TypeTitle={TitleType.TitleComponent}>{props.title}</Title>
      <View style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 3
      }}>
        <Description>{props.description}</Description>
        <SimpleButton name="Accéder"
          action={props.action_button}
          size={10}
          color={Color.DarkOrange} />
      </View>
      <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginVertical: 3
      }}>
        {props.tags.map((element, index) => (<QuizzTag key={index} tagType={element} />))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  BaseStyle: {
    display: "flex",
    paddingHorizontal: 10,
    alignSelf: "center",
    justifyContent: "center",
    height: 20,
    borderRadius: 3,
    marginEnd: 8
  },
  MayooStyle: {
    backgroundColor: Color.Orange,
  },
  QuizzStyle: {
    backgroundColor: Color.Blue,
  },
  VideoStyle: {
    backgroundColor: Color.Pink
  },
  SchoolStyle: {
    backgroundColor: Color.Green
  },
  EatStyle: {
    backgroundColor: Color.Violet
  }
});
