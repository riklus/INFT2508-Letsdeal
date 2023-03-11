import { useEffect, useState } from "react"
import { FlatList, RefreshControl, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Heart from "../assets/svgs/heart"
import ConnError from "../assets/svgs/network-error"
import FavItem from "../components/FavItem"
import Text from "../components/Text"
import baseurl from "../data/baseurl"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import I18n from "../translations/I18n"

const Fav = ({ navigation }) => {
  const [globalState, setGlobalState] = useGlobalState()
  const theme = globalState.theme
  I18n.locale = globalState.locale

  const sepColor = palettes[theme].separator
  const [items, setItems] = useState(undefined)
  const [connErr, setConnErr] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true)
    await updateFav()
    setRefreshing(false)
  }

  useEffect(() => navigation.addListener('focus', () => {
    updateFav()
  }), [navigation]);

  async function updateFav() {
    try {
      const req = await fetch(baseurl + '/items?liked=true')
      const items_obj = await req.json()

      setConnErr(false)
      setItems(items_obj)
    } catch (e) {
      setConnErr(true)
    }
  }

  async function updateFavCout() {
    const res = await fetch(baseurl + '/items?liked=true&_limit=0')
    const favoriteCount = res.headers.get('X-Total-Count')
    setGlobalState('favCount', favoriteCount)
  }
  async function removeFav(id) {
    try {
      await fetch(baseurl + '/items/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liked: false })
      })
    } catch (e) {
      setLike(like => !like)
      return
    }
        
    updateFavCout()
  }

  return (
    <SafeAreaView edges={['top', 'right', 'left']}
      style={{ backgroundColor: palettes[theme].background, flex: 1 }}>
      <Text style={styles.title}>{I18n.t('My Favorites')}</Text>

      <FlatList
        refreshControl={<RefreshControl 
          tintColor={palettes[theme].icon}
          refreshing={refreshing}
          onRefresh={onRefresh} />}
        style={styles.list}
        data={items}

        ItemSeparatorComponent={() => <View style={[styles.sep, { backgroundColor: sepColor }]} />}
        renderItem={({ item }) => 
          <FavItem {...item} key={item.id} 
            onRemove={() => {
              removeFav(item.id)
              setItems(itemsState => itemsState.filter(i => i.id != item.id))
            }}
            onPress={() => { 
              navigation.navigate('Item', { from: 'Favorites', item: item }) 
            }} />}
        ListFooterComponent={<View style={{ marginTop: 20 }} />}
        ListHeaderComponent={connErr ?
          <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', marginTop: '50%' }}>
            <ConnError width={100} height={100} fill={palettes[theme].icon} />
            <Text style={{ marginTop: 10, textAlign: 'center', lineHeight: 29 }}>{I18n.t("No Connection")}</Text>
          </View>
          : items === undefined ? undefined 
            : items.length === 0 ?
              <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', marginTop: '50%' }}>
                <Heart width={100} height={100} fill={palettes[theme].icon} />
                <Text style={{ marginTop: 10, textAlign: 'center', lineHeight: 29 }}>{I18n.t("No Favorites")}</Text>
              </View>
              : undefined
        } />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sep: {
    width: 'auto',
    height: 1,
    marginHorizontal: 16
  },
  title: {
    marginTop: 5,
    marginLeft: 16,
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 56
  }
})

export default Fav