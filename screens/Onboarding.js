import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: 'slide1',
        title: 'Title 1',
        text: 'Description.\nRecommend theo xu hướng',
        backgroundColor: '#59b2ab',
    },
    {
        key: 'slide2',
        title: 'Title 2',
        text: 'Description.\nRecommend theo túi tiền',
        backgroundColor: '#febe29',
    },
    {
        key: 'slide3',
        title: 'Title 3',
        text: 'Description.\nRecommend theo vị trí',
        backgroundColor: '#22bcb5',
    }
];
export default class Onboarding extends React.Component {
    onDone = () => {
        this.props.navigation.navigate("Login")
    }
    render() {
        return (
            <AppIntroSlider
                slides={slides}
                showNextButton
                showSkipButton
                showDoneButton
                onSkip={this.onDone}
                onDone={this.onDone}
            />
        );
    }
}
