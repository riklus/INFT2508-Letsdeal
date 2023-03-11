import { useRef } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import I18n from "../translations/I18n"
import IconButton from "./IconButton"

/* 
 *  Search field in the search bar. Mirrors the default text input.
*/
const SearchField = ({ onChangeText, value }) => {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme
  I18n.locale = globalState.locale
  const textInput = useRef()

  return (
    <View style={[styles.wrapper, { backgroundColor: palettes[theme].searchBackground }]}>
      <Icon name='magnify' style={[styles.icon, { color: palettes[theme].magnify }]} />
      <TextInput style={[styles.textInput, { color: palettes[theme].textParagraph }]} 
        placeholder={I18n.t('Search field placeholder')}
        placeholderTextColor={palettes[theme].placeholder} 
        onChangeText={onChangeText}
        returnKeyType='search'
        value={value}
        ref={textInput}
      />
      {value !== undefined && value !== '' ? 
        <IconButton name='close-circle' size={20} 
          style={{ paddingRight: 5, color: palettes[theme].magnify }} 
          onPress={() => { onChangeText(''); textInput.current.focus() }}
        /> : undefined
      }
      
    </View>
  )  
}

const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'Urbanist',
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: 0,
    fontStyle: 'normal',
    marginRight: 7,
    flex: 1,
  },
  wrapper: {
    height: 40,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  icon: {
    textAlign: 'center',
    fontSize: 25,
    marginRight: 7,
    marginLeft: 8
  }
})

export default SearchField