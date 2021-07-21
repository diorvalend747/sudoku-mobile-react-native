// encoding function for board

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

export const getSudokuBoard = (difficulty = "easy") => {
  return (dispatch, getState) => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
      .then( response => response.json())
      .then( data => 
        dispatch({
          type: 'SET_BOARD',
          payload: {
            board: data.board,
            difficulty: difficulty
          }
        })
      )
      .catch(err => {
        console.log(err);
      })
  }
}

export const validate = (data) => {
  const dataBoard = {
    board: data
  }
  return (dispatch, getState) => {
    fetch('https://sugoku.herokuapp.com/validate', {
      method: "POST",
      body: encodeParams(dataBoard),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
      .then( response => response.json() )
      .then( data => {
          dispatch({
            type: 'SET_VALIDATE_BOARD',
            payload: {
              result: data
            }
          })
        }
      )
      .catch(err => {
        console.log(err);
      })
  }
}

export const autoSolve = (data) => {
  const dataBoard = {
    board: data
  }
  return (dispatch, getState) => {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(dataBoard),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(data => dispatch({
        type: 'SET_SOLVE_BOARD',
        payload: {
          result: data.solution
        }
      }))
      .catch(err => {
        console.log(err);
      })
  }
}

export const reset = () => {
  return { type: "RESET" }
}