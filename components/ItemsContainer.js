import { StyleSheet, View } from "react-native"

/* 
 *  Simple container of items.
*/
const ItemsContainer = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
})

export default ItemsContainer;