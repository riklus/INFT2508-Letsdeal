// Base palette.
const colors = {
  important50: '#ff4e4f',
  primary50: '#4280ff',
  primary60: '#3f7af2',
  primary70: '#003eaa',
  accent50: '#00b591',
  accent60: '#00ac8a',
  background10: '#ffffff',
  background20: '#efeef1',
  background50: '#bdb9c5',
  background60: '#abaab4',

  disabled40: '#afafaf',
  disabled50: '#e0e0e0',
  disabled70: '#868686',
  gray10: 'rgba(0,0,0,.07)',
  gray40: 'rgba(0,0,0,.40)',
  gray50: '#606060',
  
  text: 'black',
  textButton: '#ffffff',
  black190: '#212121',
  black200: 'black'
}

const colors2 = {
  important50: '#ff4e4f',
  primary50: '#4280ff',
  primary60: '#3f7af2',
  primary70: '#003eaa',
  accent50: '#00b591',
  accent60: '#00ac8a',
  background10: '#0f0f0f',
  background20: '#202020',
  background50: '#bdb9c5',
  background60: '#ada8b7',

  disabled40: '#606060',
  disabled50: '#e0e0e0',
  disabled70: '#868686',
  gray10: 'rgba(255,255,255,.10)',
  gray20: 'rgba(255,255,255,.10)',
  gray40: 'rgba(255,255,255,.40)',
  gray50: '#606060',
  
  text: 'black',
  textButton: 'white',
  black190: '#212121',
  black200: 'black',

  whiteText: 'rgb(241, 241, 241)'
}

// Semantic colors.
const palettes = {
  'light': {
    background: colors.background10,
    priceText: colors.background10,
    price: colors.important50,
    discount: colors.accent50,
    primaryAction: colors.accent50,
    primaryActionPressIn: colors.accent60,
    secondaryAction: colors.primary50,
    secondaryActionPressIn: colors.primary60,

    disabledAction: colors.disabled50,
    separator: colors.gray10,

    // Greys out the background.
    tapFeedback: colors.gray10,
    grayLogo: colors.background20,

    // The background of an image item.
    tapHighlight: colors.black200,

    remove: colors.important50,

    background: colors.background10,
    searchBackground: colors.background20,
    magnify: colors.background60,

    icon: colors.black190,
    lightDivider: colors.background20,

    deals: colors.accent50,
    map: colors.primary50,
    favorite: colors.important50,
    categories: colors.important50,
    settings: colors.gray50,
    inactive: colors.gray40,
    
    textTitle: colors.black190,
    textParagraph: colors.black190,
    
    textButton: colors.textButton,
    textDisabledButton: colors.disabled70,

    placeholder: colors.disabled40,

    barStyle: 'dark-content'
  },
  'dark': {
    background: colors2.background10,
    price: colors2.important50,
    priceText: colors2.textButton,
    discount: colors2.accent50,
    primaryAction: colors2.accent50,
    primaryActionPressIn: colors2.accent60,
    secondaryAction: colors2.primary50,
    secondaryActionPressIn: colors2.primary60,

    disabledAction: colors2.disabled50,
    separator: colors2.gray20,

    // Greys out the background.
    tapFeedback: colors2.gray10,
    grayLogo: colors.background20,

    // The background of an image item.
    tapHighlight: colors2.whiteText,

    remove: colors2.important50,

    background: colors2.background10,
    searchBackground: colors2.background20,
    magnify: colors2.background50,

    icon: colors2.whiteText,
    lightDivider: colors2.gray10,

    deals: colors2.accent50,
    map: colors2.primary50,
    favorite: colors2.important50,
    categories: colors.important50,
    settings: colors2.gray50,
    inactive: colors2.gray40,
    
    textTitle: colors2.whiteText,
    textParagraph: colors2.whiteText,
    
    textButton: colors2.textButton,
    textDisabledButton: colors2.disabled70,

    placeholder: colors2.disabled40,

    barStyle: 'light-content'
  }
}

export default palettes