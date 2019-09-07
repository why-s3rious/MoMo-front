import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

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
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image
                        source={require('../assets/logoOKE.png')}
                        style={{ width: 200, height: 300 }}
                    />
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.buttonSignIn} onPress={this.onPressSignIn}>
                        <Text style={styles.textSignIn}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.buttonSignUp} onPress={this.onPressSignUp}>
                        <Text style={styles.textSignUp}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    image: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonGroup: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-around',
        paddingHorizontal: 30
    },
    buttonSignIn: {
        backgroundColor: 'blue',
        width: 130,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
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
        borderColor: 'blue'
    },
    textSignUp: {
        color: 'blue',
        fontSize: 25,
        fontWeight: '400'
    },
})
