import { AsyncStorage } from 'react-native';

const initialState = {
    games: [],
    selectedGame: {}
}

export default reducer = (state = initialState, action) => {
    switch(action.type) {
        case "GAMES_STORE":
            return {...state, games: action.games}
        case "GAME_SELECTED_STORE":
            return {...state, selectedGame: action.selectedGame}
        default:
            return {...state}
    }
}