import React from 'react';
import { ActivityIndicator, AsyncStorage, Linking, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { storeSelectedGame } from '../redux/actions';
import { Header, Icon, Button } from 'react-native-elements';

class Info extends React.Component {
  state = {
    loading: true,
    game: {},
    gameId: this.props.navigation.getParam('gameId')
  }

  setStateGameDetails = async () => {
    try {
      const game = await fetch("http://androidlessonsapi.herokuapp.com/api/game/details?game_id=" + this.state.gameId).then((response) => {
        return response.json()
      })

      this.props.dispatch(storeSelectedGame(game))
      await AsyncStorage.setItem('selectedGame', JSON.stringify(game))

      this.setState({
        loading: false,
        game
      })
    } catch(exception) {
      console.log(exception)
    }
  }

  componentWillMount() {
    this.setStateGameDetails()
  }

  render() {
    const game = this.state.game
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Icon
              type='font-awesome'
              name='chevron-left'
              color='#fff'
              iconStyle={{fontSize: 24}}
              onPress={() => {
                this.props.navigation.goBack()
              }}
            />
          }
          centerComponent={{ text: game.name, style: { color: '#fff', fontSize: 32 } }}
          containerStyle={{
            height: 120,
            backgroundColor: '#3D6DCC',
            justifyContent: 'space-around',
          }}
        />

        {this.state.loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <View style={styles.contentContainer}>
            <View style={styles.informationsContainer}>
              <Text style={styles.containerTitle}>Informations</Text>
              <View style={styles.informationContainer}>
                <Icon
                  containerStyle={styles.informationIcon}
                  type='font-awesome'
                  name='group'
                />
                <Text style={styles.informationText}>{game.players}</Text>
              </View>
              <View style={styles.informationContainer}>
                <Icon
                  containerStyle={styles.informationIcon}
                  type='font-awesome'
                  name='gamepad'
                />
                <Text style={styles.informationText}>{game.type.charAt(0).toUpperCase() + game.type.slice(1)}</Text>
              </View>
              <View style={styles.informationContainer}>
                <Icon
                  containerStyle={styles.informationIcon}
                  type='font-awesome'
                  name='calendar'
                />
                <Text style={styles.informationText}>{game.year}</Text>
              </View>
            </View>

            <View style={styles.descriptionContainer}>
              <View style={styles.descriptionBorder}>
                <Text style={styles.containerTitle}>Description</Text>
                <Text style={styles.descriptionText}>{game.description_en}</Text>
              </View>
            </View>

            <Button
              containerStyle={styles.urlContainer}
              icon={
                <Icon
                  type='font-awesome'
                  name='info-circle'
                  size={20}
                  color='#3D6DCC'
                />
              }
              title=" More details"
              type="outline"
              titleStyle={styles.urlTitle}
              onPress={() => {
                Linking.openURL(game.url).catch((err) => console.error('An error occurred', err));
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20
  },
  containerTitle: {
    alignSelf: 'center',
    fontSize: 24,
    marginBottom: 10
  },
  informationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  informationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  informationIcon: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  informationText: {
    marginLeft: 10,
    fontSize: 20
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionBorder: {
    borderWidth: 0.5,
    padding: 20
  },
  descriptionText: {
    fontSize: 18
  },
  urlContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  urlTitle: {
    fontSize: 20,
    color: '#3D6DCC'
  }
});

export default connect(undefined)(Info);
