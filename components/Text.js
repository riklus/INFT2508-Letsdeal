import { StyleSheet, Text as ReactText } from "react-native"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState.js"

/* 
 *  The default text, theme resposinve.
*/
const Text = ({ children, style, ...props }) => {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme

  return <ReactText 
    style={[styles.font, { color: palettes[theme].textParagraph }, style]} {...props}>
    {children}
  </ReactText>
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Urbanist',
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: 0.32,
    lineHeight: 24,
    fontStyle: 'normal'
  }
})

export default Text