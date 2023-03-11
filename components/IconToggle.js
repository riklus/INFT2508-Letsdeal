import { useGlobalState } from "../GlobalState"
import IconButton from "./IconButton"

/*
 *  Simple toggle with icon.
*/
const IconToggle = (
  { 
    name,               // Icon name.
    value = false,      // Sets the toggle state ON or OFF.
    onValueChange,      // Callback on filp-flop.
    color,              // Color of the toggle.
    colorOff,           // Color of the toggle in OFF state.
    size,               // Size of the icon.
    disabled = false,   // Disabled value.
    style,              // Wrapper style override.
  }) => {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme

  if (value) {
    var icon = name
  } else {
    var icon = name + '-outline'
    var color = colorOff || color
  }

  if (onValueChange) {
    var press = () => {
      onValueChange()
    }
  }

  return <IconButton 
    style={style} 
    onPress={press} 
    name={icon} 
    disabled={disabled} 
    color={color}
    size={size}
    suppressHighlighting={true}
  />
}

export default IconToggle