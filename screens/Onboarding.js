import React from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: 'slide1',
        title: 'Title 1',
        image: require('../assets/Onboarding1.png'),
        text: 'Description.\nRecommend theo xu hướng',
    },
    {
        key: 'slide2',
        title: 'Title 2',
        image: require('../assets/Onboarding2.png'),
        text: 'Description.\nRecommend theo túi tiền',
    },
    {
        key: 'slide3',
        title: 'Title 3',
        image: require('../assets/Onboarding3.png'),
        text: 'Description.\nRecommend theo vị trí',
    }
];
export default class Onboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }
    onDone = () => {
        this.setState({ isLoading: true })
        setTimeout(async () => {
            if (await AsyncStorage.getItem('@Token') !== null) {
                this.props.navigation.navigate('Main')
            }
            else {
                this.props.navigation.navigate("Logo")
            }
        }, 2000)
    }
    renderItem = ({ item }) => {
        return (
            <View style={styles.mainContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Image style={styles.image} source={item.image} />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    }
    render() {
        const { isLoading } = this.state;
        if (isLoading) {
            return (
                <View style={styles.mainContent}>
                    <ActivityIndicator size="large" color="black" />
                    <Text style={{color: 'gray', fontSize: 13, marginTop: 5}}>Vui lòng chờ trong giây lát</Text>
                </View>
            )
        }
        else {
            return (
                <AppIntroSlider
                    renderItem={this.renderItem}
                    slides={slides}
                    showNextButton
                    showSkipButton
                    showDoneButton
                    onSkip={this.onDone}
                    onDone={this.onDone}
                    backgroundColor='gray'
                    buttonStyle={styles.buttonStyle}
                    buttonTextStyle={styles.buttonTextStyle}
                    activeDotStyle={styles.activeDotStyle}
                />
            );
        }
    }
}
const styles = StyleSheet.create({
    mainContent: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    activeDotStyle: {
        backgroundColor: 'black'
    },
    buttonStyle: {
        width: 70,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTextStyle: {
        color: 'black'
    },
    image: {
        width: "100%",
        height: "105%",
        marginVertical: 10,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        color: 'black',
        textAlign: 'center',
    },
});
