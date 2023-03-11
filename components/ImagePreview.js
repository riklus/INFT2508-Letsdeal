import { useState } from "react"
import { Image, Pressable, View } from "react-native"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"

/*
 *  Image preview of an item.
*/
const ImagePreview = (
  { size = 90,   // Size of the image.
    source,      // Source of the image.
    onPress      // Invoked when pressed.
  }) => {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme

  const [opacity, setOpacity] = useState(1)
  const [backgroundColor, setBackgroundColor] = useState(palettes[theme].background)

  function pressIn() {
    setOpacity(0.90)
  }
  function pressOut() {
    setOpacity(1)
  }

  return (
    <>
      <Pressable onPressIn={pressIn} onPress={onPress} onPressOut={pressOut}
        style={{ marginRight: 16, backgroundColor: palettes[theme].tapHighlight }}>
        <View style={{ backgroundColor }}>
          <Image source={source} 
            style={{ height: size, width: size, opacity: opacity }}
            onLoadEnd={() => setBackgroundColor(palettes[theme].tapHighlight)}
          />
        </View>
      </Pressable>
    </>
  )
}

export default ImagePreview