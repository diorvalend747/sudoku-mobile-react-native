import React , { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { getSudokuBoard } from '../store/action'
import { Board } from '../components/Board'


export const Game = ({ route }) => {
  const dispatch = useDispatch()
  const { name, difficulty } = route.params
  const { board } = useSelector(state => state.sudokuReducers)
  const [getBoard, setBoard] = useState([])


  useEffect(() => {
    dispatch(getSudokuBoard(difficulty))
  }, [dispatch])

  useEffect(() => {
    setBoard(JSON.parse(JSON.stringify(board)))
  }, [board])

  if (getBoard.length === 0 ) {
    return <View style={styles.container}>
      <Image source={require('../../assets/loading.gif')} />
    </View>
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
   
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SOLVE SUDOKU {name.toUpperCase()}</Text>
      <Text style={styles.level}>Level: {capitalizeFirstLetter(difficulty)}</Text>
      { getBoard.length > 0 ? 
        <View>
          <Board userData={name} />
        </View>
        :
        null
      }
      <StatusBar style="auto" />
    </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6994bf'
  },
  title: {
    marginTop: 200,
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  level: {
    color: 'white',
    fontSize: 15,
    marginBottom: 50,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 
  },
  wrapper: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 5
  },
});