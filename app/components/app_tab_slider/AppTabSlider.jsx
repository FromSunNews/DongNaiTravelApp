import { View, Animated, ScrollView, FlatList } from 'react-native'
import React, { useCallback } from 'react'

import StringUtility from 'utilities/string'

import AppText from '../app_text/AppText'
import RectangleButton from '../buttons/RectangleButton'

import styles from './AppTabSliderStyles'
import { app_dms } from 'globals/styles'

// Để hiểu hơn về component này thì đọc bài này:
// Link: https://docs.google.com/document/d/1S9RUWqudJ-djqsEA5zzzJU8l2HL5Z3dCQQlUaTJZNvY/edit#

const SlideScroll = ({ children }) => {
  return (
    <ScrollView
      style={styles.slide_container}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  )
}

const SlideView = ({ children }) => {
  return (
    <View style={styles.slide_container}>
      {children}
    </View>
  )
}

/**
 * @typedef TabSliderProps
 * @property {JSX.Element[]} props.children Children này là một tổ hợp AppTabSlider.Slide.
 * @property {number} [props.lineIndexTranslateXStart=20] Thuộc tính này dùng để setup ví trí bắt đầu cho slide index để animation (translateX animation).
 * @property {number} [props.slideTranslateXStart=100] Thuộc tính này dùng để setup ví trí bắt đầu cho slide index để animation (translateX animation).
 * @property {boolean} [isSliderContainerScrollable=false] Thuộc tính này cho biết là AppTabSlider có scroll được hay không?
 */

/**
 * @typedef ScrollInfo
 * @property {number} previousScrollToCenter Gía trị để scroll button trước về giữa.
 * @property {number[]} scrollToXList Danh sách giá trị để scroll button về giữa.
 * @property {number} prevSlideIndex Chỉ mục của index trước.
 * @property {number} tabButtonScrollContainerWidth Chỉ mục của index trước.
 * @property {boolean} isSliderButtonPress Button có được ấn hay chưa.
 * @property {boolean} isFirstRender Có phải là first render không? Dùng để tránh animation lần đầu render.
 */

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Trả về một Slider, có thể scroll hoặc không bằng cách set up thuộc tính `isSliderContainerScrollable`
 * @param {TabSliderProps} props - Props của component.
 * @returns `AppTabSlider`
 */
const AppTabSlider = ({
  children,
  lineIndexTranslateXStart = 20,
  slideTranslateXStart = 100,
  isSliderContainerScrollable = false
}) => {
  if(!children) return null;
  if(!children.length) return children;

  const SlideContainer = React.useMemo(() => isSliderContainerScrollable ? SlideScroll : SlideView, [isSliderContainerScrollable])

  const [currentSlideIndex, setSlideIndex] = React.useState(0);
  const scrollRef = React.useRef(null);
  const sliderInfoRef = React.useRef({
    previousScrollToCenter: 0,
    scrollToXList: [],
    prevSlideIndex: 0,
    tabButtonScrollContainerWidth: 0,
    isSliderButtonPress: false,
    isFirstRender: true
  });

  const listSlideName = React.useMemo(() => {
    return children.map(child => (
      child.type.name === "Slide" && child.props.name !== "" && child.props.name
      ? child.props.name
      : null
    ))
  }, [children]);

  const handlePressTabSlider = React.useCallback((slideIndex) => {
    return function() {
      sliderInfoRef.current.isSliderButtonPress = true;
      setSlideIndex(prevState => {
        sliderInfoRef.current.prevSlideIndex = prevState;
        return slideIndex;
      });
    }
  }, [listSlideName]);

  const direction = currentSlideIndex > sliderInfoRef.current.prevSlideIndex ? 1 : (-1);
  const lineTranslateAmin = new Animated.Value(lineIndexTranslateXStart * direction * -1);
  const translateAnim = new Animated.Value(slideTranslateXStart * direction);
  const opacityAnim = new Animated.Value(0);

  if(sliderInfoRef.current.isFirstRender) {
    translateAnim.setValue(0);
    lineTranslateAmin.setValue(0);
    opacityAnim.setValue(1);
  }

  if(sliderInfoRef.current.isSliderButtonPress) {
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  
    Animated.timing(lineTranslateAmin, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start();
  
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true
    }).start();
    
    if(scrollRef.current && currentSlideIndex !== 0) {
      scrollRef.current.scrollTo(
        {
          x: sliderInfoRef.current.scrollToXList[currentSlideIndex],
          y: 0,
          animated: true
        }
      )
    } else if(scrollRef.current && currentSlideIndex === 0) {
      scrollRef.current.scrollTo({x: 0, y: 0, animated: true})
    }
  }

  sliderInfoRef.current.isSliderButtonPress = false;
  sliderInfoRef.current.isFirstRender = false;

  return (
    <View style={styles.slider_container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.slider_button_container}
        overScrollMode="never"
        onLayout={e => {
          const {width} = e.nativeEvent.layout;
          console.log("Slider's width: ", width);
          sliderInfoRef.current.tabButtonScrollContainerWidth = width;
        }}
      >
        {
          listSlideName.map((slideName, index) =>
            slideName ? (
              <View
                key={slideName + 'container'}
                onLayout={e => {
                  const { x, width } = e.nativeEvent.layout;
                  setTimeout(() => {
                    const snapItemPosition = (sliderInfoRef.current.tabButtonScrollContainerWidth / 2)
                    const distanceFromXToSnapPosition = x - snapItemPosition;
                    const halfWidthOfButton = (width / 2);
                    const distanceForScrollingToCenterButton = distanceFromXToSnapPosition + halfWidthOfButton;
                    sliderInfoRef.current.scrollToXList[index] = distanceForScrollingToCenterButton;
                    console.log(`Button ${slideName}: ${distanceFromXToSnapPosition}, x: ${x}, center: ${distanceForScrollingToCenterButton}, slider'width: ${sliderInfoRef.current.tabButtonScrollContainerWidth}`);
                  }, 0);
                }}
              >
                <RectangleButton
                  isTransparent
                  key={slideName + 'button'}
                  onPress={handlePressTabSlider(index)}
                >
                  {(isActive, currentLabelStyle) => (
                    <AppText style={currentLabelStyle} weight="lighter" font="h5">{StringUtility.toTitleCase(slideName)}</AppText>
                  )}
                </RectangleButton>
                <Animated.View
                  key={slideName + 'line'}
                  style={{
                    ...(index === currentSlideIndex ? styles.line_index : {}),
                    transform: [
                      { translateX: lineTranslateAmin }
                    ],
                  }}
                ></Animated.View>
              </View>
            )
            : null
          )
        }
      </ScrollView>
      <SlideContainer style={styles.slide_container}>
        <Animated.View
          style={{
            transform: [
              { translateX: translateAnim }
            ],
            opacity: opacityAnim
          }}
        >
          {
            children[currentSlideIndex]
          }
        </Animated.View>
      </SlideContainer>
    </View>
  )
}

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Component này sẽ giúp chúng ta tạo ra một slider cho một screen.
 * @param {object} props - Props của component.
 * @param {string} props.name - Tên của Slide.
 * @param {() => JSX.Element} props.component - Function trả về component mà muốn làm thành slide.
 * @returns 
 */
const Slide = ({
  name,
  component
}) => {
  return component();
}

AppTabSlider.Slide = Slide;

export default AppTabSlider