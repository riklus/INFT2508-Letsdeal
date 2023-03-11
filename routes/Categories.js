import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import PressableRow from "../components/PressableRow"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import I18n from "../translations/I18n"

const Categories = () => {
  const [globalState, setGlobalState] = useGlobalState()
  const theme = globalState.theme
  I18n.locale = globalState.locale
  const navigation = useNavigation()

  const routes = navigation.getState()["routes"]
  const route = routes[routes.length - 1]

  useEffect(() => {
    let tint
    switch (route.params.from) {
      case 'Deals':
        tint = palettes[theme].deals
        break
      case 'Favorites':
        tint = palettes[theme].favorite
        break
      case 'Map':
        tint = palettes[theme].map
        break
    }

    navigation.setOptions(
      {
        headerBackTitle: I18n.t(route.params.from), 
        headerTitle: I18n.t('Filter by category'),
        headerTintColor: tint
      })
  }, [
    globalState.locale,
    palettes[theme].deals,
    palettes[theme].favorite
  ])

  const Sep = <View style={[styles.sep, { backgroundColor: palettes[theme].separator }]} />
  const categories = ['Food Drinks', 'Home Decor', 'Bathroom', 'Clothes Accessories', 'Health']

  return (
    <SafeAreaView edges={['right', 'left']}
      style={{ backgroundColor: palettes[theme].background, flex: 1 }}>
      <FlatList 
        data={categories}
        ListHeaderComponent={Sep}
        ItemSeparatorComponent={Sep}
        ListFooterComponent={Sep}
        renderItem={({ item }) => 
          <PressableRow text={I18n.t(item)} icon={
            globalState.filterValue.includes(item) ? 'check' : undefined
          } 
            onPress={() => {
              if (globalState.filterValue.includes(item)) {
                setGlobalState('filterValue', globalState.filterValue.filter(e => e != item))
              } else {
                setGlobalState('filterValue', globalState.filterValue.concat(item))
              }
            }}
          />
        }
      />
      
      
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sep: {
    width: 'auto',
    height: 1,
    marginHorizontal: 16
  },
})

export default Categories