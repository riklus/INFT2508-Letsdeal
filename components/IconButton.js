import { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"

/* 
 *  Simple pressable icon.
*/
const IconButton = (
  { style,                          // Wrapper style override.
    name,                           // Icon name.
    onPress,                        // Invoked on press.
    disabled = false,               // Disabled value.
    size = 32,                      // Size of the button.
    color,                          // Color of the button.
    suppressHighlighting = false    // Does not show highlight on press.
  }) => {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme

  // Default appareance.
  var Wrapper = View
  var opacity = 1
  var color = color || palettes[theme].icon

  // This button is a pressable only if a onPress function is specified.
  if (onPress) {
    var Wrapper = Pressable
    var [opacity, setOpacity] = useState(opacity)

    var pressEvents = {
      onPressIn: pressIn,
      onPress: press,
      onPressOut: pressOut,
      disabled: disabled
    }
  }

  if (disabled) {
    var opacity = 0.50
  }

  function pressIn() {
    if (!suppressHighlighting) setOpacity(0.70)
  }
  function press() {
    onPress()
  }
  function pressOut() {
    if (!suppressHighlighting) setOpacity(1)
  }

  return (
    <Wrapper style={[styles.wrapper, { opacity }, style]} {...pressEvents}>
      <Icon
        name={name}
        style={[styles.icon, style]}
        size={size}
        color={color}
        disabled={disabled} />
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  wrapper: {
  },
  icon: {
    textAlign: 'center',
  }
})

export default IconButton