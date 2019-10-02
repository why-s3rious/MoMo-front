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
        if ( username == "") {
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
                    <Image source={require('../assets/iconregister1.png')} style={{width: 95, height: 25}} />
                    <Text style={styles.txtTitle}>Đăng Kí</Text>
                    <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Image source={require('../assets/iconsmile.png')} style={{width: 47, height: 42,}} />
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
                    {isWrongName && <Text style={{color: 'red'}}>* Chưa nhập họ tên</Text>}
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.btnNext} onPress={this.onPressNext}>
                        <Text style={styles.txtNext}>TIẾP TỤC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnCancel} onPress={this.onPressCancel}>
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
        backgroundColor: '#FFF'
    },
    title: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 30,
    },
    txtTitle: {
        fontSize: 35,
        fontWeight: '600',
        marginVertical: 20,
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
        width: 300,
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
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 5,
    },
    btnNext: {
        backgroundColor: '#46EAD2',
        borderRadius: 50,
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    txtNext: {
        color: 'white',
        fontSize: 20,
        fontWeight: '400'
    },
    btnCancel: {
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "red",
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtCancel: {
        color: 'red',
        fontSize: 20,
        fontWeight: '400'
    },
})
