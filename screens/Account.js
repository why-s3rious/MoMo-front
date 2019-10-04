import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage, ImageBackground } from 'react-native';
import * as Facebook from 'expo-facebook';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import Modal, { ModalContent, ModalTitle, } from 'react-native-modals';
import { async } from 'q';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            isConnect: null,
            modalVisible: false,
            nameChange: ''
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
            console.log(`Error Info: ${error}`);
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
            console.log(`Error Info: ${error}`);
        }
    }
    componentWillMount = async () => {
        await this.getInfo();
        await this.getInfoFB();
        const { userInfo } = this.state;
        console.log("user", userInfo)
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
        const { isConnect } = this.state;
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
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    changeInfo = async () => {
        alert("Đã lưu");
        this.setModalVisible(!this.state.modalVisible)
    }
    render() {
        const { userInfo, isConnect, nameChange } = this.state;
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
                        <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginTop: 20, }}>
                            <Text style={styles.InfoTextName}>Họ & tên: {nameChange === "" ? userInfo.name : nameChange}</Text>
                            <AntDesign name={'edit'} size={23} color="black" onPress={() => { this.setModalVisible(true) }} />
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible}
                                onTouchOutside={() => { this.setModalVisible(!this.state.modalVisible) }}
                                modalTitle={<ModalTitle title="Thay đổi thông tin" />}
                            >
                                <ModalContent>
                                    <TextInput
                                        placeholder="Nhập tên của bạn"
                                        style={{ width: 250, height: 50, borderRadius: 10, marginVertical: 10 }}
                                        onChangeText={text => this.setState({ nameChange: text })} />
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={{ backgroundColor: "#22863A", width: 50, height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                                            onPress={this.changeInfo}
                                        >
                                            <Text style={{ fontSize: 15, fontWeight: "400", color: 'white' }}>Lưu</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ backgroundColor: "#FFF", width: 50, height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red' }}
                                            onPress={() => { this.setModalVisible(!this.state.modalVisible) ;this.setState({ nameChange: '' }) }}
                                        >
                                            <Text style={{ fontSize: 15, fontWeight: "400", color: 'red' }}>Hủy</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ModalContent>
                            </Modal>
                        </View>
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
        fontSize: 20,
        fontWeight: '400'
    },
    InfoTextName: {
        fontSize: 20,
        fontWeight: '400',
        marginRight: 10,
        marginBottom: 20
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
