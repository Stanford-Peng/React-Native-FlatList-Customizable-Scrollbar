# React-Native-FlatList-Customizable-Scrollbar

This is a template file edited based on [react-native-scroll-indicator](https://github.com/mishabelokon/react-native-scroll-indicator/) since it only supports ScrollView rather than flatlist. In practice, I frequently need to customize the flatlist scrollable bar on iOS(it can persist the scroll bar despite the iOS UI guideline) and Android. Therefore I put it in the github so that maybe others can use it

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
 
 
 ## Maijor Props can be used(others can be refered in the code. It is a small file):
scrollViewStyle: customize the view style wrapping the FlatList 
scrollIndicatorStyle- customize the indicator(scrollbar) style such as:
        position: 'absolute',
        right: 0,
        width: 6,
        borderRadius: 3,
        opacity: 1,
        backgroundColor: '#F3AD18'
scrollIndicatorContainerStyle- customize the indicator container(the background slot containing the indicator bar) style such as:
        position: 'absolute',
        top: 0,
        right: 2,
        bottom: 0,
        overflow: 'hidden',
        borderRadius: 10,
        width: 6,
        marginVertical: 3,
        backgroundColor: '#E5E5E5'
 
 
