import { ScrollView, View } from "react-native"

/* 
 *  This is a carousel of images.
*/
const Carousel = (
  { children,         //  The image components.
    imgSize = 90      //  The image sizes.
  }) => {
  return (
    <ScrollView 
      horizontal={true} 
      style={{ paddingLeft: 16, paddingTop: 16 }} 
      snapToInterval={imgSize + 16}
      showsHorizontalScrollIndicator={false}>
      {children}
      <View style={{ width: 16 }} />
    </ScrollView>
  )
}

export default Carousel