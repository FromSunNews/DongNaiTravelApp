import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef } from 'react'

import { styles } from './ExploreScreenStyles'
import { useState } from 'react'
import { app_c } from 'globals/styles'
import { fonts } from 'globals/styles/typography'
import { useEffect } from 'react'
import { socketIoInstance } from '../../../App'
import { useSelector } from 'react-redux'
import { selectCurrentUser, selectTemporaryUserId } from 'redux/user/UserSlice'
import Animated, { Easing, EasingNode, Value } from 'react-native-reanimated'

const ExploreScreen = () => {
  const user = useSelector(selectCurrentUser)
  const temporaryUserId = useSelector(selectTemporaryUserId)

  console.log("🚀 ~ file: ExploreScreen.jsx:17 ~ ExploreScreen ~ user:", user)
  const [value, setValue]= useState('')
  const [showBlinkingCusor, setShowBlinkingCusor] = useState(false)
  let messageFull = ''
  const [isVisible, setIsVisible] = useState(true)
  const intervalRef = useRef()

  const handleBlinkingAnimation = () => {
    intervalRef.current = setInterval(() => {
      console.log('blinking animation')
      setIsVisible((prev) => !prev);
    },500);

    return () => clearInterval(intervalRef.current);
  }

  const stopBlinkingAnimation = () => {
    clearInterval(intervalRef.current)
  }
  useEffect(() => {
    // Lắng nghe sự kiện trả về
    socketIoInstance.on('s_create_travel_itinerary', (data) => {
      if (data.messageReturn !== 'DONE') {
        messageFull += data.messageReturn 
        setValue(messageFull)
      } else {
        stopBlinkingAnimation()
        setShowBlinkingCusor(false)
      }
    })
  }, [])

  // const content = "Generate a personalized travel itinerary for a trip to Đồng Nai capital in Việt Nam with a budget of 5 million VND. The traveler is interested in a couple's vacation and enjoys history, art, food, and photography. They are looking for hotel accommodations and prefer motorbike transportation. The itinerary should include nightlife, museums, outdoor activities, and Vietnam dining options. Please provide a detailed itinerary with daily recommendations for 5 days, including suggested destinations, activities, and dining options. Itineraries should be written in Tiếng Việt using pictures and links to articles about places. Format your response using Markdown. Use headings, subheadings, bullet points, and bold to organize the information."
  // const content = "Generate a personalized travel itinerary for a trip to Ha noi capital in Việt Nam with a budget of 5 million VND. The traveler is interested in a couple's vacation and enjoys history, art, food, and photography. They are looking for hotel accommodations and prefer motorbike transportation. The itinerary should include nightlife, museums, outdoor activities, and Vietnam dining options. Please provides a detailed schedule with daily recommendations for 5 days divided into morning, noon, afternoon, evening, including suggested destinations, activities, and dining options and provide the name of the place in between [] and put it at the end of the sentence. The itinerary should be written in vietnamese. Format your response using Markdown. Use headings, subheadings, bullet points, and bold to organize the information."
  // const content = "Đóng vai hướng dẫn viên du lịch có nhiệm vụ cung cấp cho khách du lịch những thông tin liên quan về điểm đến của họ. Kỹ năng giao tiếp và dịch vụ khách hàng của bạn rất xuất sắc. Tôi có chuyến đi bằng bus từ Đồng Nai đến Đà Lạt và ở đó trong 5 ngày. Hãy tư vấn cho tôi lộ trình từ lúc xuất phát cho đến lúc về, và các địa điểm tham quan du lịch (trả về địa chỉ cụ thể cho từng nơi bạn trả về). Hãy cung cấp khung giờ gian biểu để tôi đi tham quan các địa điểm, cũng như văn hóa hay lễ hội ở đó. Tôi xuất phát từ Biên Hòa, Đồng Nai 19h ngày 7/4/2023 đến ngày 12/4/2023 sẽ trở lại nơi xuất phát. Thông tin phải được viết bằng tiếng Việt. Định dạng phản hồi của bạn bằng cấu trúc Markdown. Sử dụng các tiêu đề, tiêu đề phụ, dấu đầu dòng và in đậm, in nghiên, dấu liên kết để sắp xếp thông tin."
  // const content = "Đóng vai hướng dẫn viên du lịch có nhiệm vụ cung cấp cho khách du lịch những thông tin liên quan về điểm đến của họ. Kỹ năng giao tiếp và dịch vụ khách hàng của bạn rất xuất sắc. Tôi có chuyến đi bằng bus từ Đồng Nai đến Đà Lạt và ở đó trong 5 ngày. Hãy tư vấn cho tôi lộ trình từ lúc xuất phát cho đến lúc về, và các địa điểm tham quan du lịch trả về địa chỉ cụ thể cho từng nơi (ví dụ: 20, nguyến ái quốc, phường 2, Đà Lạt). Hãy cung cấp khung giờ gian biểu để tôi đi tham quan các địa điểm(từ 6h sáng đến 12h đêm), cũng như văn hóa hay lễ hội ở đó. Tôi xuất phát từ Biên Hòa, Đồng Nai 19h ngày 7/4/2023 đến ngày 12/4/2023 sẽ trở lại nơi xuất phát. Thông tin phải được viết bằng tiếng Việt. Định dạng phản hồi của bạn bằng cấu trúc Markdown. Sử dụng các tiêu đề, tiêu đề phụ, dấu đầu dòng và in đậm, in nghiên, dấu liên kết để sắp xếp thông tin."
  // const content = "Đóng vai hướng dẫn viên du lịch có nhiệm vụ cung cấp cho khách du lịch những thông tin liên quan về điểm đến của họ. Kỹ năng giao tiếp và dịch vụ khách hàng của bạn rất xuất sắc. Tôi có chuyến đi bằng bus từ Đồng Nai đến Đà Lạt và ở đó trong 5 ngày. Hãy tư vấn cho tôi lộ trình từ lúc xuất phát cho đến lúc về, các địa điểm tham quan du lịch và đặt chúng trong dấu [] (ví dụ [vườn hoa đà lạt]). Bạn nên trả về địa chỉ cụ thể cho từng nơi (ví dụ của một địa chỉ: 20, nguyến ái quốc, phường 2, Đà Lạt). Hãy cung cấp khung giờ gian biểu để tôi đi tham quan các địa điểm(từ 6h sáng đến 12h đêm), cũng như văn hóa hay lễ hội ở đó. Tôi xuất phát từ Biên Hòa, Đồng Nai 19h ngày 7/4/2023 đến ngày 12/4/2023 sẽ trở lại nơi xuất phát. Thông tin phải được viết bằng tiếng Việt. Định dạng phản hồi của bạn bằng cấu trúc Markdown. Sử dụng các tiêu đề, tiêu đề phụ, dấu đầu dòng và in đậm, in nghiên, dấu liên kết để sắp xếp thông tin."
  // const content = "Đóng vai hướng dẫn viên du lịch có nhiệm vụ cung cấp cho khách du lịch những thông tin liên quan về điểm đến của họ. Kỹ năng giao tiếp và dịch vụ khách hàng của bạn rất xuất sắc. Tôi có chuyến đi bằng bus từ Đồng Nai đến Đà Lạt và ở đó trong 5 ngày. Hãy tư vấn cho tôi lộ trình từ lúc xuất phát cho đến lúc về, các địa điểm tham quan du lịch và đặt chúng trong dấu [] (ví dụ [vườn hoa đà lạt] và bạn đừng nên trả về tọa độ hay web google map nào cả. Khi nào bạn biết đó là tên một địa danh thì bạn mới đặt nó trong dấu [] còn không thì hãy trả về bình thường). Bạn nên trả về cung cấp các địa điểm tham quan, giờ mở cửa, địa chỉ cụ thể cho từng địa điểm và các khung giờ phù hợp để thăm quan. Hãy cung cấp thời gian biểu và phân ra làm các buổi trong ngày như buổi sáng, trưa, chiều và tối. Thời gian tôi có thể tham quan là từ 6h sáng đến 12h đêm, cũng như văn hóa hay lễ hội ở đó. Tôi xuất phát từ Biên Hòa, Đồng Nai 19h ngày 7/4/2023 đến ngày 12/4/2023 sẽ trở lại nơi xuất phát. Thông tin phải được viết bằng tiếng Việt. Định dạng phản hồi của bạn bằng cấu trúc Markdown. Sử dụng các tiêu đề, tiêu đề phụ, dấu đầu dòng và in đậm, in nghiên, dấu liên kết để sắp xếp thông tin. Cuối cùng hãy đưa ra cấc lưu ý khi đi chơi, chúc tôi có chuyến đi tuyệt vời"
  // const content = "Hãy giúp tôi lên bản kế hoạch chi tiết cho chuyến đi của tôi từ Đồng Nai đến Đà Lạt. Như một hướng dẫn viên du lịch, bạn có nhiệm vụ cung cấp cho tôi thông tin chi tiết về các địa điểm du lịch, vui chơi, ăn uống, chụp hình sống ảo tại Đà Lạt. Hãy giúp tôi phân ra các thời gian trong ngày như buổi sáng, trưa, chiều và tối. Tôi sẽ đi xe buýt và có kế hoạch 5 ngày tại Đà Lạt. Tôi cần bạn tư vấn lộ trình, các địa điểm tham quan, giờ mở cửa, địa chỉ cụ thể cho từng địa điểm và các khung giờ phù hợp để thăm quan. Tôi có thể tham quan vào mỗi ngày từ 6 giờ sáng đến 12 giờ đêm. Bạn sẽ cung cấp cho tôi thông tin về văn hóa và lễ hội tại mỗi địa điểm. Tôi sẽ xuất phát vào lúc 19h ngày 7/4/2023 từ Biên Hòa, Đồng Nai và trở về nơi xuất phát vào ngày 12/4/2023. Hãy trả về tên các địa điểm tham quan bằng cách đặt chúng trong dấu [ ]. Lưu ý bạn vẫn có thể trả về các địa điểm chung chung như quán ăn Đà Lạt nhưng sẽ không đặt những địa điểm đó trong dấu [ ]. Địa chỉ cụ thể của từng địa điểm sẽ được cung cấp. Vui lòng chuẩn bị thông tin trình bày bằng tiếng Việt và định dạng phản hồi của bạn sẽ sử dụng Markdown. Bạn sẽ sử dụng các tiêu đề, tiêu đề phụ, dấu đầu dòng và các thuộc tính định dạng khác để sắp xếp thông tin một cách rõ ràng và dễ đọc hơn."
  // const content = "Hãy giúp tôi lên bản kế hoạch chi tiết cho chuyến đi của tôi từ Đồng Nai đến Đà Lạt. Như một hướng dẫn viên du lịch, bạn có nhiệm vụ cung cấp cho tôi thông tin chi tiết về các địa điểm du lịch, vui chơi, ăn uống, chụp hình sống ảo tại Đà Lạt. Hãy giúp tôi phân ra các thời gian trong ngày như buổi sáng, trưa, chiều và tối. Tôi sẽ đi xe buýt và có kế hoạch 5 ngày tại Đà Lạt. Tôi cần bạn tư vấn lộ trình, các địa điểm tham quan, giờ mở cửa, địa chỉ cụ thể cho từng địa điểm và các khung giờ phù hợp để thăm quan. Tôi có thể tham quan vào mỗi ngày từ 6 giờ sáng đến 12 giờ đêm. Bạn sẽ cung cấp cho tôi thông tin về văn hóa và lễ hội tại mỗi địa điểm. Tôi sẽ xuất phát vào lúc 19h ngày 7/4/2023 từ Biên Hòa, Đồng Nai và trở về nơi xuất phát vào ngày 12/4/2023. Hãy trả về tên các địa điểm tham quan bằng cách đặt chúng trong dấu [ ]. Lưu ý bạn không nên trả về trang web nào sau dấu [ ], bạn vẫn có thể trả về các địa điểm chung chung như quán ăn Đà Lạt nhưng sẽ không đặt những địa điểm đó trong dấu [ ] và những địa điểm nào bạn nói trước đó rồi thì hãy giới thiệu một địa điểm khác. Địa chỉ cụ thể của từng địa điểm sẽ được cung cấp. Vui lòng chuẩn bị thông tin trình bày bằng tiếng Việt và định dạng phản hồi của bạn sẽ sử dụng Markdown. Bạn sẽ sử dụng các tiêu đề, tiêu đề phụ, dấu đầu dòng và các thuộc tính định dạng khác để sắp xếp thông tin một cách rõ ràng và dễ đọc hơn. Khi bạn cũng cấp xong thông tin hãy chúc tôi và có các lưu ý cho thông tin của bạn cung cấp"
  // const content = "Tôi có chuyến đi bằng xe máy từ Đồng Nai đến Nha Trang và ở đó trong 5 ngày với chi phí là khoảng 5 triệu đồng. Tôi xuất phát từ Biên Hòa, Đồng Nai 19h ngày 7/4/2023 đến ngày 12/4/2023 sẽ trở lại nơi xuất phát. Như một hướng dẫn viên du lịch, bạn có nhiệm vụ cung cấp cho tôi về các địa điểm du lịch, vui chơi, ăn uống (phải kết hợp ăn cả ba buổi), chụp hình sống ảo. Hãy cung cấp lịch trình từng ngày dưới dạng thời gian biểu và phân ra làm các buổi trong ngày như buổi sáng, trưa, chiều và tối (một buôi cũng có thể đi tham quan nhiều địa điểm khác nhau) và đặt chúng giữa 2 dấu [] ở cuối câu (ví dụ [vườn hoa đà lạt] và tránh trả về bất kỳ link trang web nào. Bạn nên trả về tên địa điểm tham quan, giờ đóng mở cửa, địa chỉ cụ thể cho từng địa điểm (trả về chuẩn không được sai), giá vé nếu có. Lưu ý hạn chế lặp lại các địa điểm mà bạn đã nói trước đó. Thời gian tôi có thể tham quan là từ 6h sáng đến 12h đêm, cũng như văn hóa hay lễ hội ở đó. Thông tin phải được viết bằng tiếng Việt. Định dạng phản hồi của bạn bằng cấu trúc Markdown. Sử dụng các tiêu đề, tiêu đề phụ, dấu đầu dòng và in đậm, in nghiên, dấu liên kết để sắp xếp thông tin."
  const content = "Tôi có một chuyến đi bằng xe máy từ Đồng Nai đến Đà Lạt trong vòng 5 ngày với chi phí khoảng 5 triệu đồng. Tôi sẽ xuất phát từ Biên Hòa, Đồng Nai vào lúc 19h ngày 7/4/2023 và trở lại nơi xuất phát vào ngày 12/4/2023. Nhiệm vụ của bạn là cung cấp thông tin chi tiết về các địa điểm du lịch, vui chơi, ăn uống (bao gồm ăn sáng, trưa và tối), chụp hình sống ảo tại Đà Lạt hãy đặt chúng trong dấu [] (ví dụ [vườn hoa đà lạt] và bạn đừng nên trả về tọa độ hay trang web nào cả. . Với vai trò hướng dẫn viên du lịch, bạn có thể giới thiệu các địa điểm, giờ mở cửa, địa chỉ, các khung giờ phù hợp để thăm quan, giá vé nếu có dưới dạng văn nói và hãy viết vài dòng giới thiệu về nó. Hãy phân chia các hoạt động theo thời gian và trong từng buổi sáng, trưa, chiều và tối. Thời gian tham quan là từ 6h sáng đến 12h đêm và cũng như thông tin về văn hóa hoặc lễ hội ở Đà Lạt. .Tránh lặp lại các địa điểm đã nêu trước đó. Hãy sử dụng các tiêu đề phụ, dấu liên kết, in đậm, in nghiêng và dấu đầu dòng để sắp xếp thông tin. Vui lòng viết bằng tiếng Việt. Cuối cùng, hãy đưa ra các lưu ý du lịch và chúc tôi một chuyến đi an toàn và trải nghiệm tuyệt vời." 
  // const content = "Bạn hãy đóng vai một người tư vấn du lịch. Tôi có một lịch trình du lịch đến Cần THơ, kéo dài trong 5 ngày với chi phí khoảng 5 triệu đồng. Tôi muốn biết về các địa điểm du lịch, vui chơi, ăn uống (nên có 3 buổi trong ngày) và chụp hình sống ảo và yêu cầu lịch trình được phân ra theo từng ngày và buổi trong ngày (một buổi có thể có nhiều địa điểm). Lịch trình cần cung cấp đầy đủ thông tin dưới dạng văn nói về tên địa điểm tham quan, mỗi tên địa điểm đều khác nhau mà không lặp lại các địa điểm đã cung cấp trước đó. Hãy đặt chúng trong dấu [] (không nên cung cấp bất kỳ trang web nào), một vài dòng giới thiệu ngắn từ 1-2 dòng về địa điểm đó. Thời gian tham quan trong khoảng từ 6h sáng đến 12h đêm và bao gồm cả văn hóa và lễ hội trong khu vực. Thông tin cung cấp phải bằng tiếng Việt và được sắp xếp bằng cấu trúc Markdown. Bạn không nên chúc, tổng hợp ý, hay làm gì ở bước cuối cùng cả!"
  // const content = "Tôi có chuyến đi ở Hà Giang dành cho 2 người bằng xe máy. Chúng tôi thích căm trại, ngắm cảnh, thích đi những nơi thơ mộng vào ban đêm, thích trải nghiệm đặc sẳn tại địa phương, thích chơi trò chơi dân gian. Với tư cách là tư vấn viên du lịch hãy đưa ra nói sơ qua khoảng 4 đến 5 dòng về nơi đó và cho 20 lời khuyên khi đi chơi, mỗi lời khuyên dài từ 2-3 dòng và cuối cùng hãy chúc cho chuyến đi. Hãy trả thông tin về dưới dạng Markdown."
  // const content = "Tôi có chuyến đi ở Côn Đảo dành cho 2 người bằng xe máy. Chúng tôi thích căm trại, ngắm cảnh, thích đi những nơi thơ mộng vào ban đêm, thích trải nghiệm đặc sẳn tại địa phương, thích chơi trò chơi dân gian. Với tư cách là tư vấn viên du lịch hãy nói sơ qua khoảng 4 đến 5 dòng về nơi đó và cho 20 lời khuyên chất lượng, cụ thể, chi tiết, thực tế về những vật dụng tôi sẽ nên đem theo ( tránh lặp lại những ý và bạn đã nói trước đó và không được cung cấp các đồ vật nhạy cảm như thuốc súng hay làm nguy hiểm đến tính mạng). Hãy chúc cho chuyến đi thuận lợi. Hãy trả thông tin về dưới dạng Markdown."
  const handlePressCreateItinerary = () => {
    // emit content để server xử lý  
    socketIoInstance.emit('c_create_travel_itinerary', {
      content: content,
      currentUserId: user?._id ? user._id : temporaryUserId
    })
    setShowBlinkingCusor(true)
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity 
      onPress={() => {
        handleBlinkingAnimation()
        handlePressCreateItinerary()
      }}
      style={{ padding: 10, backgroundColor: app_c.HEX.fourth, borderRadius: 4, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{...fonts.h4, color: app_c.HEX.primary}}>Tạo lịch trình cho bạn nè :3</Text>
      </TouchableOpacity>
      {/* <Text style={{alignSelf: 'flex-start',  marginTop: 20, width: '100%', paddingHorizontal: 18, ...fonts.h4}}>{content}\
      </Text> */}
      <ScrollView style={{width: '100%', height: '80%'}}>

      <Text style={{alignSelf: 'flex-start',  marginTop: 20, width: '100%', paddingHorizontal: 18, ...fonts.body4}}>{value}
      {
        showBlinkingCusor &&
        <View style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          position: 'absolute',
          justifyContent: 'flex-end'
        }}>
          <Animated.View style={{ height: 20, width: 10, position: 'absolute', bottom: -3, right: -30, backgroundColor: app_c.HEX.fourth, opacity: isVisible ? 1 : 0}}/>
        </View>
      }
      </Text>

      </ScrollView>
    </View>
  )
}

export default ExploreScreen