export function storeGames(games) {
    return {
        type: "GAMES_STORE",
        games
    }
}

export function storeSelectedGame(selectedGame) {
    return {
        type: "GAME_SELECTED_STORE",
        selectedGame
    }
}