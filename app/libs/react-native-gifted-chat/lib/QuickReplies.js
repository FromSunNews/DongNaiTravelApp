import PropTypes from 'prop-types';
import React, { useState, useMemo, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image, } from 'react-native';
import { useCallbackOne } from 'use-memo-one';
import Color from './Color';
import { StylePropType } from './utils';
import { warning } from './logging';
import { app_c, app_dms, app_shdw, app_sp, app_typo } from 'globals/styles';
import { AppText, VerticalPlaceCard, VerticalPlaceCardSkeleton } from 'components';
import useTheme from 'customHooks/useTheme';
import { BRIEF_PLACE_DATA_FIELDS } from 'utilities/constants';
import { getPlacesAPI } from 'request_api';
import { weatherIcons } from 'utilities/mapdata';
import WeatherChart from 'libs/react-native-weather-chart';
import { Ionicons, Entypo,Fontisto,FontAwesome5,MaterialIcons, MaterialCommunityIcons} from "react-native-vector-icons"
import moment from 'moment/moment'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: '100%',
        marginTop: 5
    },
    quickReply: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        maxWidth: 200,
        paddingVertical: 7,
        paddingHorizontal: 12,
        minHeight: 40,
        borderRadius: 13,
        margin: 3
    },
    quickReplyText: {
        overflow: 'visible',
        ...app_typo.fonts.normal.bolder.body2
    },
    sendLink: {
        borderWidth: 0,
    },
    sendLinkText: {
        color: Color.defaultBlue,
        fontWeight: '600',
        fontSize: 17,
    },
});
const sameReply = (currentReply) => (reply) => currentReply.value === reply.value;
const diffReply = (currentReply) => (reply) => currentReply.value !== reply.value;
export function QuickReplies({ currentMessage, nextMessage, color = Color.peterRiver, quickReplyStyle, quickReplyTextStyle, onQuickReply, sendText = 'Send', renderQuickReplySend, }) {

    const [places, setPlaces] = useState(null);
    const [typePlace] = useState("all");

    const themeColor = useTheme();

    const { type } = currentMessage.quickReplies;
    const [replies, setReplies] = useState([]);

    const [weatherHourSelectedIndex, setWeatherHourSelectedIndex] = useState(0)
    const [weatherDataSelected, setWeatherDataSelected] = useState({})
    useEffect(() => {
        if (currentMessage?.quickReplies.action === 'input.suggest-place') {
            let query = `limit=5&skip=0&filter=quality:${typePlace}&fields=${BRIEF_PLACE_DATA_FIELDS}`;
            getPlacesAPI(query)
            .then(data => {
                setPlaces(data)
            })
        } else if (currentMessage?.quickReplies.action === 'input.get-weather') {
            const weatherData = currentMessage?.quickReplies?.data
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

    const shouldComponentDisplay = useMemo(() => {
        const hasReplies = !!currentMessage && !!currentMessage.quickReplies;
        const hasNext = !!nextMessage && !!nextMessage._id;
        const keepIt = currentMessage.quickReplies.keepIt;
        if (hasReplies && !hasNext) {
            return true;
        }
        if (hasReplies && hasNext && keepIt) {
            return true;
        }
        return false;
    }, [currentMessage, nextMessage]);

    const handlePress = useCallbackOne((reply) => () => {
        if (currentMessage) {
            const { type } = currentMessage.quickReplies;
            switch (type) {
                case 'radio': {
                    handleSend([reply])();
                    return;
                }
                case 'checkbox': {
                    if (replies.find(sameReply(reply))) {
                        setReplies(replies.filter(diffReply(reply)));
                    }
                    else {
                        setReplies([...replies, reply]);
                    }
                    return;
                }
                default: {
                    warning(`onQuickReply unknown type: ${type}`);
                    return;
                }
            }
        }
    }, [replies, currentMessage]);
    const handleSend = (repliesData) => () => {
        onQuickReply === null || onQuickReply === void 0 ? void 0 : onQuickReply(repliesData.map((reply) => ({
            ...reply,
            messageId: currentMessage._id,
        })));
    };
    if (!shouldComponentDisplay) {
        return null;
    }

    if (currentMessage?.quickReplies.action === 'input.suggest-place') {
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
    } else if (currentMessage?.quickReplies.action === 'input.get-weather') {

        const weatherData = currentMessage?.quickReplies?.data

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
                width: 300
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
        return (<View style={styles.container}>
        {currentMessage.quickReplies.values.map((reply, index) => {
                const selected = type === 'checkbox' && replies.find(sameReply(reply));
                return (<TouchableOpacity onPress={handlePress(reply)} style={[
                        styles.quickReply,
                        quickReplyStyle,
                        { borderColor: reply.bdColor },
                        { backgroundColor: reply.bgColor },
                        { width: '100%' },
                        selected && { backgroundColor: color },
                    ]} key={`${reply.value}-${index}`}>
                <Text numberOfLines={10} ellipsizeMode={'tail'} style={[
                        styles.quickReplyText,
                        { color: Color.white },
                        quickReplyTextStyle,
                    ]}>
                    { reply.isUpperCase ? reply.title.toUpperCase() : reply.title}
                </Text>
                </TouchableOpacity>);
            })}
        {replies.length > 0 && (<TouchableOpacity style={[styles.quickReply, styles.sendLink]} onPress={handleSend(replies)}>
            {(renderQuickReplySend === null || renderQuickReplySend === void 0 ? void 0 : renderQuickReplySend()) || (<Text style={styles.sendLinkText}>{sendText}</Text>)}
            </TouchableOpacity>)}
        </View>);
    }
}

QuickReplies.propTypes = {
    currentMessage: PropTypes.object.isRequired,
    onQuickReply: PropTypes.func,
    color: PropTypes.string,
    sendText: PropTypes.string,
    renderQuickReplySend: PropTypes.func,
    quickReplyStyle: StylePropType,
};
//# sourceMappingURL=QuickReplies.js.map