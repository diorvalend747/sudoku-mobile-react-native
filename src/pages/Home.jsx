import React , { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Picker, Alert } from 'react-native';
// import {Picker} from '@react-native-picker/picker';

export const Home = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [selectedValue, setSelectedValue] = useState("easy");
  const onChangeHandle = (input) => {
    setUsername(input)
  }

  const navigatePage = () => {
    if (username === "") {
      return Alert.alert(
        "Caution",
        "Please enter your name",
        [
          { text: "OK", onPress: () => console.log("Name required!") }
        ],
        { cancelable: false })
    } else {
      navigation.navigate("Game", {
        name: username,
        difficulty: selectedValue
      })
      setUsername("")
      setSelectedValue("easy")
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>WELCOME TO SUDOKU</Text>
        <TextInput style={styles.inputName} placeholderTextColor="#bcc3d1" placeholder="Enter your name"
          onChangeText= {(event)=> onChangeHandle(event)} value={`${username}`}
        />
        <Text color="#40407a" style={{fontSize: 20}}>Pick level:</Text>
        <Picker
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          selectedValue={selectedValue}
        >
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Hard" value="hard" />
        </Picker>
        <View style={styles.btn}>
            <Button color="#164e87" title="LET'S PLAY" onPress={
            () => navigatePage()
            }/> 
        </View>
      </View>
    </> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6994bf'
  },
  picker: {
    height: 30, 
    width: 60,
    backgroundColor: "#f7f1e3",
    color: "#000000",
    marginBottom: 10,
    borderRadius: 4,
    fontSize: 20
  },
  title: {
    color: '#f7f1e3',
    fontSize: 30,
    marginBottom: 20,
  },
  inputName: {
    height: 40, 
    borderColor: '#aaa69d', 
    borderBottomWidth: 1, 
    color: '#ffffff', 
    fontSize: 20, 
    marginBottom:20,
    textAlign: "center",
  },
  btn: {
    marginBottom: 20,
    marginTop: 50,
  }
});