import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage, ImageBackground } from 'react-native';
import * as Facebook from 'expo-facebook';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
        };
        this.didFocusSubscription = props.navigation.addListener(
            'willFocus',
            payload => {
                this.setState({
                    userInfo: this.props.userInfo,
                })
            }
        );
    }
    getInfoFB = async () => {
        try {
            const token = await AsyncStorage.getItem("@Token");
            await this.props.onGetInfoFb(token);
            const result = this.props.userInfo
            console.log("1", result)
            if (result.error.code !== 190) {
                this.setState({
                    userInfo: this.props.userInfo,
                })
            }
            else
                console.log("Login with Username/Password")
        } catch (error) {
            alert(`Error Info: ${error}`);
        }
    }
    async getInfo() {
        try {
            const token = await AsyncStorage.getItem("@Token");
            await this.props.onGetInfo(token);
            const result = this.props.userInfo
            console.log("1", result)
            if (result !== 401) {
                this.setState({
                    userInfo: this.props.userInfo,
                })
            }
            else
                console.log("Login with Facebook")
        } catch (error) {
            alert(`Error Info: ${error}`);
        }
    }
    componentWillMount = () => {
        this.getInfo();
        this.getInfoFB();
        const { userInfo } = this.state;
        console.log("component", this.state.isConnect)
        if (userInfo.fb_id === null) {
            this.setState({
                isConnect: false
            })
        }
        else {
            this.setState({
                isConnect: true
            })
        }
    }
    async resetKey() {
        try {
            await AsyncStorage.removeItem('@Token');
            console.log("Token remove")
        } catch (error) {
            console.log("Error resetting data" + error);
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
    onPressLogoutButton = () => {
        this.getKey();
        this.resetKey();
        this.getKey();
        this.props.navigation.navigate("Login");
    }
    onPressSignInFb = async () => {
        const { userInfo, isConnect } = this.state;
        try {
            if (isConnect === false) {
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
                    const userInfoFB = await response.json();
                    console.log("user_info", userInfoFB);
                    const fb_id = { "fb_id": userInfoFB.id };
                    console.log("fb_id nè", fb_id)
                    const tokenlocal = await AsyncStorage.getItem('@Token');
                    await this.props.onConnectFb(fb_id, tokenlocal);
                    const result = this.props.userInfo;
                    if (result.hasOwnProperty('message')) {
                        alert("Kết nối với Facebook thành công");
                        this.setState({
                            isConnect: true
                        })
                    }
                    else {
                        alert("Kết nối với Facebook thất bại");
                        return false;
                    }
                } else {
                    alert("Kết nối với Facebook không thành công");
                    return false;
                }
            }
            else {
                console.log("Ngắt kết nối");
                const tokenlocal = await AsyncStorage.getItem('@Token');
                await this.props.onDisConnectFb(tokenlocal);
                const result = this.props.userInfo;
                if (result.hasOwnProperty('message')) {
                    alert("Ngắt kết nối với Facebook thành công");
                    this.setState({
                        isConnect: false
                    })
                }
                else {
                    alert("Ngắt kết nối với Facebook thất bại");
                    return false;
                }
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    render() {
        const { userInfo, isConnect } = this.state;
        console.log("connect", isConnect)
        return (
            <ImageBackground source={require('../assets/Onboarding.png')} style={{ width: "100%", height: "100%" }}>
                <View style={styles.container}>
                    <View style={styles.Header}>
                        <TouchableOpacity style={{ width: 200, height: 200, borderRadius: 100 }}
                            onPress={() => {
                                this.props.navigation.navigate("UploadPicture");
                            }}
                        >
                            <Image
                                source={require('../assets/accountavt.png')}
                                style={{ width: 200, height: 200, borderRadius: 100, borderWidth: 0.5, borderColor: 'gray' }}
                            />
                        </TouchableOpacity>
                        <Text style={styles.InfoText}>{userInfo.name}</Text>
                        <Text style={styles.InfoText}>Số điện thoại: {userInfo.phone}</Text>
                    </View>
                    <View style={styles.Content}>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity onPress={this.onPressSignInFb} style={isConnect ? styles.disConnect : styles.connect}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{isConnect ? "Ngắt kết nối Facebook" : "Kết nối với Facebook"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressLogoutButton} style={styles.logoutButton}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    Header: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Content: {
        flex: 0.4,
        justifyContent: 'space-around',
    },
    InfoText: {
        marginTop: 20,
        fontSize: 17,
        fontWeight: '400'
    },
    buttonGroup: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 50,
    },
    logoutButton: {
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 300,
        borderRadius: 50,
        backgroundColor: "#FF5126",
        marginVertical: 10,
    },
    connect: {
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 300,
        borderRadius: 50,
        backgroundColor: "#4267B2",
    },
    disConnect: {
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 300,
        borderRadius: 50,
        backgroundColor: "#FF5126",
    },
});
