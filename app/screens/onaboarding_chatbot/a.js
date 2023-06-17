import { app_c, app_shdw, app_typo } from 'globals/styles';
import WeatherChart from 'libs/react-native-weather-chart';
import React from 'react';
import { Image } from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import { weatherIcons } from 'utilities/mapdata';

const Data = {
  values: [23, 24, 25, 20, 15],
  textTop: ['13:00', '16:00', '19:00', '21:00', '23:00'],
  textBottom: ['23°', '24°', '25°', '20°', '15°'],
  iconBottom: ['01d', '02d', '03d', '04n', '01d'],
};

const Settings = {
  showTextTop: true,
  showTextBottom: true,
  showIconTop: false,
  showIconBottom: true,
  // showVerticalLines: true,
  colSpace: 80,
  lineColor: app_c.HEX.ext_third,
  vlineColor: app_c.HEX.ext_third,
  topTextColor: app_c.HEX.fourth,
  bottomTextColor: app_c.HEX.fourth,
  // markerFillColor: app_c.HEX.ext_third,
  markerStrokeColor: app_c.HEX.ext_third,
  noDataTextColor: app_c.HEX.fourth,
  iconTopColor: app_c.HEX.fourth,
  iconBottomColor: app_c.HEX.fourth,
  iconSize: 30
};

const OnboardingChatbot = () => {
  return (
    <View style={styles.viewChart}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10
      }}>
        <Image source={weatherIcons['10d']} 
        style={{
          height: 80,
          width: 80,
          ...app_shdw.type_1,
          marginLeft: -5,
        }}/>
        <View>
          <Text 
            style={{
              color: app_c.HEX.ext_second,
              ...app_typo.fonts.normal.normal.h3,
            }}
          >30°C</Text>
          <Text
            style={{
              color: app_c.HEX.ext_third,
              ...app_typo.fonts.normal.normal.h5,
            }}
          >Mây đen mù mịt</Text>
        </View>
      </View>
      <WeatherChart data={Data} settings={Settings} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewChart: {
    backgroundColor: app_c.HEX.primary,
    margin: 10,
    height: 250,
    marginTop: 400,
    marginBottom: 20
  },
});

export default OnboardingChatbot;