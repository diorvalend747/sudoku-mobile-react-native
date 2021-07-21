const initialState = {
    board: [],
    difficulty: "easy",
    result: null,
    solution: []
}
  
export const sudokuReducers = ( state = initialState, action) => {
    switch (action.type) {
      case 'SET_BOARD':
        return {
          ...state,
          board: action.payload.board,
          difficulty: action.payload.difficulty
        }
      case 'SET_VALIDATE_BOARD':
        return {
          ...state,
          result: action.payload.result
        }
      case 'SET_SOLVE_BOARD':
        return {
          ...state,
          solution: action.payload.result
        }
      case 'RESET':
          return {
            ...state,
            result: null,
            solution: []
          }
      default:
        return state
    }
}