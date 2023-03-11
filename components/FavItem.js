import { useEffect, useRef, useState } from "react"
import { Animated, Image, Pressable, StyleSheet, View } from "react-native"
import Swipeable from "react-native-gesture-handler/Swipeable"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import Description from "./Description"
import Text from "./Text"
import Title from "./Title"

/* 
 *  Item in the 'My Favorites' flat list.
*/
const FavItem = (
  { title = 'Title',                              // Title of the item.
    excerpt = 'Description',                      // Description of the item.
    price = '100',                                // Price of the item.
    thumbnailURL = 'http://localhost:3000/0.png', // Item preview.
    onPress,                                      // Invoked on press.
    style,                                        // Wrapper style override.
    onRemove                                      // Invoked on swiped right.
  }) => {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme

  const [opacity, setOpacity] = useState(1)
  const [backgroundColor, setBackgroundColor] = useState(palettes[theme].background)

  useEffect(() => {
    setBackgroundColor(palettes[theme].background)
  }, [theme])

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-90, 0],
      outputRange: [1, 0],
      extrapolateLeft: 'clamp',
    })

    return (
      <View style={[styles.rightAction, { backgroundColor: palettes[theme].remove }, style]}>
        <Animated.View style={{ transform: [{ scale: trans }], }}>
          <Icon name='close-circle-outline'
            style={styles.actionIcon} size={35} />
        </Animated.View>
      </View>
    )
  }

  let originalHeight = useRef(0)
  const animatedMaxHeight = useRef(new Animated.Value(5000)).current

  const removeAnimation = (callback) => {
    animatedMaxHeight.setValue(originalHeight.current)
    Animated.timing(animatedMaxHeight, {
      toValue: 0,
      useNativeDriver: false,
      duration: 100
    }).start(callback)
  }

  function swipeableOpen(direction) {
    if (onRemove) removeAnimation(onRemove)
  }
  function pressIn() {
    setOpacity(0.9)
    setBackgroundColor(palettes[theme].tapFeedback)
  }
  function press() {
    if (onPress) onPress()
  }
  function pressOut() {
    setOpacity(1)
    setBackgroundColor(palettes[theme].background)
  }

  function measureView(event) {
    originalHeight.current = event.nativeEvent.layout.height
  }


  const [imgBackground, setImgBackground] = useState(palettes[theme].background)

  return (
    <Swipeable renderRightActions={renderRightActions} enableTrackpadTwoFingerGesture={true} onSwipeableOpen={swipeableOpen}>
      <Animated.View onLayout={measureView} style={{ maxHeight: animatedMaxHeight }}>
        <Pressable onPressIn={pressIn} onPress={press} onPressOut={pressOut} style={{ backgroundColor: palettes[theme].background }}>
          <View style={[styles.wrapper, { backgroundColor }]}>
            <View>
              <View style={{ backgroundColor: imgBackground }}>
                <Image source={{ url: thumbnailURL }} style={[styles.image, { opacity }]} resizeMode='cover' 
                  onLoadEnd={() => setImgBackground(palettes[theme].tapHighlight)} />
              </View>
              <Text style={[styles.priceText, { color: palettes[theme].price }]}>{price} kr</Text>
            </View>
            <View style={styles.title}>
              <Title>{title}</Title>
              <Description>{excerpt}</Description>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </Swipeable >
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  image: {
    height: 100,
    width: 100
  },
  title: {
    marginLeft: 10,
    flex: 1
  },
  priceText: {
    fontSize: 19,
    fontWeight: '600',
    letterSpacing: 0.32,
    lineHeight: 40,
  },
  rightAction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  actionIcon: {
    color: 'white',
    paddingHorizontal: 16,
    textAlign: 'right'
  }
})

export default FavItem;