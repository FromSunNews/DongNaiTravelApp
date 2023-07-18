import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getWeatherForecastAPI } from "apis/axios";

import styles from "./WeatherScreenStyles";
import { app_c, app_typo } from "globals/styles";

import { weatherImages } from "utilities/mapdata";

import { selectCurrentMap } from "redux/map/mapSlice";

import { AppText } from "components";

// List days off week

const WeatherDailyBlock = ({ day }) => {
  const [showWeatherHourlyBlock, setShowWeatherHourlyBlock] = useState(false);
  const handleShowWeatherHourlyBlock = () => {
    setShowWeatherHourlyBlock(!showWeatherHourlyBlock);
    //set layout animatiion
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  console.log("showWeatherHourlyBlock:", day.day, ":", showWeatherHourlyBlock);

  // Thêm dòng này để cho phép LayoutAnimation hoạt động trên Android
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const dropWeatherDailyBlock = () => {
    if (showWeatherHourlyBlock) {
      return (
        <ScrollView
          style={styles.weather_hourly_table}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.weather_hourly_info}>
            <AppText style={styles.weather_time}>Bây giờ</AppText>
            <Image
              source={require("../../assets/images/weather_forcast/sunny.png")}
              resizeMode="cover"
              style={styles.weather_hourly_image}
            />
            <AppText style={styles.weather_hourly_temperature}>31°C</AppText>
          </View>
          <View style={styles.weather_hourly_info}>
            <AppText style={styles.weather_time}>Bây giờ</AppText>
            <Image
              source={require("../../assets/images/weather_forcast/sunny.png")}
              resizeMode="cover"
              style={styles.weather_hourly_image}
            />
            <AppText style={styles.weather_hourly_temperature}>31°C</AppText>
          </View>

          <View style={styles.weather_hourly_info}>
            <AppText style={styles.weather_time}>Bây giờ</AppText>
            <Image
              source={require("../../assets/images/weather_forcast/sunny.png")}
              resizeMode="cover"
              style={styles.weather_hourly_image}
            />
            <AppText style={styles.weather_hourly_temperature}>31°C</AppText>
          </View>
          <View style={styles.weather_hourly_info}>
            <AppText style={styles.weather_time}>Bây giờ</AppText>
            <Image
              source={require("../../assets/images/weather_forcast/sunny.png")}
              resizeMode="cover"
              style={styles.weather_hourly_image}
            />
            <AppText style={styles.weather_hourly_temperature}>31°C</AppText>
          </View>
        </ScrollView>
      );
    }
  };
  //Viết hoa chữ cái đầu
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.weather_daily_info_block}
        onPress={handleShowWeatherHourlyBlock}
      >
        <View style={styles.weather_daily_info}>
          <AppText
            style={[
              styles.weather_daily_name,
              styles.font_weather_daily_info,
              styles.fw_700,
            ]}
          >
            {capitalizeFirstLetter(day.day)}
          </AppText>
          <Image
            source={require("../../assets/images/weather/02d.png")}
            resizeMode="cover"
            style={styles.weather_daily_image}
          />
          <AppText style={styles.weather_daily_value}>
            <AppText
              style={[
                styles.weather_current_hightest,
                styles.font_weather_daily_info,
              ]}
            >
              Ngày: <Text style={styles.fw_700}>31°C</Text>
            </AppText>
            <AppText
              style={[
                { ...app_typo.fonts.normal.bolder.h4 },
                styles.font_weather_daily_info,
              ]}
            >
              {" "}
              -{" "}
            </AppText>
            <AppText
              style={[
                styles.weather_current_lowest,
                styles.font_weather_daily_info,
              ]}
            >
              Đêm: <Text style={styles.fw_700}>31°C</Text>
            </AppText>
          </AppText>
        </View>
      </TouchableOpacity>
      {showWeatherHourlyBlock && dropWeatherDailyBlock(showWeatherHourlyBlock)}
    </>
  );
};

//Main
const WeatherScreen = () => {
  const [temp, setTemp] = useState(null);
  const [maxTemperature, setMaxTemperature] = useState(null);
  const [minTemperature, setMinTemperature] = useState(null);
  const [place, setPlace] = useState(null);
  const [feelLike, setFeelLike] = useState(null);
  const [desc, setDesc] = useState(null);
  const [iconWeather, setIconWeather] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [day, setDay] = useState(null);

  const dateString = day
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  const weekdays = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const dayOfWeekName = weekdays[dayOfWeek];
  const monthName = months[month];

  console.log("Day of the week:", dayOfWeekName);
  console.log("Day-Month:", `${dayOfMonth}-${monthName}`);

  const currentMap = useSelector(selectCurrentMap);
  const getWeatherForecast = async (location) => {
    await getWeatherForecastAPI(location).then((data) => {
      setTemp(data.weatherCurrent.main.temp.toFixed(1));
      setPlace(data.weatherCurrent.name);
      setMaxTemperature(data.weatherCurrent.main.temp_max);
      setMinTemperature(data.weatherCurrent.main.temp_min);
      setFeelLike(data.weatherCurrent.main.feels_like);
      setHumidity(data.weatherCurrent.main.humidity);
      setDesc(data.weatherCurrent.weather[0].description);
      setIconWeather(data.weatherCurrent.weather[0].icon);
      setWind(data.weatherCurrent.wind.speed);
      setDay(data.weatherForecast[0].dt_txt);
    });
  };

  useEffect(() => {
    // Đức: Nếu có địa điểm người dùng thì
    if (currentMap.userLocation) {
      getWeatherForecast(currentMap.userLocation);
    }
  }, [currentMap.userLocation]);

  return (
    <ScrollView>
      <ImageBackground
        source={require("../../assets/images/background_weather/pexels-lua-morales-2335767.jpg")}
        resizeMode="cover"
        style={styles.background_weather_image}
      >
        <View style={styles.main_weather_info}>
          <View style={styles.main_weather_info_element}>
            <AppText
              style={[
                styles.address,
                { ...app_typo.fonts.normal.bolder.h2, color: "#FFF" },
              ]}
            >
              {place}
            </AppText>
            <AppText
              style={[
                styles.dateTime,
                { ...app_typo.fonts.normal.normal.h5, color: "#FFF" },
              ]}
            >
              {[dayOfWeekName,', ',dayOfMonth,'-',monthName]}
            </AppText>
          </View>
          <View style={styles.main_weather_info_element}>
            <View style={styles.temperature_block}>
              <Image
                style={styles.icon_weather_forecast}
                source={require("../../assets/images/weather_forcast/sunny.png")}
                resizeMode="cover"
              />
              <AppText style={styles.weather_forecast_degree}>{temp}°C</AppText>
            </View>
          </View>
          <View
            style={[
              styles.main_weather_info_element,
              { justifyContent: "flex-start" },
            ]}
          >
            <AppText
              style={[
                styles.dateTime,
                { ...app_typo.fonts.normal.normal.h3, color: "#FFF" },
              ]}
            >
              {desc}
            </AppText>
            <AppText style={[styles.weather_current_desc, { lineHeight: 40 }]}>
              <AppText
                style={[
                  styles.dateTime,
                  { ...app_typo.fonts.normal.lighter.h5, color: "#FFF" },
                ]}
              >
                Tỉ lê mây:{" "}
                <Text style={styles.weather_current_value}>{humidity}%</Text>
              </AppText>
              <AppText
                style={{ ...app_typo.fonts.normal.bolder.h4, color: "#FFF" }}
              >
                {" "}
                -{" "}
              </AppText>
              <AppText
                style={[
                  styles.dateTime,
                  { ...app_typo.fonts.normal.lighter.h5, color: "#FFF" },
                ]}
              >
                Tốc độ gió:{" "}
                <Text style={styles.weather_current_value}>{wind} km/h</Text>
              </AppText>
            </AppText>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.weather_table_info}>
        {weatherDays.map((day) => {
          return <WeatherDailyBlock day={day} />;
        })}
      </View>
    </ScrollView>
  );
};

export default WeatherScreen;

const weatherDays = [
  {
    day: "thứ ba",
    icon: "rain",
    dailydata: [
      { hours: 0, temperature: 18 },
      { hours: 1, temperature: 19 },
      { hours: 2, temperature: 20 },
      { hours: 3, temperature: 21 },
      { hours: 4, temperature: 22 },
      { hours: 5, temperature: 23 },
      { hours: 6, temperature: 24 },
      { hours: 7, temperature: 25 },
      { hours: 9, temperature: 26 },
      { hours: 10, temperature: 27 },
      { hours: 11, temperature: 27 },
      { hours: 12, temperature: 26 },
      { hours: 13, temperature: 25 },
      { hours: 14, temperature: 24 },
      { hours: 15, temperature: 23 },
    ],
    desc: "ngày có mưa nhẹ - Đêm trong sương mù",
  },
  {
    day: "thứ tư",
    icon: "cloudy",
    dailydata: [
      { hours: 0, temperature: 17 },
      { hours: 1, temperature: 19 },
      { hours: 2, temperature: 20 },
      { hours: 3, temperature: 21 },
      { hours: 4, temperature: 22 },
      { hours: 5, temperature: 23 },
      { hours: 6, temperature: 23 },
      { hours: 7, temperature: 24 },
      { hours: 9, temperature: 25 },
      { hours: 10, temperature: 26 },
      { hours: 11, temperature: 26 },
      { hours: 12, temperature: 25 },
      { hours: 13, temperature: 24 },
      { hours: 14, temperature: 23 },
      { hours: 15, temperature: 22 },
    ],
    desc: "ngày nhiều mây - Đêm có gió nhẹ",
  },
  {
    day: "thứ năm",
    icon: "sunny",
    dailydata: [
      { hours: 0, temperature: 19 },
      { hours: 1, temperature: 21 },
      { hours: 2, temperature: 23 },
      { hours: 3, temperature: 24 },
      { hours: 4, temperature: 25 },
      { hours: 5, temperature: 26 },
      { hours: 6, temperature: 27 },
      { hours: 7, temperature: 28 },
      { hours: 9, temperature: 29 },
      { hours: 10, temperature: 30 },
      { hours: 11, temperature: 31 },
      { hours: 12, temperature: 30 },
      { hours: 13, temperature: 29 },
      { hours: 14, temperature: 28 },
      { hours: 15, temperature: 27 },
    ],
    desc: "ngày đẹp trời - Đêm trong mưa",
  },
  {
    day: "thứ sáu",
    icon: "rain",
    dailydata: [
      { hours: 0, temperature: 20 },
      { hours: 1, temperature: 21 },
      { hours: 2, temperature: 22 },
      { hours: 3, temperature: 23 },
      { hours: 4, temperature: 23 },
      { hours: 5, temperature: 24 },
      { hours: 6, temperature: 25 },
      { hours: 7, temperature: 26 },
      { hours: 9, temperature: 27 },
      { hours: 10, temperature: 27 },
      { hours: 11, temperature: 26 },
      { hours: 12, temperature: 25 },
      { hours: 13, temperature: 24 },
      { hours: 14, temperature: 23 },
      { hours: 15, temperature: 22 },
    ],
    desc: "ngày có mưa - Đêm gió lớn",
  },
  {
    day: "thứ bảy",
    icon: "cloudy",
    dailydata: [
      { hours: 0, temperature: 20 },
      { hours: 1, temperature: 21 },
      { hours: 2, temperature: 22 },
      { hours: 3, temperature: 22 },
      { hours: 4, temperature: 23 },
      { hours: 5, temperature: 24 },
      { hours: 6, temperature: 24 },
      { hours: 7, temperature: 25 },
      { hours: 9, temperature: 26 },
      { hours: 10, temperature: 27 },
      { hours: 11, temperature: 27 },
      { hours: 12, temperature: 26 },
      { hours: 13, temperature: 25 },
      { hours: 14, temperature: 24 },
      { hours: 15, temperature: 23 },
    ],
    desc: "ngày nhiều mây - Đêm có sương mù dày",
  },
  {
    day: "chủ nhật",
    icon: "sunny",
    dailydata: [
      { hours: 0, temperature: 21 },
      { hours: 1, temperature: 23 },
      { hours: 2, temperature: 25 },
      { hours: 3, temperature: 26 },
      { hours: 4, temperature: 27 },
      { hours: 5, temperature: 28 },
      { hours: 6, temperature: 29 },
      { hours: 7, temperature: 30 },
      { hours: 9, temperature: 31 },
      { hours: 10, temperature: 32 },
      { hours: 11, temperature: 31 },
      { hours: 12, temperature: 30 },
      { hours: 13, temperature: 29 },
      { hours: 14, temperature: 28 },
      { hours: 15, temperature: 27 },
    ],
    desc: "ngày đẹp trời - Đêm trong mưa rào",
  },
];
