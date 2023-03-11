import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import MapView from "react-native-maps"
import { PERMISSIONS, request } from 'react-native-permissions'
import { SafeAreaView } from "react-native-safe-area-context"
import ConnError from "../assets/svgs/network-error"
import NoResults from "../assets/svgs/unhappy-result"
import PriceMarker from "../components/PriceMarker"
import SearchBar from "../components/SearchBar"
import Text from "../components/Text"
import baseurl from "../data/baseurl"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import I18n from "../translations/I18n"

const Map = ({ navigation }) => {
  const [globalState, setGlobalState] = useGlobalState()
  const theme = globalState.theme
  I18n.locale = globalState.locale
  const searchValue = globalState.searchValue
  const filterValue = globalState.filterValue
  const [items, setItems] = useState(undefined)
  const [connErr, setConnErr] = useState(false)

  useEffect(() => navigation.addListener('focus', () => {
    updateItems(searchValue, filterValue) 
  }), [navigation, searchValue, filterValue]);

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

  request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)

  const styles = StyleSheet.create({
    errMessage: {
      alignItems: 'center',
      padding: 15,
      paddingBottom: 20,
      borderRadius: 7,
      backgroundColor: palettes[theme].background + 'ed',
    },
    errMessageWrapper: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'space-around',
      zIndex: 2
    }
  })

  return (
    <SafeAreaView edges={['top', 'right', 'left']}
      style={{ backgroundColor: palettes[theme].background, flex: 1 }}>
      <SearchBar onChangeText={onChangeText} value={searchValue} from='Map' style={{ zIndex: 3 }} />
      {connErr ?
        <View style={styles.errMessageWrapper}>
          <View style={styles.errMessage}>
            <ConnError width={100} height={100} fill={palettes[theme].icon} />
            <Text style={{ marginTop: 10, textAlign: 'center', lineHeight: 29 }}>{I18n.t("No Connection")}</Text>
          </View> 
        </View>
        : items === undefined ? undefined 
          : items.length === 0 ?
            <View style={styles.errMessageWrapper}>
              <View style={styles.errMessage}>
                <NoResults width={100} height={100} fill={palettes[theme].icon} />
                <Text style={{ marginTop: 10, textAlign: 'center', lineHeight: 29 }}>{I18n.t("No Result")}</Text>
              </View>
            </View> : undefined}
      


      <MapView style={{ flex: 1, zIndex: -1 }} 
        showsUserLocation={true}
        userInterfaceStyle={theme}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        {items !== undefined ?
          items.map(item => 
            <PriceMarker 
              {...item}
              key={item.id}
              preview={true}
            />
          ) : undefined
        }
      </MapView>
    </SafeAreaView>
  
  )
}

export default Map