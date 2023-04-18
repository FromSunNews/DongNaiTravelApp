import { app_c } from "globals/styles";
import React, { Component } from "react";
import { View, Image, StatusBar, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
const { width, height } = Dimensions.get("window");



export default class extends Component {
  render() {

    const banners = [
      {
        uri: "https://res.cloudinary.com/dbtb0sjby/image/upload/v1681802401/cattien_vi-min_hpwzfv.png",
      },
      {
        uri: "https://res.cloudinary.com/dbtb0sjby/image/upload/v1681802378/z4274604337154_4c684a28b00a8fa4bc273dee07d24440-min_h6ycze.jpg",
      },
      {
        uri: "https://res.cloudinary.com/dbtb0sjby/image/upload/v1681802378/z4274603026425_93c337f3c7836a85472e5857ff463fff-min_ajssaq.jpg",
      },
      {
        uri: "https://res.cloudinary.com/dbtb0sjby/image/upload/v1681802399/suoimo_en-min_uk48qt.png",
      },
      
      {
        uri: "https://res.cloudinary.com/dbtb0sjby/image/upload/v1681802378/z4274604000111_d25b95af67a4619a2a50324240bf9abd-min_l4uaff.jpg",
      },
      
    ];
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Swiper
          style={styles.wrapper}
          autoplay
          loop
          dot={
            <View
              style={styles.dot}
            />
          }
          activeDot={
            <View
              style={styles.active_dot}
            />
          }
          paginationStyle={{
            bottom: 10,
          }}
        >
          {
            banners.map((banner,index)=>{
              return(
              <View key={index} style={styles.slide}>
                <Image
                  style={styles.image}
                  source={{uri : banner.uri}}
                  resizeMode="cover"
                />
              </View>
              )
            })
          }
        </Swiper>
      </View>
    );
  }
}

const styles = {
  wrapper: {
    // backgroundColor: '#f00'
  },

  slide: {
    height:200,
    backgroundColor: "transparent",
  },
  container: {
    height:200
  },

  imgBackground: {
    width,
    height,
    backgroundColor: "transparent",
    position: "absolute",
  },

  image: {
    height:200,
  },
  dot:{
    backgroundColor:app_c.HEX.ext_primary ,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  active_dot:{
    backgroundColor: app_c.HEX.third,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
  }
};