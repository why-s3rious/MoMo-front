import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage, ImageBackground } from 'react-native';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        };
        this.didFocusSubscription = props.navigation.addListener(
            'willFocus',
            payload => {
                this.setState({
                    userInfo: this.props.userInfo
                })
            }
        );
    }
    getInfoFB = async () => {
        try {
            const token = await AsyncStorage.getItem("@Token");
            await this.props.onGetInfoFb(token);
            const result = this.props.userInfo
            console.log("1",result)
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
            console.log("1",result)
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
    onPressDoneButton = () => {
        this.props.navigation.navigate("Home");
    }

    render() {
        const { userInfo } = this.state;
        console.log("hello", userInfo, userInfo.name)
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
                            <TouchableOpacity onPress={this.onPressDoneButton} style={styles.doneButton}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Xong</Text>
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
    doneButton: {
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 300,
        borderRadius: 50,
        backgroundColor: "#8AFBC5",
    },
});
