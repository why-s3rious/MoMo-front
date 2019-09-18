import React from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: 'slide1',
        title: 'Title 1',
        image: require('../assets/Momo_1.jpg'),
        text: 'Description.\nRecommend theo xu hướng',
    },
    {
        key: 'slide2',
        title: 'Title 2',
        image: require('../assets/Momo_1.jpg'),
        text: 'Description.\nRecommend theo túi tiền',
    },
    {
        key: 'slide3',
        title: 'Title 3',
        image: require('../assets/Momo_1.jpg'),
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
                />
            );
        }
    }
}
const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
    },
    image: {
        width: 50,
        height: 50,
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
