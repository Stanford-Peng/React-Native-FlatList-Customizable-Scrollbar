import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Animated } from 'react-native';
export default ({
    indicatorHeight = 100,
    flexibleIndicator = true,

    shouldIndicatorHide = false,
    hideTimeout = 500,
    style = {height:300},

    scrollViewStyle = {},
    scrollIndicatorContainerStyle = {},
    scrollIndicatorStyle = {},

    // data,
    // renderItem,
    // keyExtractor,
    // showsVerticalScrollIndicator=false,
    // persistentScrollbar=false,
    // scrollIndicatorInsets={ right: 5 },
    ...props


}) => {


    const [fadeAnim] = useState(
        new Animated.Value(shouldIndicatorHide ? 0 : 1),
    );
    const [fromTop, setFromTop] = useState(0);

    const [indicatorFlexibleHeight, setIndicatorFlexibleHeight] = useState(
        indicatorHeight,
    );
    const [visibleScrollPartHeight, setVisibleScrollPartHeight] = useState(1);

    const [fullSizeContentHeight, setFullSizeContentHeight] = useState(1);
    const [isIndicatorHidden, setIsIndicatorHidden] = useState(
        shouldIndicatorHide,
    );

    const [
        scrollIndicatorContainerHeight,
        setScrollIndicatorContainerHeight,
    ] = useState(1);

    const handleScroll = ({ contentOffset }) => {
        //Calculation scroll indicator position based on child height and scrollView view height)
        const movePercent =
            contentOffset.y /
            ((fullSizeContentHeight - visibleScrollPartHeight) / 100);
        const position =
            ((visibleScrollPartHeight -
                indicatorFlexibleHeight -
                (visibleScrollPartHeight - scrollIndicatorContainerHeight)) /
                100) *
            movePercent;
        setFromTop(position);
    };

    useEffect(() => {
        //Hide / show Animation effect
        if (shouldIndicatorHide) {
            isIndicatorHidden
                ? Animated.timing(fadeAnim, {
                      toValue: 0,
                      duration: hideTimeout,
                      useNativeDriver: true,
                  }).start()
                : Animated.timing(fadeAnim, {
                      toValue: 1,
                      duration: hideTimeout,
                      useNativeDriver: true,
                  }).start();
        }
    }, [fadeAnim, hideTimeout, isIndicatorHidden, shouldIndicatorHide]);

    useEffect(() => {
        //Change indicator height effect
        flexibleIndicator &&
            setIndicatorFlexibleHeight(
                visibleScrollPartHeight *
                    (visibleScrollPartHeight / fullSizeContentHeight),
            );
    }, [visibleScrollPartHeight, fullSizeContentHeight, flexibleIndicator]);

    const runHideTimer = () => {
        shouldIndicatorHide && setIsIndicatorHidden(true);
    };

    const showIndicator = () => {
        shouldIndicatorHide && setIsIndicatorHidden(false);
    };

    const isContentSmallerThanScrollView =
        fullSizeContentHeight - visibleScrollPartHeight <= 0;

        

    return (
        

        <View style={[styles.container,style]}>
            {/* {console.log(props)} */}
            {/* { console.log(renderItem)} */}
            <FlatList

                style={[styles.scrollViewContainer, scrollViewStyle]}
                onContentSizeChange={(width, height) => {
                    if(height>0) {setFullSizeContentHeight(height);}
                }}
                onLayout={e =>
                    setVisibleScrollPartHeight(e.nativeEvent.layout.height)
                }
                onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}

                scrollEventThrottle={16}
                
                onMomentumScrollEnd={() => runHideTimer()}
                onScrollBeginDrag={() => showIndicator()}
                showsVerticalScrollIndicator={false}

                //customize data
                // data={data}
                // renderItem={renderItem}
                // keyExtractor={keyExtractor}

                // showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                // persistentScrollbar={persistentScrollbar} 
                // scrollIndicatorInsets={scrollIndicatorInsets}
                {...props}

            />

            {!isContentSmallerThanScrollView && (
                <Animated.View
                    style={[
                        styles.scrollIndicatorContainer,
                        { opacity: fadeAnim },
                        scrollIndicatorContainerStyle,
                    ]}
                    onLayout={e =>
                        setScrollIndicatorContainerHeight(
                            e.nativeEvent.layout.height,
                        )
                    }
                >
                    <View
                        style={[
                            styles.scrollIndicator,
                            { top: fromTop, height: indicatorFlexibleHeight },
                            scrollIndicatorStyle,
                        ]}
                    />
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({

    //conflict with showing flatlist: styles.container styles.scrollViewContainer
    container: {
        // flex: 1,
        // borderWidth:1,
        // flexDirection: 'row',
    },
    scrollViewContainer: {
        // flex: 1,
    },

    scrollIndicatorContainer: {
        position: 'absolute',
        top: 0,
        right: 2,
        bottom: 0,
        overflow: 'hidden',
        borderRadius: 10,
        width: 6,
        marginVertical: 3,
    },
    scrollIndicator: {
        position: 'absolute',
        right: 0,
        width: 6,
        borderRadius: 3,
        opacity: 1,
        backgroundColor: '#F3AD18',
    },
});



