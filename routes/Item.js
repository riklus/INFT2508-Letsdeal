import { useEffect, useState } from "react"
import { Image, Linking, Modal, ScrollView, StyleSheet, View } from "react-native"
import ImageViewer from "react-native-image-zoom-viewer"
import MapView from "react-native-maps"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import Button from "../components/Button"
import Carousel from "../components/Carousel"
import Description from "../components/Description"
import IconToggle from "../components/IconToggle"
import ImagePreview from "../components/ImagePreview"
import PriceMarker from "../components/PriceMarker"
import Text from "../components/Text"
import Title from "../components/Title"
import baseurl from "../data/baseurl"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import I18n from "../translations/I18n"

const Item = ({ navigation, route }) => {
  const [globalState, setGlobalState] = useGlobalState()
  const theme = globalState.theme
  I18n.locale = globalState.locale
  const insets = useSafeAreaInsets();

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
        headerTitle: route.params.item.title,
        headerTintColor: tint
      })
  }, [
    globalState.locale,
    palettes[theme].deals,
    palettes[theme].favorite
  ])

  const item = route.params.item
  const [like, setLike] = useState(item.liked)

  async function updateFavCout() {
    const res = await fetch(baseurl + '/items?liked=true&_limit=0')
    const favoriteCount = res.headers.get('X-Total-Count')
    setGlobalState('favCount', favoriteCount)
  }
  function pressLike() {
    setLike(like => {
      (async () => {
        try {
          await fetch(baseurl + '/items/' + item.id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ liked: !like })
          })
        } catch (e) {
          setLike(like => !like)
          return
        }
        
        updateFavCout()
      })()
      
      return !like
    })
  }

  const gallery = item.gallery.map(url => ({ url }))

  const [currentImage, setCurrentImage] = useState(false)
  
  return (
    <SafeAreaView edges={['right', 'left', 'bottom']}
      style={{ backgroundColor: palettes[theme].background, flex: 1 }}>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image source={{ uri: item.thumbnailURL }} style={styles.image} resizeMode='contain' />
        </View>
        {gallery.length != 0 ? <>
          <Modal visible={currentImage !== false ? true : false} 
            transparent={true} 
            animationType='fade'
            hardwareAccelerated={true}
            useNativeDriver={true}>
            <ImageViewer imageUrls={gallery}
              renderHeader={
                () =>
                  <View style={
                    {
                      width: '100%',
                      height: insets.top,
                      backgroundColor: palettes[theme].background,
                    }}>
                  </View>
              }
              renderIndicator={
                (currentIndex, allSize) =>
                  <View style={
                    {
                      alignSelf: 'center', 
                      position: 'absolute', 
                      top: insets.top + 20,
                      backgroundColor: palettes[theme].background + 'ce',
                      padding: 5,
                      borderRadius: 7
                    }}>
                    <Text > 
                      {currentIndex + '/' + allSize} 
                    </Text>
                  </View>
              }
              onCancel={() => setCurrentImage(false)}
              index={currentImage}
              enablePreload={true} 
              enableSwipeDown={true} 
              backgroundColor={palettes[theme].background}
              saveToLocalByLongPress={false}
              swipeDownThreshold={100}
            />
          </Modal>
          <Carousel>
            {
              gallery.map((img, id) => 
                <ImagePreview key={id} source={img}
                  onPress={() => setCurrentImage(id)} 
                />)
            }
          </Carousel>
        </> : undefined
        }
        <View style={styles.body}>
          <View style={styles.titleContainer}>
            <Title style={styles.title}>{item.title}</Title>
            <IconToggle 
              name='heart' 
              color={palettes[theme].favorite} 
              onValueChange={pressLike}
              value={like}
              colorOff={palettes[theme].icon} style={{ paddingLeft: 2, paddingRight: 2 }} />
          </View>
          <Description style={styles.description}>{item.description}</Description>
        </View>

        {item.tel !== undefined || item.web !== undefined ?
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 16,
              marginLeft: 16,
              marginRight: 16
            }}
          >
            {item.tel !== undefined ?
              <Button 
                onPress={() => { Linking.openURL('tel:' + item.tel) }}
                icon='phone' type='secondary' 
                style={{ marginRight: 8, flex: 1 }}
              /> : undefined}
            {item.web !== undefined ?
              <Button 
                onPress={() => { Linking.openURL(item.web) }}
                icon='web' type='secondary' 
                style={{ marginLeft: 8, flex: 1 }}
              /> : undefined}
          </View> : undefined}

        <MapView style={styles.map}
          userInterfaceStyle={theme}
          region={{
            latitude: item.coordinate.latitude + 0.00015,
            longitude: item.coordinate.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
        >
          <PriceMarker {...item} preview={false} />
        </MapView>
      </ScrollView>
      <View style={[styles.buyContainer, { borderColor: palettes[theme].lightDivider }]}>
        <Text style={[styles.price, { color: palettes[theme].price }]}>{item.price} kr</Text>
        <Button title={I18n.t('BUY')} style={styles.buyButton} onPress={() => { navigation.goBack() }} icon='cart-plus' />
      </View>
      
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  marker: {
    backgroundColor: '#ff4e4f',
    padding: 10,
    borderRadius: 5,
  },
  priceMap: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.32,
    textAlign: 'center',
    color: 'white'
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
    borderColor: '#ff4e4f'
  },
  body: {
    paddingLeft: 16,
    paddingRight: 16
  },
  imgContainer: {
    flexDirection: 'row'
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 3 / 2
  },
  title: {
    margin: 0,
    flex: 1
  },
  buyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 16,
    paddingBottom: 16
  },
  price: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.32,
    lineHeight: 40,
    textAlign: 'center'
  },
  buyButton: {
    flex: 1,
    marginRight: 20
  },
  description: {
    marginTop: 0,
    fontSize: 17,
    paddingBottom: 16
  },
  titleContainer: {
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  map: {
    height: 200
  }
})

export default Item