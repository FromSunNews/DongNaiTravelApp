import { View, Text, Button, TouchableOpacity, FlatList, ScrollView } from "react-native"
import React, { useEffect,useState } from "react"
import { Ionicons, Entypo,Fontisto,FontAwesome5,MaterialCommunityIcons} from "react-native-vector-icons"

import styles from "./HomeScreenStyles"
import { app_c, app_sp, app_typo } from "globals/styles"
import { 
  AppText, 
  HorizontalPlaceCard, 
  RectangleButton,
  HorizontalBlogCard,
  TypeScrollView,
  VerticalBlogCardSkeleton,
  VerticalBlogCard,
  VerticalPlaceCard,
  VerticalPlaceCardSkeleton,
} from "components"
import TabSlideCategoryPlace from "components/tab_slide_category_place/TabSlideCategoryPlace"
import TabSlideCategoryBlog from "components/tab_slide_category_blog/TabSlideCategoryBlog"

import { getWeatherCurrentAPI } from "request_api"
import * as Location from "expo-location"
import { useSelector } from "react-redux"
import { selectCurrentMap } from "redux/map/mapSlice"

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
  const [typePlace, setTypePlace] = React.useState("");
  const [typeBlog, setTypeBlog] = React.useState("");
  const [currentPlaces, setCurrentPlaces] = React.useState([]);
  const [currentBlogs, setCurrentBlogs] = React.useState([]);

  React.useEffect(() => {
    setTimeout(() => {
      setCurrentBlogs([...blogs]);
      setCurrentPlaces([...places]);
    }, 2000);
  }, []);

  console.log('ChoseTypeOfPlace: '+ typePlace)
  console.log('ChoseTypeOfBlog: '+ typeBlog)
  // const [location,setLocation] = useState(null)  
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  
  const getCurrentWeather= async (location)=>{

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.home_content}>
        <View style={styles.home_banner}>
          <Text>
            Ở đây có thể là lời chào hoặc là banner quảng cáo 1 cái place nào đó
            hay sự kiện gì đó ở một địa điểm nào đó
          </Text>
        </View>

        {
          showPanelWeather &&
          <View style={styles.home_temperature}>
            <View style={styles.temperature}>
              <View style={styles.temperature_degrees}>
                {
                  celsius  ? (
                    <AppText style={[styles.temperature_degrees_info,{fontSize:22,marginTop:-4}]}>{`${celsius}°C`}</AppText>
                  ): <AppText style={[styles.temperature_degrees_info,{fontSize:22,marginTop:-4}]}><Entypo name="minus"/><Entypo name="minus"/>{`°C`}</AppText>
                }
                {
                  desWeather ? (
                    <AppText numberOfLines={2}  style={[styles.temperature_degrees_info,{fontSize:13,paddingHorizontal:4,textAlign:"center"}]}>{capitalizeFirstLetter(desWeather)}</AppText>
                  ) : <AppText numberOfLines={2}  style={[styles.temperature_degrees_info,{fontSize:13,paddingHorizontal:4,textAlign:"center"}]}>Đang tải...</AppText>
                }
              </View>
              <View style={styles.temperature_other_info}>
                <View style={[styles.temperature_other_info_half]}>
                  <View style={styles.temperature_other_info_quarter}>
                    <Fontisto name='wind' size={14} color={app_c.HEX.ext_second}/>
                    {
                      wind ?(
                      <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub0,paddingHorizontal:8}}>{`${wind}`}<Text style={{fontSize:12}}>km/h</Text></AppText>
                      ) :  <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub0,marginTop:4}}><Entypo name="minus"/><Entypo name="minus"/><Text style={{fontSize:12}}>km/h</Text></AppText>
                    }
                  </View>
                  <View style={[styles.temperature_other_info_quarter,{ paddingLeft:12}]}>
                        <Entypo name='water' size={15} color={app_c.HEX.ext_second}/>
                        {
                          humidity ? (
                            <AppText style={{...app_typo.fonts.normal.normal.sub0,paddingHorizontal:8}}>{`${humidity}`}<Text style={{fontSize:12}}>%</Text></AppText>
                          ) :  <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub0,marginTop:4}}><Entypo name="minus"/><Entypo name="minus"/><Text style={{fontSize:12}}>%</Text></AppText>
                        }
                  </View>
                </View>
                <View style={styles.temperature_other_info_half}>
                  <View style={styles.temperature_other_info_quarter}>
                    <Entypo name='cloud' size={15} color={app_c.HEX.ext_second}/>
                    {
                      cloud ? (
                        <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub0,paddingHorizontal:8}}>{`${cloud}`+`%`}</AppText>
                      ) :  <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub0,marginTop:4}}><Entypo name="minus"/><Entypo name="minus"/><Text style={{fontSize:12}}>%</Text></AppText>
                    }
                  </View>
                  <View style={[styles.temperature_other_info_quarter,{paddingLeft:12}]}>
                      <MaterialCommunityIcons name='weather-fog' size={15} color={app_c.HEX.ext_second}/>
                      {
                        vision ? (
                          <AppText style={{...app_typo.fonts.normal.normal.sub0,paddingHorizontal:8}}>{`${vision.toFixed(1)}`}<Text style={{fontSize:12}}>km</Text></AppText>
                        ) :  <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub0,marginTop:4}}><Entypo name="minus"/><Entypo name="minus"/><Text style={{fontSize:12}}>km</Text></AppText>
                      }
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.temperature_reload} onPress={handleReloadLocation}>
              <Ionicons name="reload-sharp" size={30} color={app_c.HEX.fourth} />
            </TouchableOpacity>
          </View>
        }

        {/* Place and Blog*/}
        <View style={styles.home_category}>
          <TouchableOpacity style={styles.category_header} onPress={()=>navigation.navigate("ExploreScreen")}>
            <AppText style={styles.category_name}>Place</AppText>
            <AppText><Entypo name="chevron-small-right" size={40}/></AppText>
          </TouchableOpacity>
          <TypeScrollView
            types='all;recommended;popular;most_visit;most_favorite'
            callBack={setTypePlace}
            scrollStyle={[{paddingLeft:16}, app_sp.pv_12]}
            containerStyle={{backgroundColor: app_c.HEX.primary,  }}
          />
          <View style={{ ...app_sp.mb_12}}>
            <ScrollView horizontal={true} style={{paddingBottom:10, paddingLeft:16}} showsHorizontalScrollIndicator={false}>
              {
                currentPlaces.length === 0
                ? [1, 2, 3].map((value, index) => <VerticalPlaceCardSkeleton key={value + index} style={{ marginLeft: index !== 0 ? 16 : 0,}}/>)
                : currentPlaces.map((place, index) => 
                  <TouchableOpacity onPress={()=>navigation.navigate("PlaceDetailScreen")}>
                    <VerticalPlaceCard place={place} key={place.id} style={{ marginLeft: index !== 0 ? 16 : 0, marginRight : currentPlaces.length - 1 === index ? 36 : 0}}/>
                  </TouchableOpacity>)
              }
            </ScrollView>
          </View>
        </View>
        <View style={styles.home_category}>
          <TouchableOpacity style={styles.category_header} onPress={()=>navigation.navigate("BlogsScreen")}>
            <AppText style={styles.category_name}>Blog</AppText>
            <AppText><Entypo name="chevron-small-right" size={40}/></AppText>
          </TouchableOpacity>
          <TypeScrollView
            types='all;newest;popular;most_like;most_comments'
            callBack={setTypeBlog}
            scrollStyle={[{paddingLeft:16}, app_sp.pv_12]}
            containerStyle={{backgroundColor: app_c.HEX.primary}}
          />
          <View style={{ ...app_sp.mb_12}}>
            <ScrollView horizontal={true} style={{paddingBottom:10,paddingLeft:16}} showsHorizontalScrollIndicator={false}>
              {
                currentBlogs.length === 0
                ? [1, 2, 3].map((value, index) => <VerticalBlogCardSkeleton key={value + index} style={{  marginLeft: index !== 0 ? 16 : 0,}} />)
                : currentBlogs.map((blog, index) => 
                  <TouchableOpacity onPress={()=>navigation.navigate("BlogDetailScreen")}>
                    <VerticalBlogCard blog={blog} key={blog.id} style={{ marginLeft: index !== 0 ? 16 : 0, marginRight : currentBlogs.length - 1 === index ? 36 : 0}}/>
                  </TouchableOpacity>
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

const places = [
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
    id: '1b',
    name: 'Quang truong tinh',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipPUoQ-BfuMVqLUZog0RrNnF4HVrFLXlXLQ4wak2=s680-w680-h510',
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
    ratingPoints: 4.6,
    numberOfReviews: 5687,
    numberOfVisited: 32242,
    isRecommended: true,
    isVisited: true
  },
  {
    id: '1c',
    name: 'Cong vien Tam Hiep',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipOFHqO2nUTvyj0fYEvwt-9AHoQS8e5yajbKLjQE=s680-w680-h510',
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
    ratingPoints: 3.7,
    numberOfReviews: 1687,
    numberOfVisited: 2242,
    isRecommended: false,
    isVisited: false
  },
  {
    id: '1d',
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
    id: '1e',
    name: 'Quang truong tinh',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipPUoQ-BfuMVqLUZog0RrNnF4HVrFLXlXLQ4wak2=s680-w680-h510',
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
    ratingPoints: 4.6,
    numberOfReviews: 5687,
    numberOfVisited: 32242,
    isRecommended: true,
    isVisited: true
  },
  {
    id: '1f',
    name: 'Cong vien Tam Hiep',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipOFHqO2nUTvyj0fYEvwt-9AHoQS8e5yajbKLjQE=s680-w680-h510',
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
    ratingPoints: 3.7,
    numberOfReviews: 1687,
    numberOfVisited: 2242,
    isRecommended: false,
    isVisited: false
  }
]

const blogs = [
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
      id: 'user2',
      name: 'Du Lich Bui',
      avatar: ''
    },
    name: 'Nhung con duong nhon nhip nhat o Dong Nai',
    avatar: '',
    createdAt: 1675217313000,
    readTime: 300,
    isLiked: false
  },
  {
    id: 'b3',
    user: {
      id: 'user3',
      name: 'Bac Thay Du Lich',
      avatar: ''
    },
    name: 'Cac quan an hap dan nen thu khi den Dong Nai',
    avatar: '',
    createdAt: 1674353313000,
    readTime: 300,
    isLiked: false
  }
]