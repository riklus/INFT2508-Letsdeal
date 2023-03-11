import { StyleSheet } from "react-native"
import Text from "./Text"

/* 
 *  This is a description text.
*/
const Description = ({ children, style }) => {
  return <Text style={[styles.description, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    letterSpacing: 0.32,
    lineHeight: 20,
    marginTop: 2
  },
})

export default Description