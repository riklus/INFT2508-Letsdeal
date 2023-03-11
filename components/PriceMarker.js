import { useNavigation } from "@react-navigation/native"
import { StyleSheet, View } from "react-native"
import { Callout, Marker } from "react-native-maps"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import Item from "./Item"
import Text from "./Text"

/* 
 *  Marker on the map.
*/
const PriceMarker = (item = { 
  title: 'Title',                 // Title of the marker.
  description: 'Description',     // Description of the marker.
  coordinate: {                   // Coordinates where the marker will be placed on the map.
    latitude: 0,
    longitude: 0
  }, 
  price: '100 kr',                // Item price.
  preview: false                  // Preview the item on tap.
}) => {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme
  const navigation = useNavigation()

  const backgroundColor = palettes[theme].price
  const color = palettes[theme].priceText


  return (
    <Marker
      title={item.title}
      description={item.description}
      coordinate={item.coordinate}
      centerOffset={{ x: 0, y: -27 }}
    >
      <View style={[styles.marker, { backgroundColor }]}>
        <Text style={[styles.priceMap, { color }]}>{item.price} kr</Text>
      </View>
      <View style={[styles.triangle, { borderColor: backgroundColor, marginBottom: 0 }]}>
      </View>
      {
        item.preview ? 
          <Callout tooltip={true} 
            onPress={() => { navigation.navigate("Item", { from: 'Map', item: item }) }}>
            <View style={{ backgroundColor: palettes[theme].background, borderRadius: 9 }}>
              <Item {...item}
                style={styles.item} 
                onPress={() => { navigation.navigate("Item", { from: 'Map', item: item }) }}
              />
            </View>
          </Callout>
          : undefined
      }
    </Marker >
  )
}

const styles = StyleSheet.create({
  marker: {
    padding: 10,
    borderRadius: 5,
  },
  priceMap: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.32,
    textAlign: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
  },
  item: {
    width: 300, 
    padding: 10,
    borderRadius: 9, 
    marginBottom: 0
  }
})

export default PriceMarker