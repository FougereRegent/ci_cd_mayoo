import Readt, { useState } from 'react'
import { TextInput, Text, View, StyleSheet, Image } from 'react-native'
import { Color } from './labels/color';

export enum TypeTextBox {
  NORMAL,
  PASSWORD,
  CREDENTIALS
};

type TextboxProps = {
  mode: TypeTextBox,
  onChangeString: (string: string) => void
}

const Textbox = (props: TextboxProps) => {
  const [text, setText] = useState('');
  let result: any;
  switch (props.mode) {
    case TypeTextBox.NORMAL:
      result = (
        <View style={styles.container}>
          <TextInput
            onChangeText={newText => {
              setText(newText);
              props.onChangeString(newText)
            }}
            defaultValue={text}
            style={styles.textbox} />
        </View>
      );
      break;
    case TypeTextBox.PASSWORD:
      result = (
        <View style={styles.container}>
          <Image source={require('../../assets/mayoo/lock.png')}
            style={styles.img} />
          <TextInput
            placeholder='Mot de passe'
            onChangeText={newText => {
              setText(newText);
              props.onChangeString(newText);
            }}
            secureTextEntry={true}
            defaultValue={text}
            style={styles.textbox} />
        </View>
      );
      break;
    case TypeTextBox.CREDENTIALS:
      result = (
        <View style={styles.container}>
          <Image source={require('../../assets/mayoo/login.png')}
            style={styles.img} />
          <TextInput
            placeholder='Identifiant'
            onChangeText={newText => {
              setText(newText);
              props.onChangeString(newText);
            }}
            value={text}
            style={styles.textbox} />
        </View>
      );
      break
  }

  return (
    <View>
      {result}
    </View>
  );
};

const styles: any = StyleSheet.create(
  {
    container: {
      borderRadius: 20,
      backgroundColor: Color.Primary,
      padding: 5,
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: 'flex-start',
      width: 220,
      height: 35
    },
    img: {
      marginHorizontal: 5,
      width: 15,
      height: 20
    },
    textbox: {
      flex: 1,
    }
  }
)

export default Textbox;
