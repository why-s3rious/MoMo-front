import React from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage, ActivityIndicator, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: 'slide1',
        background: require('../assets/Onboarding.png'),
        image: require('../assets/Onboarding1.png'),
        text: require('../assets/outstanding.png')
    },
    {
        key: 'slide2',
        background: require('../assets/Onboarding.png'),
        image: require('../assets/Onboarding2.png'),
        text: require('../assets/knowledgeable.png')
    },
    {
        key: 'slide3',
        background: require('../assets/Onboarding.png'),
        image: require('../assets/Onboarding3.png'),
        text: require('../assets/effortless.png')
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
            <ImageBackground source={item.background} style={{ width: "100%", height: "100%" }}>
                <View style={styles.mainContent}>
                    <View style={styles.wrapImg}>
                        <Image style={styles.image} source={item.image} resizeMode="contain" />
                    </View>
                    <View style={styles.wrapTxt}>
                        <Image style={styles.text} source={item.text} resizeMode="contain" />
                    </View>
                </View>
            </ImageBackground>
        );
    }
    render() {
        const { isLoading } = this.state;
        if (isLoading) {
            return (
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <ActivityIndicator size="large" color="black" />
                    <Text style={{ color: 'gray', fontSize: 13, marginTop: 5 }}>Vui lòng chờ trong giây lát</Text>
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
        flex: 1,
    },
    wrapImg: {
        flex: 0.5,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapTxt: {
        flex: 0.5,
        width: "100%",
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10
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
        width: 200,
        height: 200,
    },
    text: {
        width: 250,
        height: 37,
    },
});
