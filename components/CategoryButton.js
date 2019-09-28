import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { screenWidth, screenHeight } from '../costants/DeviceSize';
import { LinearGradient } from 'expo-linear-gradient';

const imgs = [
    {
        "id": 1,
        "image": require('../assets/mass-merchant.jpg')
    },
    {
        "id": 2,
        "image": require('../assets/coffee-dessert.png')
    },
    {
        "id": 3,
        "image": require('../assets/shopping.jpg')
    },
    {
        "id": 4,
        "image": require('../assets/restaurant.jpeg')
    },
    {
        "id": 5,
        "image": require('../assets/fast-food.jpg')
    },
    {
        "id": 6,
        "image": require('../assets/Super-market.jpg')
    },
    {
        "id": 7,
        "image": require('../assets/shopping.jpg')
    },
    {
        "id": 8,
        "image": require('../assets/coffee-dessert.png')
    }
];
class CategoryButton extends Component {

    render() {
        const {
            Data,
            onPress
        } = this.props;
        return (
            imgs.map(item => {
                if (Data.id == item.id) {
                    return (
                        < TouchableOpacity key={Data.id} onPress={onPress}
                            style={styles.CategoryButton}
                        >
                            <ImageBackground
                                style={styles.ImageBackgroundButton}
                                source={item.image}
                                imageStyle={{ borderRadius: 8 }}
                            >
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={['rgba(21, 23, 23, 0.7)', 'rgba(255, 255, 255, 0.4)']}
                                    style={styles.linearGradient}>
                                    <Text style={{ fontSize: 20, color: 'white', fontWeight: "700" }}> {Data.name} </Text>
                                </LinearGradient>
                            </ImageBackground>
                        </TouchableOpacity >
                    )
                }
            })
        );
    }
}

const styles = StyleSheet.create({
    CategoryButton: {
        height: screenHeight * 0.17,
        width: screenWidth * 0.8,
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 30,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5,

    },
    ImageBackgroundButton: {
        height: screenHeight * 0.17,
        width: screenWidth * 0.8,
    },
    linearGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
    }

});
export default CategoryButton;
