import { useEffect, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import Text from "./Text"

/* 
 *  An option in the settings or selectable category.
*/
const PressableRow = ({ 
  onPress,      // Invoked when pressed.
  icon,         // Icon display on the right.
  text,         // Text of the option.
  children      // Other children.
}) => {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme

  if (onPress) {
    var Wrapper = Pressable

    var [backgroundColor, setBackgroundColor] = useState(palettes[theme].background)
    useEffect(() => { setBackgroundColor(palettes[theme].background) }, [theme])

    function pressIn() {
      setBackgroundColor(palettes[theme].tapFeedback)
    }

    function press() {
      onPress()
    }

    function pressOut() {
      setBackgroundColor(palettes[theme].background)
    }

    var pressEvents = {
      onPressIn: pressIn,
      onPress: press,
      onPressOut: pressOut,
    }
  } else {
    var Wrapper = View
    var backgroundColor = palettes[theme].background
  }

  if (icon) var icon = <Icon name={icon} size={30} color={palettes[theme].icon} />

  return (
    <Wrapper style={[{ backgroundColor }, styles.item]} {...pressEvents}>
      <Text>{text}</Text>
      {icon}
      {children}
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 12,
    paddingRight: 16,
    paddingLeft: 18,
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default PressableRow