import { useEffect, useState } from "react"
import { RefreshControl, ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ConnError from "../assets/svgs/network-error"
import NoResults from "../assets/svgs/unhappy-result"
import Item from "../components/Item"
import ItemsContainer from "../components/ItemsContainer"
import SearchBar from "../components/SearchBar"
import Text from "../components/Text"
import baseurl from "../data/baseurl"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import I18n from "../translations/I18n"

const Main = ({ navigation }) => {
  const [globalState, setGlobalState] = useGlobalState()
  const theme = globalState.theme
  const searchValue = globalState.searchValue
  const filterValue = globalState.filterValue
  const favCount = globalState.favCount
  I18n.locale = globalState.locale

  const [items, setItems] = useState(undefined)
  const [connErr, setConnErr] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true)
    await updateItems(searchValue, filterValue)
    setRefreshing(false)
  }
  
  useEffect(() => navigation.addListener('focus', () => {
    updateItems(searchValue, filterValue) 
  }), [navigation, searchValue, filterValue, favCount]);

  async function updateItems(search, filterBy) {
    let searchParams = ''
    if (typeof search === 'string') {
      search = search.normalize().trim()

      if (search != '') searchParams = '&q=' + search
    }

    let filterParams = ''
    if (typeof filterBy === 'object') {
      filterParams = filterBy.reduce((s, cat) => s + '&category=' + cat, '')
    }

    try {
      const req = await fetch(baseurl + '/items?' + filterParams + searchParams)
      const items_obj = await req.json()

      setConnErr(false)
      setItems(items_obj)
    } catch (e) {
      setConnErr(true)
    }
  }

  function onChangeText(search) {
    setGlobalState('searchValue', search)
    updateItems(search, filterValue)
  }



  return (
    <SafeAreaView edges={['top', 'right', 'left']}
      style={{ backgroundColor: palettes[theme].background, flex: 1 }}>
      <SearchBar onChangeText={onChangeText} value={searchValue} from='Deals' />
      <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }} 
        refreshControl={<RefreshControl 
          tintColor={palettes[theme].icon}
          refreshing={refreshing}
          onRefresh={onRefresh} />}>
        
        {connErr ?
          <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', marginTop: '50%' }}>
            <ConnError width={100} height={100} fill={palettes[theme].icon} />
            <Text style={{ marginTop: 10, textAlign: 'center', lineHeight: 29 }}>{I18n.t("No Connection")}</Text>
          </View>
          : items === undefined ? undefined 
            : items.length === 0 ?
              <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', marginTop: '50%' }}>
                <NoResults width={100} height={100} fill={palettes[theme].icon} />
                <Text style={{ marginTop: 10, textAlign: 'center', lineHeight: 29 }}>{I18n.t("No Result")}</Text>
              </View>
              : <ItemsContainer>
                {items.map((item) => (
                  <Item {...item} key={item.id} setItems={setItems}
                    onPress={() => { navigation.navigate("Item", { from: 'Deals', item: item }) }}
                  />
                ))}
              </ItemsContainer>
        }
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default Main