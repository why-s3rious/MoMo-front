import React, { Component } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { red } from 'ansi-colors';
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isWrongName: false,
        }
    }
    onChangeText = text => {
        this.setState({
            username: text
        })
    }
    onPressNext = () => {
        const { username } = this.state;
        if (username == "") {
            alert("Không được để trống")
            return false
        }
        // if (password.length < 6) {
        //     alert("Mật khẩu cần nhiều hơn 6 kí tự")
        //     return false;
        // }
        // if (password != confirm) {
        //     alert("Nhập lại mật khẩu chưa trùng khớp")
        //     return false
        // }
        else {
            this.props.navigation.navigate("Term", { username: username })
        }
    }
    onPressCancel = () => {
        this.props.navigation.goBack();
    }
    checkName = () => {
        const { username } = this.state
        if (username == "") {
            this.setState({
                isWrongName: true
            })
        }
        else {
            this.setState({
                isWrongName: false
            })
        }
    }
    render() {
        const { isWrongName } = this.state;
        return (
            <KeyboardAvoidingView enabled behavior="height" keyboardVerticalOffset="-300" style={styles.container}>
                <View style={styles.title}>
                    <View style={{ paddingVertical: 5, width: "100%", alignItems: 'center' }}>
                        <Image source={require('../assets/iconregister1.png')} resizeMode="contain" />
                    </View>
                    <Text style={styles.txtTitle}>Đăng Kí</Text>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Image source={require('../assets/iconsmile.png')} style={{ width: 47, height: 42, }} />
                        <Text style={styles.txtTitle1}>Nhập tên đi nè !!!</Text>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nhập họ và tên"
                        onChangeText={this.onChangeText}
                        onEndEditing={this.checkName}
                    />
                    {isWrongName && <Text style={{ color: 'red' }}>* Chưa nhập họ tên</Text>}
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.btnNext} onPress={this.onPressNext}>
                        <Image source={require('../assets/like.png')} style={{width: 35, height: 30, marginRight: 5,}} />
                        <Text style={styles.txtNext}>TIẾP TỤC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnCancel} onPress={this.onPressCancel}>
                        <Image source={require('../assets/sad.png')} style={{width: 35, height: 30, marginRight: 10,}} />
                        <Text style={styles.txtCancel}>HỦY</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: 30,
    },
    title: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 25,
    },
    txtTitle: {
        fontSize: 35,
        fontWeight: '600',
        marginVertical: 15,
    },
    txtTitle1: {
        fontSize: 18,
        fontWeight: '200',
        marginLeft: 5,
    },
    inputGroup: {
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textInput: {
        width: 310,
        height: 50,
        textAlign: 'center',
        borderRadius: 50,
        marginVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#F6F8FA",
        borderWidth: 1,
    },
    buttonGroup: {
        flex: 0.5,
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-around',
        paddingHorizontal: 5
    },
    btnNext: {
        backgroundColor: '#46EAD2',
        borderRadius: 50,
        height: 50,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row', 
    },
    txtNext: {
        color: 'white',
        fontSize: 17,
        fontWeight: '500'
    },
    btnCancel: {
        borderWidth: 2,
        borderRadius: 50,
        borderColor: "red",
        height: 50,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    txtCancel: {
        color: 'red',
        fontSize: 17,
        fontWeight: '500'
    },
})
