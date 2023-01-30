import Constants from 'expo-constants'
import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8

export const MapStyles = StyleSheet.create({
  headerBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: Constants.statusBarHeight,
    width: '100%',
    backgroundColor: 'white'
  },
  headerText: {
    color: '#112D4E',
    fontSize: '16px',
    fontWeight: '500',
    marginTop: 10
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  seachTypeContainer: {
    position: 'absolute',
    top: 50 + Constants.statusBarHeight,
    width: '100%'
  },
  searchContainer: {
    marginHorizontal: 18,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconSearch: {
    position: 'absolute',
    top: 100
  },
  buttonRoute: {
    backgroundColor: '#bbb',
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
  },
  tagContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  tagText: {
    color: '#112D4E',
    padding: 5,
    paddingHorizontal: 15
  },
  tagList: {
    paddingLeft: 18,
    marginTop: 12
  },
  cardScrollView: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderRadius: 4,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  }
})