import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"
import PressableRow from "../components/PressableRow"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import I18n from "../translations/I18n"

const langs = ['en', 'it', 'nb']

const Languages = ({ navigation, routes }) => {
  const [globalState, setGlobalState] = useGlobalState()
  const theme = globalState.theme
  const locale = globalState.locale
  I18n.locale = locale

  useEffect(() => {
    navigation.setOptions(
      {
        headerBackTitle: I18n.t('Settings'), 
        headerTitle: I18n.t('Choose a language'),
        headerTintColor: palettes[theme].settings
      })
  }, [globalState.locale])

  return (
    <SafeAreaView edges={['top', 'right', 'left']}
      style={{ backgroundColor: palettes[theme].background, flex: 1 }}>
      {
        langs.map(lang =>
          <View key={lang}>
            <PressableRow text={I18n.t(lang)} 
              onPress={() => {
                AsyncStorage.setItem('locale', lang)
                setGlobalState('locale', lang) 
              }} 
              icon={lang === locale ? 'check' : undefined}
            />
            <View style={[styles.sep, { borderColor: palettes[theme].separator }]} />
          </View>
        )
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sep: {
    width: 'auto',
    borderWidth: 0.5,
    marginHorizontal: 16
  },
})

export default Languages