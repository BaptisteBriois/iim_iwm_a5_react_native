import React from 'react';
import { AsyncStorage, ActivityIndicator, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { storeGames } from '../redux/actions';
import { Header, ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

class Home extends React.Component {
  state = {
    loading: this.props.games.length == 0 ? true : false,
    games: this.props.games ? this.props.games : [],
    selectedGame: this.props.selectedGame ? this.props.selectedGame : {}
  }

  async setStateGames() {
    try {
      const games = await fetch("http://androidlessonsapi.herokuapp.com/api/game/list").then((response) => {
        return response.json()
      })

      this.props.dispatch(storeGames(games))

      this.setState({
        loading: false,
        games
      })
    } catch(exception) {
      console.log(exception)
    }
  }

  getLocalSelectedGame = async () => {
    const localSelectedGame = await AsyncStorage.getItem('selectedGame')
    if (localSelectedGame) {
      this.setState({
        selectedGame: JSON.parse(localSelectedGame)
      })
    }
  }

  componentWillMount() {
    if (this.state.games.length == 0) {
      this.setStateGames()
    }
    this.getLocalSelectedGame()
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.componentWillMount()
          }}
        />
        <Header
          centerComponent={{ text: 'Hello Games', style: { color: '#fff', fontSize: 32 } }}
          containerStyle={{
            height: 120,
            backgroundColor: '#3D6DCC',
            justifyContent: 'space-around',
          }}
        />
        <View style={{display:'flex', justifyContent:'flex-start', flex: 1}}>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            this.state.games.map((game, index) => (
              <ListItem
                key={index}
                title={game.name}
                onPress={() => {
                  this.props.navigation.navigate('Info', {
                    gameId: game.id
                  });
                }}
                chevron
              />
            ))
          )}
            
          {Object.keys(this.state.selectedGame).length == 0 ? (
            <ListItem
              key={'lastSelectedGame'}
              title={"Aucun jeu sélectionné"}
            />
          ) : (
            <ListItem
              containerStyle={{
                backgroundColor: '#3D6DCC'
              }}
              titleStyle={{
                color: 'white'
              }}
              key={'lastSelectedGame'}
              title={"Dernier jeu sélectionné : " + this.state.selectedGame.name}
              onPress={() => {
                this.props.navigation.navigate('Info', {
                  gameId: this.state.selectedGame.id
                });
              }}
              chevron
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    paddingVertical: 50,
    fontSize: 36
  },
  selectedGame: {
    paddingBottom: 50,
    fontSize: 20
  }
});

function mapStateToProps(state) {
  return {
    games: state.games,
    selectedGame: state.selectedGame
  };
}

export default connect(mapStateToProps)(Home);
