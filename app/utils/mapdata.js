const Images = [
  { image: require('../assets/images/food1.jpg') },
  { image: require('../assets/images/food2.jpg') },
  { image: require('../assets/images/food3.jpg') },
  { image: require('../assets/images/food4.jpg') },
  { image: require('../assets/images/food5.jpg') },
]

export const markers = [
  {
    id: '1',
    coordinate: {
      latitude: 10.9702918,
      longitude: 106.8903411,
    },
    title: 'Công Viên 30/4',
    description: 'Công viên nhỏ rợp bóng cây có đài phun nước, khu vui chơi, những bờ rào và lối đi tạo hình.',
    image: Images[0].image,
    rating: 4,
    reviews: 99,
  },
  {
    id: '2',
    coordinate: {
      latitude: 10.9722587,
      longitude: 106.8871971,
    },
    title: 'Mì Trộn Tóp Mỡ Lòng Đào 3CE',
    description: 'Mì trộn ngon nhất trảng dài',
    image: Images[1].image,
    rating: 5,
    reviews: 102,
  },
  {
    id: '3',
    coordinate: {
      latitude: 10.9727022,
      longitude: 106.8851312
    },
    title: 'ZEN Tea',
    description: 'Thức uống đa dạng có chỗ để xe thoáng mát',
    image: Images[2].image,
    rating: 3,
    reviews: 220,
  },
  {
    id: '4',
    coordinate: {
      latitude: 10.9726842,
      longitude: 106.8843364,
    },
    title: 'Ốc Ngon Hố Nai',
    description: 'Quán sạch sẽ thoáng mát, nhân viên phục vụ nhiệt tình, dễ thương.',
    image: Images[3].image,
    rating: 4,
    reviews: 48,
  },
  {
    id: '5',
    coordinate: {
      latitude: 10.9742864,
      longitude: 106.8800162,
    },
    title: 'Bún đậu Ông Nghĩa',
    description: 'Đồ ăn ngon, đảm bảo vệ sinh, quán sạch sẽ, nhân viên nhiệt tình và phục vụ nhanh.',
    image: Images[3].image,
    rating: 4,
    reviews: 178,
  },
]

export const mapDarkStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121'
      }
    ]
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c'
      }
    ]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d'
      }
    ]
  }
]

export const mapStandardStyle = [
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
]