import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MultiStateToggle from '../components/MultiStateToggle'
import PressableRow from '../components/PressableRow'
import Text from '../components/Text'
import palettes from '../data/palettes'
import { useGlobalState } from '../GlobalState'
import I18n from '../translations/I18n'
import Logo from '../assets/svgs/logo'

function capitalize(word) {
  return word.charAt(0).toUpperCase()
    + word.slice(1)
}

const Settings = ({ navigation }) => {
  const [globalState, setGlobalState] = useGlobalState()
  const theme = globalState.theme
  I18n.locale = globalState.locale

  const [themeToggle, setThemeToggle] = useState(capitalize(theme))
  function onChangeTheme(theme) {
    AsyncStorage.setItem('theme', theme.toLowerCase())
    setGlobalState('theme', theme.toLowerCase())
    setThemeToggle(theme)
  }

  const Sep = <View style={[styles.sep, { backgroundColor: palettes[theme].separator }]} />

  return (
    <SafeAreaView edges={['top', 'right', 'left']}
      style={{ backgroundColor: palettes[theme].background, flex: 1 }}>
      <Text style={styles.title}>{I18n.t('Settings')}</Text>
      <View style={styles.body}>
        {Sep}
        <PressableRow text={I18n.t('Theme')}>
          <MultiStateToggle valueOptions={['Light', 'Dark']} value={themeToggle} onValueChange={onChangeTheme} />
        </PressableRow>
        {Sep}
        <PressableRow text={I18n.t('Language')} icon='chevron-right' onPress={() => { navigation.navigate('Languages') }} />
        {Sep}
      </View>
      <Logo style={styles.logo} fill={palettes[theme].tapFeedback} height={50} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 5,
    marginLeft: 16,
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 56,
    marginBottom: 16
  },
  sep: {
    width: 'auto',
    height: 1,
    marginHorizontal: 16
  },
  body: {
  },
  item: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '6%'
  }
})

export default Settings