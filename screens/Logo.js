import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, AsyncStorage, ActivityIndicator } from 'react-native';
import * as Facebook from 'expo-facebook';

export default class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
        };
    }
    onPressSignIn = () => {
        this.props.navigation.navigate("Login");
    }
    onPressSignUp = () => {
        this.props.navigation.navigate("Register");
    }
    async saveKey(value) {
        try {
            await AsyncStorage.setItem('@Token', value);
            console.log("Lưu token thành công")
        } catch (error) {
            console.log("Error saving Token" + error);
        }
    }
    async getKey() {
        try {
            const value = await AsyncStorage.getItem('@Token');
            console.log("Token: " + value)
        } catch (error) {
            console.log("Error getting Token" + error);
        }
    }
    onPressSignInFb = async () => {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('1439156022898541', {
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                const userInfo = await response.json();
                const fb_id = { "fb_id": userInfo.id };
                console.log("fb_id: ", fb_id);
                await this.props.onLoginFb(fb_id);
                const islogin = this.props.successLogin
                console.log("islogin",islogin)
                // console.log("islogin", islogin)
                // if (islogin !== 200) {
                //     alert("Đăng nhập Facebook không thành công");
                //     return false;
                // }
                // else {
                //     this.saveKey(islogin.token);
                //     this.getKey();
                //     this.props.navigation.navigate("Main");
                // }
            } else {
                alert("Đăng nhập với Facebook không thành công");
                return false;
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }
    render() {
        if (this.state.load) {
            <View>
                <ActivityIndicator size="large" />
            </View>
        }
        else
            return (
                <ImageBackground source={require('../assets/backgroundlogo.png')} style={{ width: "100%", height: "100%" }}>
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image source={require('../assets/okescreenlogo.png')} style={{ width: 244, height: 244, borderRadius: 244 }} />
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.buttonSignIn} onPress={this.onPressSignIn}>
                                <Text style={styles.textSignIn}>Đăng nhập</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonSignInFb} onPress={this.onPressSignInFb}>
                                <Text style={styles.textSignIn}>Đăng nhập bằng Facebook</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonSignUp} onPress={this.onPressSignUp}>
                                <Text style={styles.textSignUp}>Tạo tài khoản O.K.E</Text>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50
    },
    buttonGroup: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 30,
        marginTop: 100
    },
    buttonSignIn: {
        backgroundColor: '#00CFB5',
        width: 300,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSignInFb: {
        backgroundColor: '#4267B2',
        width: 300,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    textSignIn: {
        color: 'white',
        fontSize: 20,
    },
    buttonSignUp: {
        backgroundColor: 'white',
        width: 300,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#00CFB5'
    },
    textSignUp: {
        color: '#00CFB5',
        fontSize: 20,
    },
})
