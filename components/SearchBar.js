import { useNavigation } from "@react-navigation/native"
import { StyleSheet, View } from "react-native"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import IconButton from "./IconButton"
import SearchField from "./SearchField"

/* 
 *  The search bar with the categories button.
*/
const SearchBar = ({ 
  onChangeText,       // Invoked when the text input changes.
  value,              // Text in the text input.
  from,               // What page is the searchbar placed in. (useful for the categories' back button).
  style               // Wrapper style override.
}) => {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme
  const navigation = useNavigation()

  return (
    <View style={[styles.wrapper, style]}>
      <SearchField onChangeText={onChangeText} value={value} />
      <IconButton name='menu' onPress={() => navigation.navigate('Categories', { from })} 
        style={[styles.menu, { color: palettes[theme].categories }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    marginLeft: 13,
    marginRight: 13,
  }
})

export default SearchBar