import {
  View, Text,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TouchableNativeFeedback,
  Platform
} from "react-native"
import React, { useEffect,useState } from "react"
import * as Location from "expo-location"

import { useSelector } from "react-redux"

import {
  getPlacesAPI,
  getBlogsAPI,
  getWeatherCurrentAPI
} from 'request_api'

import { useBriefPlaces } from "customHooks/usePlace"
import useTheme from "customHooks/useTheme"

import { selectCurrentMode } from "redux/theme/ThemeSlice"
import { selectCurrentMap } from "redux/map/mapSlice"
import { selectCurrentLanguage } from "redux/language/LanguageSlice"

import {
  BRIEF_PLACE_DATA_FIELDS,
  BRIEF_BLOG_DATA_FIELDS
} from "utilities/constants"

import { Ionicons, Entypo,Fontisto,FontAwesome5,MaterialCommunityIcons} from "react-native-vector-icons"

import { 
  AppText, 
  HorizontalPlaceCard, 
  RectangleButton,
  HorizontalBlogCard,
  TypeScrollView,
  VerticalBlogCardSkeleton,
  VerticalBlogCard,
  VerticalPlaceCard,
  VerticalPlaceCardSkeleton
} from "components"
import CustomStatusBar from "components/custom_status_bar/CustomStatusBar"
import TabSlideCategoryPlace from "components/tab_slide_category_place/TabSlideCategoryPlace"
import TabSlideCategoryBlog from "components/tab_slide_category_blog/TabSlideCategoryBlog"
import HomeBannerSlider from "components/home_banner_slider/HomeBannerSlider"

import styles from "./HomeScreenStyles"
import { app_sp, app_typo } from "globals/styles"

const HomeScreen = ({navigation}) => {
  const currentMap = useSelector(selectCurrentMap)
  const [showPanelWeather, setShowPanelWeather] = useState(false)
  //template
  const [celsius, setCelsius] = useState(null)
  const [desWeather, setDesWeather] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [cloud, setCloud] = useState(null)
  const [vision, setVision] = useState(null)
  const [wind, setWind] = useState(null)
  const [typePlace, setTypePlace] = React.useState("all");
  const [typeBlog, setTypeBlog] = React.useState("all");
  const [places, setPlaces] = React.useState(null);
  const [blogs, setBlogs] = React.useState(null);
  
  //language
  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.homeScreen
  //theme
  const themeColor = useTheme();
  const themeMode = useSelector(selectCurrentMode).mode

  const previousTypes = React.useRef({
    place: typePlace,
    blog: typeBlog
  })

  // console.log('ChoseTypeOfPlace: '+ typePlace)
  // console.log('ChoseTypeOfBlog: '+ typeBlog)
  // const [location,setLocation] = useState(null)  
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  
  const getCurrentWeather = async (location)=>{
    await getWeatherCurrentAPI(location)
    .then(data => {
      setCelsius(data.main.temp.toFixed(1))
      setHumidity(data.main.humidity)
      setWind(data.wind.speed.toFixed(1))
      setCloud(data.clouds.all)
      setVision(data.visibility / 1000)
      setDesWeather(data.weather[0].description)
    })
  }

  const handleReloadLocation = ()=>{
    getCurrentWeather()
  }

  useEffect(()=>{
    if (currentMap.userLocation) {
      getCurrentWeather(currentMap.userLocation)
      // Phương: Hiển thị thằng panelWeather lên
      setShowPanelWeather(true)
    }
    // getCurrentLocationAsync()
  },[currentMap.userLocation])

  useEffect(() => {
    let placeQuery = `limit=5&skip=0&filter=quality:${typePlace}&fields=${BRIEF_PLACE_DATA_FIELDS}`;

    getPlacesAPI(placeQuery)
      .then(data => {
        setPlaces(data)
      })
  }, [typePlace])

  React.useEffect(() => {
    let blogQuery = `limit=5&skip=0&filter=quality:${typeBlog}&fields=${BRIEF_BLOG_DATA_FIELDS}`

    getBlogsAPI(blogQuery)
      .then(data => {
        setBlogs(data)
      })
  }, [typeBlog]);

  return (
    
    <ScrollView style={[styles.container,{backgroundColor: themeColor.primary,}]} showsVerticalScrollIndicator={false}>
      <View style={styles.home_content}>
        <View style={[styles.home_banner, {backgroundColor: themeColor.ext_third,}]}>
          <HomeBannerSlider/>
        </View>

        {
          showPanelWeather &&
          <View style={styles.home_temperature}>
            <View style={[styles.temperature,{backgroundColor: themeColor.ext_primary,}]}>
              <View style={styles.temperature_degrees}>
                {
                  celsius ? (
                    <AppText style={[styles.temperature_degrees_info,{fontSize:22,marginTop:-4,color:themeColor.ext_second,}]}>{`${celsius}°C`}</AppText>
                  ): <AppText style={[styles.temperature_degrees_info,{fontSize:22,marginTop:-4,color:themeColor.ext_second,}]}><Entypo name="minus"/><Entypo name="minus"/>{`°C`}</AppText>
                }
                {
                  desWeather ? (
                    <AppText numberOfLines={2}  style={[styles.temperature_degrees_info,{fontSize:13,paddingHorizontal:4,textAlign:"center",color:themeColor.ext_second,}]}>{capitalizeFirstLetter(desWeather)}</AppText>
                  ) : <AppText numberOfLines={2}  style={[styles.temperature_degrees_info,{fontSize:13,paddingHorizontal:4,textAlign:"center",color:themeColor.ext_second,}]}>{langData.desWeather[langCode]}</AppText>
                }
              </View>
              <View style={styles.temperature_other_info}>
                <View style={[styles.temperature_other_info_half]}>
                  <View style={styles.temperature_other_info_quarter}>
                    <Fontisto name='wind' size={14} color={themeColor.ext_second}/>
                    {
                      wind ?(
                      <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub0,paddingHorizontal:8}}>{`${wind}`}<Text style={{fontSize:12}}>km/h</Text></AppText>
                      ) :  <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub0,marginTop:4}}><Entypo name="minus"/><Entypo name="minus"/><Text style={{fontSize:12}}>km/h</Text></AppText>
                    }
                  </View>
                  <View style={[styles.temperature_other_info_quarter,{ paddingLeft:12}]}>
                        <Entypo name='water' size={15} color={themeColor.ext_second}/>
                        {
                          humidity ? (
                            <AppText style={{...app_typo.fonts.normal.normal.sub0,paddingHorizontal:8}}>{`${humidity}`}<Text style={{fontSize:12}}>%</Text></AppText>
                          ) :  <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub0,marginTop:4}}><Entypo name="minus"/><Entypo name="minus"/><Text style={{fontSize:12}}>%</Text></AppText>
                        }
                  </View>
                </View>
                <View style={styles.temperature_other_info_half}>
                  <View style={styles.temperature_other_info_quarter}>
                    <Entypo name='cloud' size={15} color={themeColor.ext_second}/>
                    {
                      cloud ? (
                        <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub0,paddingHorizontal:8}}>{`${cloud}`+`%`}</AppText>
                      ) :  <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub0,marginTop:4}}><Entypo name="minus"/><Entypo name="minus"/><Text style={{fontSize:12}}>%</Text></AppText>
                    }
                  </View>
                  <View style={[styles.temperature_other_info_quarter,{paddingLeft:12}]}>
                      <MaterialCommunityIcons name='weather-fog' size={15} color={themeColor.ext_second}/>
                      {
                        vision ? (
                          <AppText style={{...app_typo.fonts.normal.normal.sub0,paddingHorizontal:8}}>{`${vision.toFixed(1)}`}<Text style={{fontSize:12}}>km</Text></AppText>
                        ) :  <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub0,marginTop:4}}><Entypo name="minus"/><Entypo name="minus" color='red
                        
                        '  /><Text style={{ fontSize: 12 }}>km</Text></AppText>
                      }
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={[styles.temperature_reload,{backgroundColor: themeColor.ext_primary,}]} onPress={getCurrentWeather}>
              <Ionicons name="reload-sharp" size={30} color={themeColor.fourth} />
            </TouchableOpacity>
          </View>
        }

        {/* Place and Blog*/}
        <View style={styles.home_category}>
          <TouchableOpacity style={styles.category_header} onPress={()=>navigation.navigate("ExploreNavigator")}>
            <AppText style={styles.category_name}>{langData.title_place[langCode]}</AppText>
            <AppText><Entypo name="chevron-small-right" size={40}/></AppText>
          </TouchableOpacity>
          <TypeScrollView
            types='all;recommended;popular;most_visit;high_rating'
            callBack={setTypePlace}
            scrollStyle={[app_sp.ms_18, app_sp.mb_12]}
            containerStyle={{backgroundColor: themeColor.primary, ...app_sp.pv_10}}
          />
          <ScrollView 
            horizontal={true}
            style={[{backgroundColor:themeColor.primary}, app_sp.pb_10]}
            contentContainerStyle={{flexGrow: 1}}
            showsHorizontalScrollIndicator={false}
          >
            {
              !places
              ? [1, 2, 3].map((value, index) => {
                let actualStyle = [app_sp.me_18];
                if(index === 0) actualStyle.push(app_sp.ms_18);
                return <VerticalPlaceCardSkeleton key={value + index} style={actualStyle} />
              })
              : places.map((place, index) => {
                let actualStyle = [app_sp.me_18];
                if(index === 0) actualStyle.push(app_sp.ms_18);
                return <VerticalPlaceCard place={place} placeIndex={index} typeOfBriefPlace={typePlace} style={actualStyle} key={place.place_id} />
              })
            }
          </ScrollView>
        </View>
        <View style={[styles.home_category,{backgroundColor: themeColor.primary}]}>
          <TouchableOpacity style={styles.category_header} onPress={()=>navigation.navigate("BlogsNavigator")}>
            <AppText style={styles.category_name}>{langData.title_Blog[langCode]}</AppText>
            <AppText><Entypo name="chevron-small-right" size={40}/></AppText>
          </TouchableOpacity>
          <TypeScrollView
            types='all;most_favorites;most_comments'
            callBack={(type) => {
              setTypeBlog(type)
            }}
            scrollStyle={[{paddingLeft:16}, app_sp.pv_12]}
            containerStyle={{backgroundColor: themeColor.primary}}
          />
          <View style={{ ...app_sp.mb_12}}>
            <ScrollView horizontal={true} style={{paddingBottom:10,paddingLeft:16}} showsHorizontalScrollIndicator={false}>
              {
                !blogs
                ? [1, 2, 3].map((value, index) => <VerticalBlogCardSkeleton key={value + index} style={{  marginLeft: index !== 0 ? 16 : 0,}} />)
                : blogs.map((blog, index) => {
                  let actualStyle = [app_sp.me_18];
                  if(index === 0) actualStyle.push(app_sp.ms_18);
                  return <VerticalBlogCard blog={blog} style={{ marginLeft: index !== 0 ? 16 : 2, marginRight : blogs.length - 1 === index ? 36 : 0}}/>
                }
                )
              }
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default HomeScreen