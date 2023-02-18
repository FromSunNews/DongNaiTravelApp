import Constants from 'expo-constants'
import { app_c, app_dms, app_sh, app_shdw, app_typo } from 'globals/styles'
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
    // marginTop: 20,
    width: '100%',
    backgroundColor: app_c.HEX.primary,
  },
  headerText: {
    color: app_c.HEX.fourth,
    marginTop: 10,
    // marginTop: 15,
    ...app_typo.fonts.h3
  },
  map: {
    flex: 1,
  },
  seachTypeContainer: {
    position: 'absolute',
    // +20
    top: 60,  
    // top: 80,
    width: '100%',
  },
  searchContainer: {
    marginHorizontal: 18,
    backgroundColor: app_c.HEX.primary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    ...app_sh.rounded_8,
    ...app_shdw.type_1
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
    height: 30,
    ...app_shdw.type_1
  },
  tagText: {
    color: '#112D4E',
    padding: 5,
    paddingHorizontal: 15
  },
  tagList: {
    paddingLeft: 18,
    position: 'absolute',
    top: 125,
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
  },
  besideBtn: {
    position: 'absolute',
    right: 0,
    bottom: 120
  },
  circleBtn: {
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    marginRight: 18,
    ...app_shdw.type_2
  },
  overlayBtn: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  headerBottomSheet: {
    paddingHorizontal: 18,
    color: app_c.HEX.fourth,
    ...app_typo.fonts.body2
  },
  contentContainer: {
    paddingHorizontal: 18
  },
  starRating: {
    marginBottom: 5,
  },
  typeTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10
  },
  textTypeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: app_c.HEX.third,
    marginRight: 5,
    marginBottom: 5,
    ...app_sh.rounded_4
  },
  textType: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: app_c.HEX.primary,
    ...app_typo.fonts.h5
  },  
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTimeDirection: {
    marginLeft: 5,
    color: app_c.HEX.ext_second,
    ...app_typo.fonts.body5
  },
  dropDownContainer: {
    overflow: 'hidden',
  },
  statusTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2
  },
  textStatus: {
    ...app_typo.fonts.h5,
    fontSize: 14
  },
  textTimeOpen: {
    color: app_c.HEX.ext_second,
    ...app_typo.fonts.body5,
    marginRight: 5
  },
  controlListContainer:{
    paddingHorizontal: 18,
    marginTop: 10
  },
  controlContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth:1,
    borderColor: app_c.HEX.third,
  },
  controlText: {
    marginLeft: 10,
    ...app_typo.fonts.body5,
  },
  imgListContainer:{
    paddingHorizontal: 18,
    marginTop: 20
  },
  containerImg: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgBigger: {
    ...app_sh.rounded_8,
    height: '100%',
    width: app_dms.screenWidth * 0.7,
  },
  containerImgSmaller: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10
  }, 
  imgSmaller: {
    width: 155,
    height: 155,
    ...app_sh.rounded_8
  },
  imgEmply: {
    width: 155,
    height: 155,
    ...app_sh.rounded_8,
    backgroundColor: 'transparent',
  },
  imgEmplyGray: {
    width: 155,
    height: 155,
    ...app_sh.rounded_8,
    backgroundColor: app_c.HEX.ext_primary,
  },
  formattedAddress: {
    paddingHorizontal: 18,
    color: app_c.HEX.ext_second,
    ...app_typo.fonts.body5,
    marginBottom: 5
  },
  openHoursContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  weekdayTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center'
  },
  weekdayTextCell: {
    flex: 3
  },
  weekdayText: {
    color: app_c.HEX.ext_second,
    ...app_typo.fonts.body5,
  },
  spaceForWeekdayText: {
    flex: 4
  },
  headerReview: {
    paddingHorizontal: 18,
    color: app_c.HEX.fourth,
    ...app_typo.fonts.body2,
    marginTop: 20
  }
})