import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    onPressSignIn = () => {
        this.props.navigation.navigate("Login");
    }
    onPressSignUp = () => {
        this.props.navigation.navigate("Register");
    }
    render() {
        return (
            <ImageBackground source={require('../assets/LogoScreen.png')} style={{ width: "100%", height: "100%" }}>
                <View style={styles.container}>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.buttonSignIn} onPress={this.onPressSignIn}>
                            <Text style={styles.textSignIn}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSignUp} onPress={this.onPressSignUp}>
                            <Text style={styles.textSignUp}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonGroup: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 350,
        justifyContent: 'space-around',
        paddingHorizontal: 30
    },
    buttonSignIn: {
        backgroundColor: '#00CFB5',
        width: 130,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    textSignIn: {
        color: 'white',
        fontSize: 25,
        fontWeight: '400'
    },
    buttonSignUp: {
        backgroundColor: 'white',
        width: 130,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#00CFB5'
    },
    textSignUp: {
        color: '#00CFB5',
        fontSize: 25,
        fontWeight: '400'
    },
})
