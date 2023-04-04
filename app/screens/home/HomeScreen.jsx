import { View, Text, Button, TouchableOpacity, FlatList, ScrollView } from "react-native";
import React, { useEffect,useState } from "react";
import { Ionicons, Entypo,Fontisto,FontAwesome5} from "react-native-vector-icons";

import styles from "./HomeScreenStyles";
import { app_c, app_sp, app_typo } from "globals/styles";
import { AppText, HorizontalPlaceCard, RectangleButton,HorizontalBlogCard } from "components";
import TabSlideCategory from "components/tab_slide_category/TabSlideCategory";

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

const HomeScreen = () => {
  const [selectedId, setSelectedId] = useState(0);
  const [selectedIdOptionBlog,setSelectedIdOptionBlog] = useState (0)

  //template
  const [celsius, setCelsius] = useState(31);
  const [fahrenheit, setFahrenheit] = useState('');

  useEffect(()=>{
    const convertedValue = (celsius * 9/5) + 32;
    setFahrenheit(convertedValue.toFixed(0));
  },[celsius])

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId  ? app_c.HEX.fourth : app_c.HEX.ext_primary;
    const color = item.id === selectedId ? app_c.HEX.ext_primary : app_c.HEX.fourth;
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

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
              <AppText style={styles.temperature_degrees_info}>{`${celsius}°C - ${fahrenheit}°F`}</AppText>
            </View>
            <View style={styles.temperature_other_info}>
              <AppText numberOfLines={1} style={{...app_typo.fonts.normal.normal.sub1,paddingVertical:1}}><Fontisto name='wind' size={13} color={app_c.HEX.ext_second}/>{` `+ `15 km/h`}</AppText>
              <AppText style={{...app_typo.fonts.normal.normal.sub1,paddingVertical:1}}><FontAwesome5 name='cloud-rain' size={15} color={app_c.HEX.ext_second}/>{` `+ `Rain`}</AppText>
            </View>
          </View>
          <TouchableOpacity style={styles.temperature_reload}>
            <Ionicons name="reload-sharp" size={30} color={app_c.HEX.fourth} />
          </TouchableOpacity>
        </View>
        <View style={styles.home_category}>
          <TouchableOpacity style={styles.category_header} >
            <AppText style={styles.category_name}>Place</AppText>
              <AppText><Entypo name="chevron-small-right" size={30}/></AppText>
          </TouchableOpacity>

          <View style={{paddingVertical:20}}>
            <TabSlideCategory />
          </View>

          <View style={{paddingVertical:20}}>
            <TabSlideCategory />
          </View>
          <ScrollView style={styles.category_list_item} horizontal={true} showsHorizontalScrollIndicator={false}>
            {
              listPlaces.map(place=>(
                <HorizontalPlaceCard place={place} key={place.id}/>
              ))
            }
          </ScrollView>

        </View>
        <View style={styles.home_category}>
          <TouchableOpacity style={styles.category_header} >
            <AppText style={styles.category_name}>Blog</AppText>
              <AppText><Entypo name="chevron-small-right" size={30}/></AppText>
          </TouchableOpacity>
          <View style={styles.category_option_list}>
            <FlatList
              horizontal={true}
              data={listOptionBlog}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              extraData={selectedId}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <ScrollView style={styles.category_list_item}  showsHorizontalScrollIndicator={false}>
            {
              listBlogs.map(blog=>(
                <HorizontalBlogCard blog={blog} key={blog.id.toString()} />
              ))
            }
            <FlatList/>
          </ScrollView>

        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
