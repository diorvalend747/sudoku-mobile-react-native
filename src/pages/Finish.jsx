import React from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { reset } from '../store/action'

export const Finish = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const newGame = () => {
    dispatch(reset())
    navigation.navigate("Home")
  }
  console.log("End Game");

  return (
    <>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image source={require('../../assets/congrats.gif')} />
        </View>
        <Text style={styles.title}>CONGRATULATION {route.params.name.toUpperCase()} !!!</Text>
        <Text style={styles.title}>YOU SOLVE SUDOKU IN {route.params.second} seconds !!!</Text>
        <Button color="#164e87" title="New Game" onPress={ () => {
          newGame()
        }}/>
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
  title: {
    color: '#f7f1e3',
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  inputName: {
    height: 40, 
    borderColor: '#aaa69d', 
    borderBottomWidth: 1, 
    color: '#d1ccc0', 
    fontSize: 20, 
    paddingLeft:20, 
    marginBottom:20,
    textAlign: "center",
  }
});