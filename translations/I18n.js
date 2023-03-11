import { I18n as I18nJS } from "i18n-js"
import { I18nManager } from "react-native"
import * as RNLocalize from "react-native-localize"

const translatedTexts = {
  en: require("./en.json"),
  it: require("./it.json"),
  nb: require("./nb.json"),
}
    
// fallback and current language
const fallback = { languageTag: 'en', isRTL: false }
const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(Object.keys(translatedTexts)) || fallback

// update layout direction
I18nManager.forceRTL(isRTL)

// populate correct translated
const translationsWithFallback = { 
  ...translatedTexts,
  [languageTag]: translatedTexts[languageTag],
  [fallback.languageTag]: translatedTexts[fallback.languageTag],
}

// configure i18n
const I18n = new I18nJS()
I18n.translations = translationsWithFallback
I18n.locale = languageTag
I18n.enableFallback = true
I18n.fallbackLanguage = fallback.languageTag
    
export default I18n