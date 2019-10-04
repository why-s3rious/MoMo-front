import React, { Component } from 'react';
import { ImageBackground, AsyncStorage } from 'react-native';
import { async } from 'q';

export default class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadding: true
        };
    }
    async componentDidMount() {
        setTimeout(async () => {
            const firstLoad = await AsyncStorage.getItem("@Firstload");
            console.log("first", firstLoad);
            if(firstLoad!==null){
                this.props.navigation.navigate("Logo")
            }
            else{
                this.props.navigation.navigate("Onboarding")
            }
        },500)
    }
    render() {
        return (
            <ImageBackground source={require('../assets/splash.png')} style={{width: "100%", height: "100%"}} />
        );
    }
}
