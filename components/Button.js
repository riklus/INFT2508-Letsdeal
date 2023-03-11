import { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import Text from "./Text"

/* 
 *  This is the default text button.
*/
const Button = (
  { title,              // Text of the button.
    icon,               // Icon of the button.
    type = 'primary',   // 'primary' | 'secondary'.
    onPress,            // Function invoked on press.
    disabled = false,   // If set to true the button becomes disabled.
    style,              // Wrapper style.
  }) => {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme

  const actionColor = palettes[theme][type + 'Action']
  const actionPressInColor = palettes[theme][type + 'ActionPressIn']
  const buttonTextColor = palettes[theme].textButton
  const disabledColor = palettes[theme].disabledAction
  const disabledButtonTextColor = palettes[theme].textDisabledButton

  // Default appareance.
  var Wrapper = View
  var bgColor = actionColor
  var textColor = buttonTextColor

  // This button is a pressable only if a onPress function is specified.
  if (onPress) {
    var Wrapper = Pressable

    var [bgColor, setBgColor] = useState(bgColor)
    var pressEvents = {
      onPressIn: pressIn,
      onPress: press,
      onPressOut: pressOut,
      disabled: disabled
    }
  }

  if (disabled) {
    bgColor = disabledColor
    textColor = disabledButtonTextColor
  }

  function pressIn() {
    setBgColor(actionPressInColor)
  }
  function press() {
    onPress()
  }
  function pressOut() {
    setBgColor(actionColor)
  }
  
  return (
    <Wrapper {...pressEvents}
      style={[styles.wrapper, { backgroundColor: bgColor }, style]}>
      {icon ? <Icon name={icon} style={[styles.icon, { color: textColor }]} /> : null}
      {title !== undefined ?
        <Text style={[styles.text, { color: textColor }]}>
          {title}
        </Text> : undefined}
    </Wrapper >
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: '600',
    letterSpacing: 0,
    textAlign: 'center',
    marginLeft: 8,
  },
  icon: {
    textAlign: 'center',
    fontSize: 21,
  }
})

export default Button