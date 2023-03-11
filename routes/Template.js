import { SafeAreaView } from "react-native-safe-area-context"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import I18n from "../translations/I18n"

const Template = () => {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme
  I18n.locale = globalState.locale

  return (
    <SafeAreaView edges={['top', 'right', 'left']}
      style={{ backgroundColor: palettes[theme].background, flex: 1 }}>
    </SafeAreaView>
  )
}

export default Template