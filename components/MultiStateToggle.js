import { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import Text from "./Text"

/* 
 *  Complex toggle with multiple selectable states.
*/
const MultiStateToggle = ({
  valueOptions = ['Option1', 'Option2', 'Option3'],   // Toggle values.
  value = 'Option1',      // Sets the toggle state ON or OFF.
  onValueChange,          // Callback with the option selected as first parameter.
}) => {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme


  const Option = props => {

    const [backgroundColor, setBackgroundColor] = useState(palettes[theme].background)

    function onPressIn() {
      setBackgroundColor(palettes[theme].tapFeedback)
    }
    function onPressOut() {
      setBackgroundColor(palettes[theme].background)
    }

    return (
      <Pressable 
        onPressIn={onPressIn}
        onPress={props.onPress}
        onPressOut={onPressOut}
        style={{ backgroundColor: backgroundColor, borderRadius: 7 }}
      >
        <Text style={props.style}>
          {props.children}
        </Text>
      </Pressable>
    )
  }

  return (
    <View style={styles.wrapper}>
      {valueOptions.map(option =>
        <Option key={option}
          style={option === value ? styles.selected : styles.option}
          onPress={() => onValueChange(option)}
        >
          {option}
        </Option>
      )}
    </View >
  )
}

const styles = StyleSheet.create({
  option: {
    fontWeight: '400',
    letterSpacing: 0,
    textAlign: 'center',
    marginHorizontal: 16,
    fontSize: 18
  },
  selected: {
    letterSpacing: 0,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginHorizontal: 16,
    fontSize: 19
  },
  wrapper: {
    flexDirection: 'row'
  }
})

export default MultiStateToggle