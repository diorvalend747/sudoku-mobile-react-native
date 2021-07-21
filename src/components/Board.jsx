import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, TextInput, Dimensions, Button, Alert, Text } from 'react-native';
import { autoSolve, validate } from '../store/action'
import { useNavigation } from '@react-navigation/native';

export const Board = ({ userData }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [getBoard, setBoard] = useState([])
  const { board, solution } = useSelector(state => state.sudokuReducers)
  const { result } = useSelector(state => state.sudokuReducers)
  const [timer, setTimer] = useState(0)
  
  useEffect(() => {
    setBoard(JSON.parse(JSON.stringify(board)))
  }, [board])

  useEffect(() => {
    if (solution.length > 0) {
      setBoard(JSON.parse(JSON.stringify(solution)))
    }
  }, [solution])

  // Timer
  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer < 1800) {
        setTimer(timer + 1)
      }

      if (timer === 1800) {
        clearInterval(countdown)
      }
    }, 1000)
    return () => clearInterval(countdown)
  })

  const secToMin = (seconds) => {
    let minutes = 0;
    if (seconds / 60 > 0) {
      minutes = parseInt(seconds / 60, 10);
      seconds = seconds % 60;
    }
    return ('0' + minutes).slice(-2) + ' : ' + ('0' + seconds).slice(-2);
  }
  
  const updateBoard = (input, row, col) => {
    const newBoard = [...getBoard]
    newBoard[row][col] = input
    setBoard(newBoard)
  }

  const validateSudoku = () =>{
    dispatch(validate(getBoard))
  }

  const getAutoSolve = () => {
    dispatch(autoSolve(getBoard))
  }
  
  useEffect( () => {
    if (result) {
        if (result.status == "solved") {
          const second = timer
          navigation.navigate("Finish", {
            name: userData,
            second
          })
        } else if (result.status === "broken" || "unsolved") {
          return Alert.alert(
            "Not Solved",
            "Please Try Again!",
            [
              { text: "OK", onPress: () => console.log("Yet Solved. Try again") }
            ],
            { cancelable: false })
        }
    }
  }, [result])

  return (
    <View style={styles.container}>
      <View>
      <Text style={{fontSize:20, fontWeight:'bold', color: 'black', paddingBottom:10}}>{secToMin(timer)}</Text>
      </View>
      <View style={styles.wrapperBoard}>
        { getBoard.map((table, row) => {
          return (
            <View key={`${row}`}>
              {table.map((item, col) => {
                  return (
                    <>
                      <TextInput key={col} 
                        value={
                          item === 0 ? "" : `${item}`
                        } 
                        onChangeText={
                          (input) => updateBoard(input, row, col)
                        } 
                        style={
                          board[row][col] === 0 ? styles.box(row, col) : styles.boxFix(row,col)
                        }
                        maxLength={1} 
                        editable={
                          board[row][col] === 0 ? true : false  
                          }
                        keyboardType='numeric'
                        /> 
                    </>
                  )
                })
                
              }
              </View>
              )
            })  
          }      
      </View>
      <View style={styles.btnBottom}>
        <View>
          <Button color="#313a42" onPress={ ()=> { validateSudoku() }} title="Validate"/>
        </View>
        <View style={{marginLeft: 40}}>
          <Button color="#164e87"  onPress={ ()=> { getAutoSolve() }} title="Auto Solve"/>
        </View>
      </View>
    </View> 
  )
}

const widthWindows = Dimensions.get("window").width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6994bf'
  },
  box: (row,col) => ({
    textAlign:'center', 
    width: (widthWindows-30)/9, 
    height: 30, 
    fontSize: 20,
    color: '#000000',
    borderRightWidth: (row + 1) % 3 == 0 ? 2 : 0.3,
    borderBottomWidth: (col + 1) % 3 == 0 ? 2 : 0.3,
    borderLeftWidth: (row == 0 ) ? 2 : 0.3,
    borderTopWidth: (col == 0 ) ? 2 : 0.3,
    borderColor:'#2c2c54'  
  }),
  boxFix: (row,col) => ({
    textAlign:'center', 
    width: (widthWindows-30)/9, 
    height: 30, 
    fontSize: 20,
    borderRightWidth: (row + 1) % 3 == 0 ? 2 : 0.3,
    borderBottomWidth: (col + 1) % 3 == 0 ? 2 : 0.3,
    borderLeftWidth: (row == 0 ) ? 2 : 0.3,
    borderTopWidth: (col == 0 ) ? 2 : 0.3,
    borderColor:'#2c2c54',
    color: '#000000',
  }),
  wrapper: {
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5
  },
  wrapperBoard: {
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 25,
    backgroundColor: '#fbf9f5',
    padding: 5
  },
  btnBottom: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems:'center', 
    justifyContent: 'center', 
    marginTop: -200,
  }
});