import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TabNav from './components/TabNav'
import palettes from './data/palettes'
import { GlobalState, useGlobalState } from "./GlobalState"
import Item from './routes/Item'
import Languages from './routes/Languages'
import Logo from './assets/svgs/logo.svg'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Categories from './routes/Categories'

const Stack = createNativeStackNavigator();

function MyStack() {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: palettes[theme].background
        },
        headerTitleStyle: {
          color: palettes[theme].textTitle,
          fontFamily: 'Urbanist',
          fontWeight: '600'
        }
      }}
      initialRouteName='Main'>
      <Stack.Screen name="Main" component={TabNav} />
      <Stack.Screen name="Item" component={Item} options={{ headerShown: true }} />
      <Stack.Screen name="Languages" component={Languages} options={{ headerShown: true }} />
      <Stack.Screen name="Categories" component={Categories} options={{ headerShown: true }} />
    </Stack.Navigator>
  )
}

const MyStatusBar = () => {
  const [globalState, _] = useGlobalState()
  const theme = globalState.theme

  return <StatusBar barStyle={palettes[theme].barStyle} />
}

// Splash screen shown during global state initialization.
const SplashScreen = () => {
  const [defaultSettings, setDefaultSettings] = useState(null)

  // Load global state initial values.
  useEffect(() => {
    AsyncStorage.multiGet(['theme', 'locale'], (_err, settingsPairs) =>
      setDefaultSettings(
        settingsPairs
          .map(([key, value]) => {
            if (value === null) return {}
            const pair = { [key]: value }
            return pair 
          })
          .reduce((dict, pair) => { const r = { ...dict, ...pair }; return r }, {})
      )
    )
  }, [])

  if (defaultSettings === null) {
    return (
      <View style={{ 
        backgroundColor: '#4280FF', 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <StatusBar barStyle={'light-content'} />
        <Logo width={175} height={175} fill={'white'} />
      </View>
    )
  } else {
    return (
      <GlobalState {...defaultSettings}>
        <MyStatusBar />
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </GlobalState>
    )
  }  
}

const App = () => {

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SplashScreen />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App