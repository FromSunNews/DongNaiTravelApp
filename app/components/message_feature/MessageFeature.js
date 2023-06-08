import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
// import styles from './ChatBotScreenStyles'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../redux/language/LanguageSlice'
import useTheme from 'customHooks/useTheme'
import { getTextChatBotAPI } from 'request_api'
import { selectCurrentUser } from 'redux/user/UserSlice'
import { selectTemporaryUserId } from 'redux/user/UserSlice'
import { app_c, app_dms, app_shdw, app_sp, app_typo } from 'globals/styles';
import { selectCurrentMap } from 'redux/map/mapSlice'

import { AppText, VerticalPlaceCard, VerticalPlaceCardSkeleton } from 'components';

import { GiftedChat, Bubble, InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat'

import { getPlacesAPI } from 'request_api';
import { weatherIcons } from 'utilities/mapdata';
import WeatherChart from 'libs/react-native-weather-chart';
import { Ionicons, Entypo, Fontisto, FontAwesome5, FontAwesome, MaterialIcons, MaterialCommunityIcons} from "react-native-vector-icons"
import moment from 'moment/moment'

import { BRIEF_PLACE_DATA_FIELDS } from 'utilities/constants';

const MessageFeature = ({action, data = {}}) => {
  const [places, setPlaces] = useState(null);
  const [typePlace] = useState("all");

  const themeColor = useTheme();

  const [weatherHourSelectedIndex, setWeatherHourSelectedIndex] = useState(0)
  const [weatherDataSelected, setWeatherDataSelected] = useState({})

  useEffect(() => {
    if (action === 'input.suggest-place') {
        let query = `limit=5&skip=0&filter=quality:${typePlace}&fields=${BRIEF_PLACE_DATA_FIELDS}`;
        getPlacesAPI(query)
        .then(data => {
            setPlaces(data)
        })
    } else if (action === 'input.get-weather') {
        const weatherData = data
        setWeatherDataSelected({
            icon: weatherIcons[weatherData.weatherCurrent.weather[0].icon],
            temp: `${weatherData.weatherCurrent.main.temp.toFixed(1)}°C`,
            description: weatherData.weatherCurrent.weather[0].description,
            address: weatherData.nameGeocoding,
            wind: `${weatherData.weatherCurrent.wind.speed.toFixed(1)}km/h`,
            humidity: `${weatherData.weatherCurrent.main.humidity}%`,
            clouds: `${weatherData.weatherCurrent.clouds.all}%`,
            visibility: `${(weatherData.weatherCurrent.visibility/1000).toFixed(1)}km`,
            temp_min: `${weatherData.weatherCurrent.main.temp_min.toFixed(1)}°C`,
            temp_max: `${weatherData.weatherCurrent.main.temp_max.toFixed(1)}°C`,
        })
    }
}, [])

  if (action ==='input.welcome') {
    return
  } else if (action ==='input.suggest-place') {
    return (
      <ScrollView 
        horizontal={true}
        style={[{backgroundColor:themeColor.primary}, app_sp.pb_10]}
        contentContainerStyle={{flexGrow: 1}}
        showsHorizontalScrollIndicator={false}
      >
        {
        !places
        ? [1, 2, 3, 4, 5].map((value, index) => {
            let actualStyle = [app_sp.me_18, {marginTop: 10}];
            if(index === 0) actualStyle.push({marginLeft: 5});
            return <VerticalPlaceCardSkeleton key={value + index} style={actualStyle} />
        })
        : places.map((place, index) => {
            let actualStyle = [app_sp.me_18, {marginTop: 10}];
            if(index === 0) actualStyle.push({marginLeft: 5});
            return <VerticalPlaceCard place={place} placeIndex={index} typeOfBriefPlace={typePlace} style={actualStyle} key={place.place_id} isChatBotScreen={true}/>
        })
        }
      </ScrollView>
    )
  } else if (action ==='input.get-weather') {
    const weatherData = data

    const weatherHours = [moment(new Date(weatherData.weatherCurrent.dt * 1000)).format("kk:mm"), ...weatherData.weatherForecast.map(i => {return moment(new Date(i.dt * 1000)).format("kk:mm")})]
    const weatherValues = [weatherData.weatherCurrent.main.temp.toFixed(1), ...weatherData.weatherForecast.map(i => {return i.main.temp.toFixed(1)})]
    const weatherTexts = [`${weatherData.weatherCurrent.main.temp.toFixed(1)}°`, ...weatherData.weatherForecast.map(i => {return `${i.main.temp.toFixed(1)}°`})]
    const weatherIcon = [weatherData.weatherCurrent.weather[0].icon, ...weatherData.weatherForecast.map(i => {return i.weather[0].icon})]

    const Data = {
      values: weatherValues,
      textTop: weatherHours, 
      textBottom: weatherTexts,
      iconBottom: weatherIcon,
    };
    
    const Settings = {
      showTextTop: true,
      showTextBottom: true,
      showIconTop: false,
      showIconBottom: true,
      // showVerticalLines: true,
      colSpace: 60,
      lineColor: app_c.HEX.ext_third,
      vlineColor: app_c.HEX.ext_third,
      topTextColor: app_c.HEX.ext_third,
      bottomTextColor: app_c.HEX.ext_third,
      // markerFillColor: app_c.HEX.ext_third,
      markerStrokeColor: app_c.HEX.ext_third,
      noDataTextColor: app_c.HEX.fourth,
      iconTopColor: app_c.HEX.fourth,
      iconBottomColor: app_c.HEX.fourth,
      iconSize: 30
    };

    return (
      <View style={{
        backgroundColor: app_c.HEX.ext_primary,
        height: 280,
        borderRadius:12,
        marginTop: 10,
        width: '90%'
      }}>
        <View style={{
          width: 300,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 18,
          paddingVertical: 5
        }}>
            <TouchableOpacity 
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row'
              }}
              onPress={() => {
                if (weatherHourSelectedIndex > 0) {
                    console.log("🚀 ~ file: QuickReplies.js:278 ~ QuickReplies ~ weatherHourSelectedIndex:", weatherHourSelectedIndex)
                    if (weatherHourSelectedIndex === 1) {
                        setWeatherDataSelected({
                            icon: weatherIcons[weatherData.weatherCurrent.weather[0].icon],
                            temp: `${weatherData.weatherCurrent.main.temp.toFixed(1)}°C`,
                            description: weatherData.weatherCurrent.weather[0].description,
                            address: weatherData.nameGeocoding,
                            wind: `${weatherData.weatherCurrent.wind.speed.toFixed(1)}km/h`,
                            humidity: `${weatherData.weatherCurrent.main.humidity}%`,
                            clouds: `${weatherData.weatherCurrent.clouds.all}%`,
                            visibility: `${(weatherData.weatherCurrent.visibility/1000).toFixed(1)}km`,
                            temp_min: `${weatherData.weatherCurrent.main.temp_min.toFixed(1)}°C`,
                            temp_max: `${weatherData.weatherCurrent.main.temp_max.toFixed(1)}°C`,
                        })
                    } else {
                        const index = weatherHourSelectedIndex === 0 ? weatherHourSelectedIndex : weatherHourSelectedIndex - 1
                        setWeatherDataSelected({
                            icon: weatherIcons[weatherData.weatherForecast[index].weather[0].icon],
                            temp: `${weatherData.weatherForecast[index].main.temp.toFixed(1)}°C`,
                            description: weatherData.weatherForecast[index].weather[0].description,
                            address: weatherData.nameGeocoding,
                            wind: `${weatherData.weatherForecast[index].wind.speed.toFixed(1)}km/h`,
                            humidity: `${weatherData.weatherForecast[index].main.humidity}%`,
                            clouds: `${weatherData.weatherForecast[index].clouds.all}%`,
                            visibility: `${(weatherData.weatherForecast[index].visibility/1000).toFixed(1)}km`,
                            temp_min: `${weatherData.weatherForecast[index].main.temp_min.toFixed(1)}°C`,
                            temp_max: `${weatherData.weatherForecast[index].main.temp_max.toFixed(1)}°C`,
                        })
                    }
                    if (weatherHourSelectedIndex !== 0)
                        setWeatherHourSelectedIndex(weatherHourSelectedIndex - 1)
                }
              }}
            >
              <MaterialIcons
                name="arrow-back-ios"
                size={25}
                color={weatherHourSelectedIndex > 0 ? app_c.HEX.ext_second : app_c.HEX.ext_third}
              />
            </TouchableOpacity>

            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              alignSelf: 'center'
            }}>
            <Image source={weatherDataSelected.icon} 
            style={{
              height: 80,
              width: 80,
              ...app_shdw.type_1,
              marginLeft: -5,
              marginBottom: -10
            }}/>
            <View>
                <Text 
                style={{
                    color: app_c.HEX.ext_second,
                    ...app_typo.fonts.normal.normal.h3,
                }}
                >{weatherDataSelected.temp}</Text>
                <Text
                style={{
                    color: app_c.HEX.ext_second,
                    ...app_typo.fonts.normal.normal.h5,
                    
                }}
                >{weatherDataSelected.address}</Text>
                <Text
                style={{
                    color: app_c.HEX.ext_second,
                    ...app_typo.fonts.normal.normal.h5,
                    fontSize: 12
                }}
                >{weatherDataSelected.description}</Text>
            </View>
            </View>

            <TouchableOpacity
                style={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    marginRight: -5
                }}
                onPress={() => {
                    // Kieemr tra thằng này nó có nhở hơn 40 nêu có là vẫn bấm được
                    if (weatherHourSelectedIndex <= weatherData.weatherForecast.length) {
                        console.log("🚀 ~ file: QuickReplies.js:278 ~ QuickReplies ~ weatherHourSelectedIndex:", weatherHourSelectedIndex)
                        const index = weatherHourSelectedIndex === 0 ? weatherHourSelectedIndex : weatherHourSelectedIndex - 1
                        setWeatherDataSelected({
                            icon: weatherIcons[weatherData.weatherForecast[index].weather[0].icon],
                            temp: `${weatherData.weatherForecast[index].main.temp.toFixed(1)}°C`,
                            description: weatherData.weatherForecast[index].weather[0].description,
                            address: weatherData.nameGeocoding,
                            wind: `${weatherData.weatherForecast[index].wind.speed.toFixed(1)}km/h`,
                            humidity: `${weatherData.weatherForecast[index].main.humidity}%`,
                            clouds: `${weatherData.weatherForecast[index].clouds.all}%`,
                            visibility: `${(weatherData.weatherForecast[index].visibility/1000).toFixed(1)}km`,
                            temp_min: `${weatherData.weatherForecast[index].main.temp_min.toFixed(1)}°C`,
                            temp_max: `${weatherData.weatherForecast[index].main.temp_max.toFixed(1)}°C`,
                        })
                        if (weatherHourSelectedIndex !== weatherData.weatherForecast.length)
                            setWeatherHourSelectedIndex(weatherHourSelectedIndex + 1)
                    }
                }}
            >
                <MaterialIcons
                    name="arrow-forward-ios"
                    size={25}
                    color={weatherHourSelectedIndex < weatherData.weatherForecast.length ? app_c.HEX.ext_second : app_c.HEX.ext_third}
                />
            </TouchableOpacity>
        </View>

        <View style={{
            height: 20,
            width: 300,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 18,
            flexGrow: 1
        }}>
            <View style={{
                flex: 0.3,
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <Fontisto name='wind' size={14} color={app_c.HEX.ext_second}/>
                <AppText numberOfLines={1} style={{...app_typo.fonts.normal.bolder.body2,marginLeft:6, color: app_c.HEX.ext_second}}>{weatherDataSelected.wind}</AppText>
            </View>
            
            <View style={{
                flex: 0.4,
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingLeft: 15
            }}>
                <Entypo name='water' size={14} color={app_c.HEX.ext_second}/>
                <AppText numberOfLines={1} style={{...app_typo.fonts.normal.bolder.body2,marginLeft:6, color: app_c.HEX.ext_second}}>{weatherDataSelected.humidity}</AppText>

            </View>
            
            <View style={{
                flex: 0.3,
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <FontAwesome5 name='temperature-high' size={14} color={app_c.HEX.ext_second}/>
                <AppText numberOfLines={1} style={{...app_typo.fonts.normal.bolder.body2,marginLeft:6, color: app_c.HEX.ext_second}}>{weatherDataSelected.temp_max}</AppText>
            </View>
        </View>
        
        <View style={{
            // height: 25,
            width: 300,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 18,
            marginBottom: 10,
            flexGrow: 1
        }}>
            <View style={{
                flex: 0.3,
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <Entypo name='cloud' size={14} color={app_c.HEX.ext_second}/>
                <AppText numberOfLines={1} style={{...app_typo.fonts.normal.bolder.body2,marginLeft:6, color: app_c.HEX.ext_second}}>{weatherDataSelected.clouds}</AppText>
            </View>
            
            <View style={{
                flex: 0.4,
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingLeft: 15
            }}>
                <MaterialCommunityIcons name='weather-fog' size={14} color={app_c.HEX.ext_second}/>
                <AppText numberOfLines={1} style={{...app_typo.fonts.normal.bolder.body2,marginLeft:6, color: app_c.HEX.ext_second}}>{weatherDataSelected.visibility}</AppText>
            </View>
            
            <View style={{
                flex: 0.3,
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <FontAwesome5 name='temperature-low' size={14} color={app_c.HEX.ext_second}/>
                <AppText numberOfLines={1} style={{...app_typo.fonts.normal.bolder.body2,marginLeft:6, color: app_c.HEX.ext_second}}>{weatherDataSelected.temp_min}</AppText>
            </View>
        </View>

        <WeatherChart data={Data} settings={Settings} selectedIndex={weatherHourSelectedIndex} handeChangeIndex={(index) => setWeatherHourSelectedIndex(index)}/>
      </View>
    );
  } else {
    return 
  }
}

export default MessageFeature