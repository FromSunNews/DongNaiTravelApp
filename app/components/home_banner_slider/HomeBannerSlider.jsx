import { app_c } from "globals/styles";
import React, { Component, useEffect, useState } from "react";
import { View, Image, StatusBar, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { languageData } from "../../utilities/language";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");
import { selectCurrentLanguage } from 'redux/language/LanguageSlice'


const HomeBannerSlider = ()=>{

  const langCode = useSelector(selectCurrentLanguage).languageCode // vi or en 
  const [ banners, setBanner ] =  useState([])

  console.log(langCode)

  useEffect(()=>{
    if(langCode === 'vi')
    {
      setBanner(bannersVi)
    }
    if(langCode === 'en')
    {
      setBanner(bannersEn)
    }
  })
  
  return (
    <View style={styles.container}>
      
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

export default HomeBannerSlider
    
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

const bannersVi = [
  {
    uri: "https://res.cloudinary.com/dbtb0sjby/image/upload/v1681829574/banners/z4274604337154_4c684a28b00a8fa4bc273dee07d24440-min_rqpmcq.jpg",
  },
  {
    uri: "https://res.cloudinary.com/dbtb0sjby/image/upload/v1681829447/banners/chuachan_vi_hs3b4n.png",
  },
  {
    uri: "https://res.cloudinary.com/dbtb0sjby/image/upload/v1681829232/banners/dahan_vi_kpo4ml.png",
  },

];
const bannersEn = [
  {
    uri: "https://res.cloudinary.com/dbtb0sjby/image/upload/v1681829574/banners/z4274604000111_d25b95af67a4619a2a50324240bf9abd-min_zmekol.jpg",
  },
  {
    uri: "https://res.cloudinary.com/dbtb0sjby/image/upload/v1681829446/banners/chuachan_en_vxdup4.png",
  },
  {
    uri: "https://res.cloudinary.com/dbtb0sjby/image/upload/v1681829228/banners/dahan_en_cy8rx6.png",
  },
  
];