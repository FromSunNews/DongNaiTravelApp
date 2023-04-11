import { View, Text, Button, TouchableOpacity, FlatList, ScrollView } from "react-native";
import React, { useEffect,useState } from "react";
import { Ionicons, Entypo,Fontisto,FontAwesome5,MaterialCommunityIcons} from "react-native-vector-icons";

import styles from "./HomeScreenStyles";
import { app_c, app_sp, app_typo } from "globals/styles";
import { AppText, HorizontalPlaceCard, RectangleButton,HorizontalBlogCard } from "components";
import TabSlideCategoryPlace from "components/tab_slide_category_place/TabSlideCategoryPlace";
import TabSlideCategoryBlog from "components/tab_slide_category_blog/TabSlideCategoryBlog";

import { getWeatherCurrentAPI } from "request_api";
import * as Location from "expo-location";
 
const listOptionPlace = [
  {
    id: 0,
    title: "All",
  },
  {
    id: 1,
    title: "Recommended",
  },
  {
    id: 2,
    title: "Popular",
  },
  {
    id: 3,
    title: "Most Visited",
  },
  {
    id: 4,
    title: "Perfect Star",
  },
];

const listOptionBlog=[
  {
    id: 0,
    title: "All",
  },
  {
    id: 1,
    title: "Recommended",
  },
  {
    id: 2,
    title: "Popular",
  },
  {
    id: 3,
    title: "Perfect Star",
  },
]


const listPlaces=[
  {
    id: '1a',
    name: 'Pho di bo',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipPoYDJXCAlOR3Oc0RgjhQ5WBZt9s2VkvqpbbuNN=s680-w680-h510',
    location: {
      province: 'Dong Nai',
        city: 'Bien Hoa'
      },
    tags: [
      {
        title: 'Walking'
      },
      {
        title: 'Exercise'
      }
    ],
    ratingPoints: 4.3,
    numberOfReviews: 300,
    numberOfVisited: 3200,
    isRecommended: false,
    isVisited: false
  },
  {
    id: '2a',
    name: 'Pho di bo',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipPoYDJXCAlOR3Oc0RgjhQ5WBZt9s2VkvqpbbuNN=s680-w680-h510',
    location: {
      province: 'Dong Nai',
        city: 'Bien Hoa'
      },
    tags: [
      {
        title: 'Walking'
      },
      {
        title: 'Exercise'
      }
    ],
    ratingPoints: 4.3,
    numberOfReviews: 300,
    numberOfVisited: 3200,
    isRecommended: false,
    isVisited: false
  }
]

const listBlogs=[
  {
    id: 'b1',
    user: {
      id: 'user1',
      name: 'Lost Teach',
      avatar: ''
    },
    name: 'Top 10 dia diem neu ghe qua khi du lich o Dong Nai',
    avatar: '',
    createdAt: 1675908513000,
    readTime: 480,
    isLiked: true
  },
  {
    id: 'b2',
    user: {
      id: 'user1',
      name: 'Lost Teach',
      avatar: ''
    },
    name: 'Top 10 dia diem neu ghe qua khi du lich o Dong Nai',
    avatar: '',
    createdAt: 1675908513000,
    readTime: 480,
    isLiked: true
  },
]

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor , marginLeft: item.id !== 0 ? 10 : 0 }]}
  >
    <AppText style={[styles.title, { color: textColor }]}>{item.title}</AppText>
  </TouchableOpacity>
);



const HomeScreen = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(0);
  const [selectedIdOptionBlog,setSelectedIdOptionBlog] = useState (0)

  //template
  const [celsius, setCelsius] = useState(null);
  const [desWeather, setDesWeather] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [cloud, setCloud] = useState(null);
  const [vision, setVision] = useState(null);
  const [wind, setWind] = useState(null);
  const [location,setLocation] = useState(null)  
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  const getCurrentWeather= async ()=>{
    const location={
      "longitude": 106.477261,
      "latitude": 10.437055
  }
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

  // const getCurrentLocationAsync = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     console.log("Permission denied");
  //     return;
  //   }
  //   let location = await Location.getCurrentPositionAsync({});
  //   setLocation(location);
  // };

  const handleReloadLocation = ()=>{
    getCurrentWeather()
    console.log(123)
  }


  console.log(celsius)

  console.log(humidity)
  console.log(wind)
  console.log(cloud)
  console.log(vision)
  console.log(desWeather)
  // console.log(location)

  useEffect(()=>{
    getCurrentWeather()
    // getCurrentLocationAsync()
  },[])


 
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.home_content}>
        <View style={styles.home_banner}>
          <Text>
            Ở đây có thể là lời chào hoặc là banner quảng cáo 1 cái place nào đó
            hay sự kiện gì đó ở một địa điểm nào đó
          </Text>
        </View>
        <View style={styles.home_temperature}>
          <View style={styles.temperature}>
            <View style={styles.temperature_degrees}>
              {
                celsius !== null && (
                  <AppText style={styles.temperature_degrees_info}>{`${celsius}°C`}</AppText>
                )
              }
              {
                desWeather !== null && (
                  <AppText style={[styles.temperature_degrees_info,{fontSize:16}]}>{capitalizeFirstLetter(desWeather)}</AppText>
                )
              }
            </View>
            <View style={styles.temperature_other_info}>
              <View style={[styles.temperature_other_info_half]}>
                <View style={styles.temperature_other_info_quarter}>
                  <Fontisto name='wind' size={15} color={app_c.HEX.ext_second}/>
                  {
                    wind !== null && (
                    <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub0,paddingHorizontal:8,}}>{`${wind}`+`km/h`}</AppText>
                    )
                  }
                </View>
                <View style={styles.temperature_other_info_quarter}>
                      <Entypo name='water' size={15} color={app_c.HEX.ext_second}/>
                      {
                        humidity !== null && (
                          <AppText style={{...app_typo.fonts.normal.normal.sub0,paddingHorizontal:8}}>{`${humidity}`+`%`}</AppText>
                        )
                      }
                </View>
              </View>
              <View style={styles.temperature_other_info_half}>
                <View style={styles.temperature_other_info_quarter}>
                  <Entypo name='cloud' size={15} color={app_c.HEX.ext_second}/>
                  {
                    cloud !== null && (
                      <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub0,paddingHorizontal:8}}>{`${cloud}`+`km/h`}</AppText>
                    )
                  }
                </View>
               <View style={styles.temperature_other_info_quarter}>
                  <MaterialCommunityIcons name='weather-fog' size={15} color={app_c.HEX.ext_second}/>
                  {
                    vision !== null && (
                      <AppText style={{...app_typo.fonts.normal.normal.sub0,paddingHorizontal:8}}>{`${vision}`+`km`}</AppText>
                    )
                  }
               </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.temperature_reload} onPress={handleReloadLocation}>
            <Ionicons name="reload-sharp" size={30} color={app_c.HEX.fourth} />
          </TouchableOpacity>
        </View>

        {/* Place and Blog*/}
        <View style={styles.home_category}>
          <TouchableOpacity style={styles.category_header} onPress={()=>navigation.navigate("ExploreScreen")}>
            <AppText style={styles.category_name}>Place</AppText>
            <AppText><Entypo name="chevron-small-right" size={40}/></AppText>
          </TouchableOpacity>
          <View style={{paddingVertical:12}}>
            <TabSlideCategoryPlace />
          </View>
        </View>
        <View style={styles.home_category}>
          <TouchableOpacity style={styles.category_header} onPress={()=>navigation.navigate("BlogsScreen")} >
            <AppText style={styles.category_name}>Blog</AppText>
            <AppText><Entypo name="chevron-small-right" size={40}/></AppText>
          </TouchableOpacity>
          <View style={{paddingVertical:12}}>
            <TabSlideCategoryBlog />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
