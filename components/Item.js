import { useEffect, useState } from "react"
import { Image, Pressable, StyleSheet, View } from "react-native"
import baseurl from "../data/baseurl"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import Description from "./Description"
import IconToggle from "./IconToggle"
import Text from "./Text"
import Title from "./Title"

/* 
 *  Item in the shop.
*/
const Item = (
  { title = 'Title',                              // Title of the item.
    excerpt = 'Description',                      // Excerpt of the item's description.
    price = '100',                                // Price of the item (NOK).
    importance = 0,                               // Determines the size.
    thumbnailURL = 'http://localhost:3000/0.png', // Thumbnail of the item.
    id,                                           // Item id.
    liked,                                        // Liked status.
    onPress,                                      // Invoked on press.
    style,                                        // Wrapper style override.
    setItems                                      // Used to update the like status. (state access)
  }) => {
  const [globalState, setGlobalState] = useGlobalState()
  const theme = globalState.theme

  const itemWidth = Math.min(importance, 90) + '%'

  const priceTagColor = palettes[theme].price
  
  var bgColor = palettes[theme].background
  var opacity = 1

  function setLiked(like) {
    setItems(items => items.map(item => {
      if (item.id === id)
        item.liked = like
      return item
    })
    )
  }

  if (onPress) {
    var Wrapper = Pressable

    var pressEvents = {
      onPressIn: pressIn,
      onPress: press,
      onPressOut: pressOut,
    }

    var [bgColor, setBgColor] = useState(bgColor)
    var [opacity, setOpacity] = useState(opacity)

    useEffect(() => {
      setBgColor(palettes[theme].background)
    }, [theme])

  } else {
    var Wrapper = View
  }

  async function updateFavCount() {
    const res = await fetch(baseurl + '/items?liked=true&_limit=0')
    const favoriteCount = res.headers.get('X-Total-Count')
    setGlobalState('favCount', favoriteCount)
  }

  function pressIn() {
    setBgColor(palettes[theme].tapFeedback)
    setOpacity(0.9)
  }
  function press() {
    onPress()
  }
  function pressOut() {
    setBgColor(palettes[theme].background)
    setOpacity(1)
  }
  function pressLike() {

    setLiked(!liked)
    fetch(baseurl + '/items/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ liked: !liked })
    }).then(updateFavCount, () => setLiked(liked))
  }

  const [imgBackground, setImgBackground] = useState(palettes[theme].background)

  return (
    <Wrapper style={[styles.item, { width: itemWidth }, { backgroundColor: bgColor }, style]} {...pressEvents}>
      <View>
        <View style={{ backgroundColor: imgBackground }}>
          <Image 
            source={{ url: thumbnailURL }} 
            style={[styles.image, { opacity }]} 
            resizeMode='cover' 
            onLoadEnd={() => setImgBackground(palettes[theme].tapHighlight)} />
        </View>
        <View style={[styles.priceTag, { backgroundColor: priceTagColor }]}>
          <Text style={[styles.priceText, { color: palettes[theme].priceText }]}>{price} kr</Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Title style={styles.title}>{title}</Title>
        <IconToggle name='heart' size={32} color={palettes[theme].favorite}
          colorOff={palettes[theme].icon} style={{ paddingLeft: 1, paddingRight: 1 }} 
          onValueChange={pressLike} value={liked} />
      </View>
      <Description>{excerpt}</Description>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
  },
  titleContainer: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    marginBottom: 11,
    padding: 6,
    borderRadius: 3,

    minWidth: '35%',
    flexGrow: 1,
  },
  image: {
    overflow: 'hidden',
    aspectRatio: 3 / 2
  },
  priceTag: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    paddingRight: 10,
    paddingLeft: 10
  },
  priceText: {
    fontSize: 19,
    fontWeight: '600',
    letterSpacing: 0.32,
    lineHeight: 40,
    textAlign: 'center'
  }
})

export default Item;