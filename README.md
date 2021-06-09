# React-Native-FlatList-Customizable-Scrollbar

This is a template file edited based on [react-native-scroll-indicator](https://github.com/mishabelokon/react-native-scroll-indicator/) since it only supports ScrollView rather than flatlist. In practice, we frequently need to customize the flatlist scrollable bar on iOS(it can persist the scroll bar despite the iOS UI guideline) and Android.

Usage:
1. Download the template
2. import it to your file:
```import ScrollListIndicator from '../templates/ScrollListIndicator'```
3. use it like normal FlatList by passing data, renderItem:
```
<ScrollListIndicator
          scrollViewStyle={styles.cart}
          //for flatlist style:
          style={{height:300}}
          data={items} 
          keyExtractor = {
            (item) => item.itemId.toString()
          } 


          renderItem={ 
            ({item}) => 
            <CartItem item={item} 
            synAmount = {synAmount} >

            </CartItem>
          }
          showsVerticalScrollIndicator={false} 
          persistentScrollbar={false} 
          scrollIndicatorInsets={{ right: 5 }}
          scrollIndicatorStyle={{backgroundColor:'#F3AD18'}}
          scrollIndicatorContainerStyle={{backgroundColor:'#E5E5E5'}}
 />
 ```
 4. Effect:
 ![result](https://github.com/Stanford-Peng/React-Native-FlatList-Customizable-Scrollbar/blob/main/imgs/WechatIMG8.png)
 
