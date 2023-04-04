import { View, Text, TouchableOpacity, FlatList, ScrollView} from "react-native";
import React, { useState, useEffect } from "react";

import { app_c, app_sp } from "globals/styles";
import { AppText, HorizontalPlaceCard} from "components";
import styles from "./TabSlideCategoryStyle";


const tabPlaceOptions = [
  {
    id: 0,
    name: "All",
  },
  {
    id: 1,
    name: "Recommended",
  },
  {
    id: 2,
    name: "Popular",
  },
  {
    id: 3,
    name: "Most Star",
  },
  {
    id: 4,
    name: "Park",
  },
  {
    id: 5,
    name: "Walking Street",
  },
];

const fakeDataPlaces = [
  {
    id: "1a",
    name: "Pho di bo",
    avatar:
      "https://lh3.googleusercontent.com/p/AF1QipPoYDJXCAlOR3Oc0RgjhQ5WBZt9s2VkvqpbbuNN=s680-w680-h510",
    location: {
      province: "Dong Nai",
      city: "Bien Hoa",
    },
    tags: [
      {
        title: "Walking",
      },
      {
        title: "Exercise",
      },
    ],
    ratingPoints: 4.3,
    numberOfReviews: 300,
    numberOfVisited: 3200,
    isRecommended: false,
    isVisited: false,
  },
];


const TabSlideCategory = () => {
  const [tab, setTab] = useState("All");
  const [post, setPost] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [background, setBackground] = useState(...app_c.HEX.fourth);

  const handlePressTab = ({ tab }) => {
    setTab(tab);
    setSelectedId(tab.id);
    console.log(tab.name);
  };
  console.log(selectedId);

  useEffect(() => {
    const result = fakeDataPlaces.map(
      (place, index) => {
        setPost(result);
      },
      [tab]
    );
  }, [tab]);

  const getButtonStyle = (buttonId) => {
    if (buttonId === selectedId) {
      return styles.active;
    }
    return styles.tab;
  };

  const colorText = (buttonId) =>{
    if(buttonId ===selectedId)
    {
      return styles.text_active
    }
    return styles.text_normal
  }

  return (
    <View>
      <ScrollView style={{ flexDirection: "row" }} horizontal={true} showsHorizontalScrollIndicator={false}>
        {tabPlaceOptions.map((tab, index) => {
          return (
            <TouchableOpacity
              style={[getButtonStyle(tab.id),{  marginLeft: index !== 0 ? 10 : 0,}]}
              key={tab.id}
              onPress={() => handlePressTab({ tab })}
            >
              <AppText style={colorText(tab.id)}>{tab.name}</AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={{...app_sp.pt_12}}>
        {
          fakeDataPlaces.map(place=>(
            <HorizontalPlaceCard place={place}/>
          ))
        }
      </View>
    </View>
  );
};

export default TabSlideCategory;
