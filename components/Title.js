import { StyleSheet } from "react-native"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import Text from "./Text"

/* 
 *  The default title, theme resposinve.
*/
const Title = ({ children, style }) => {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme

  return <Text style={[styles.title, { color: palettes[theme].textTitle }, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    fontWeight: '600',
    letterSpacing: 0.32,
    lineHeight: 23,
    textAlign: 'left',
    marginTop: 5
  },
})

export default Title