import Constants from 'expo-constants'
import { app_c, app_sh, app_shdw, app_typo } from 'globals/styles'
import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8

export const styles = StyleSheet.create({
  headerBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    marginTop: -15,
    width: '100%',
    backgroundColor: app_c.HEX.primary,
  },
  headerText: {
    color: app_c.HEX.fourth,
    marginTop: 10,
    ...app_typo.fonts.h3
  },
  map: {
    flex: 1,
  },
  seachTypeContainer: {
    position: 'absolute',
    top: 40,
    width: '100%'
  },
  searchContainer: {
    marginHorizontal: 18,
    backgroundColor: app_c.HEX.primary,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    ...app_sh.rounded_8,
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
    marginRight: 10,
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
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
    marginBottom: 10,
    ...app_sh.rounded_8,
    ...app_shdw.type_3
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
    ...app_sh.rounded_4,
    borderColor: app_c.HEX.fourth,
    borderWidth: 1
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
    color: app_c.HEX.fourth
  }
})