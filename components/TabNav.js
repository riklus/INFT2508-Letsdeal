import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useEffect } from "react"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import baseurl from "../data/baseurl"
import palettes from "../data/palettes"
import { useGlobalState } from "../GlobalState"
import Fav from "../routes/Fav"
import Main from "../routes/Main"
import Map from "../routes/Map"
import Settings from "../routes/Settings"
import I18n from "../translations/I18n"

const Tab = createBottomTabNavigator()

/* 
 *  This is the tab navigator.
*/
const TabNav = () => {
  const [globalState, setGlobalState] = useGlobalState()
  const theme = globalState.theme
  const favCount = globalState.favCount
  I18n.locale = globalState.locale

  useEffect(() => {
    (async () => {
      const res = await fetch(baseurl + '/items?liked=true&_limit=0')
      const favoriteCount = res.headers.get('X-Total-Count')
      setGlobalState('favCount', favoriteCount)
    })()
  }, [])

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
        tabBarStyle: {
          backgroundColor: palettes[theme].background,
          borderTopWidth: 1,
          borderTopColor: palettes[theme].lightDivider,
        },
        tabBarLabelStyle: {
          fontFamily: 'Urbanist',
          fontSize: 11,
          letterSpacing: 0.50,
          paddingBottom: 4
        },
        tabBarIconStyle: { marginTop: 2 },
        tabBarActiveTintColor: palettes[theme].primaryAction,
        tabBarInactiveTintColor: palettes[theme].inactive
      }
      } >
      <Tab.Screen name="MainTab" component={Main} 
        options={{
          title: I18n.t('Deals'),
          tabBarActiveTintColor: palettes[theme].deals,
          tabBarIcon: ({ focused, color, size }) => {
            return focused ?
              <Icon name='tag' size={size} color={color} />
              : <Icon name='tag-outline' size={size} color={color} />
          }
        }}
      />
      <Tab.Screen name="MapTab" component={Map} 
        options={{
          title: I18n.t('Map'),
          tabBarActiveTintColor: palettes[theme].map,
          tabBarIcon: ({ focused, color, size }) => {
            return focused ?
              <Icon name='map' size={size} color={color} />
              : <Icon name='map-outline' size={size} color={color} />
          }
        }}
      />
      <Tab.Screen name="FavTab" component={Fav} 
        options={{
          tabBarBadge: favCount == 0 ? undefined : favCount,
          title: I18n.t('Favorites'),
          tabBarActiveTintColor: palettes[theme].favorite,
          tabBarIcon: ({ focused, color, size }) => {
            return focused ?
              <Icon name='heart' size={size} color={color} />
              : <Icon name='heart-outline' size={size} color={color} />
          }
        }}
      />
      <Tab.Screen name="SettingsTab" component={Settings} 
        options={{
          title: I18n.t('Settings'),
          tabBarActiveTintColor: palettes[theme].settings,
          tabBarIcon: ({ focused, color, size }) => {
            return focused ?
              <Icon name='cog' size={size} color={color} />
              : <Icon name='cog-outline' size={size} color={color} />
          }
        }}
      />
    </Tab.Navigator >
  )
}

export default TabNav