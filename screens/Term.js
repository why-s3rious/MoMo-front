import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Term extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            phone: '',
            password: '',
            confirm: '',
            isWrongPass: false,
            isWrongPhone: false,
        };
    }
    onPressDone = async (username, fb_id) => {
        try {
            const { phone, password } = this.state
            const accountInfo = {
                "phone": phone,
                "password": password,
                "name": username,
                "fb_id": fb_id
            }
            await this.props.onRegister(accountInfo);
            let result = this.props.account;
            console.log("result: ", result)
            if (result.message === "success") {
                alert("Đăng kí thành công hãy đăng nhập để tiếp tục")
                this.props.navigation.navigate("Login")
            }
            else {
                if (result === 400) {
                    alert("Số điện thoại này đã được đăng kí")
                    return false
                }
            }

        } catch (error) {
            alert(`Register error: ${error}`);
        }
    }
    onPressCancel = () => {
        this.setState({
            showAlert: true
        })
    }
    checkPass = () => {
        const { password } = this.state
        if (password.length < 6) {
            this.setState({
                isWrongPass: true
            })
        }
        else {
            this.setState({
                isWrongPass: false
            })
        }
    }
    checkPhone = () => {
        const { phone } = this.state
        if (phone.length < 10 || phone.length > 11) {
            this.setState({
                isWrongPhone: true
            })
        }
        else {
            this.setState({
                isWrongPhone: false
            })
        }
    }
    onchangePhone = textPhone => {
        this.setState({
            phone: textPhone
        })
    }
    onchangePass = textPass => {
        this.setState({
            password: textPass
        })
    }
    onchangeConfirm = textConfirm => {
        this.setState({
            confirm: textConfirm
        })
    }
    render() {
        const { showAlert, isWrongPass, isWrongPhone, confirm, password } = this.state;
        const { navigation } = this.props;
        const username = navigation.getParam("username");
        const fb_id = navigation.getParam("fb_id");
        console.log(fb_id)
        return (
            <KeyboardAvoidingView enabled behavior="padding" keyboardVerticalOffset="-150" style={styles.container}>
                <View style={styles.title}>
                    <Image source={require('../assets/iconregister2.png')} style={{ width: 95, height: 25 }} />
                    <Text style={styles.txtTitle}>Đăng Kí</Text>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Image source={require('../assets/iconsmile.png')} style={{ width: 47, height: 42 }} />
                        <Text style={styles.txtTitle1}>Điền nốt thông tin !!!</Text>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nhập số điện thoại"
                        onChangeText={this.onchangePhone}
                        onSubmitEditing={() => this.passwordRef.focus()}
                        blurOnSubmit={false}
                        onEndEditing={this.checkPhone}
                        keyboardType={"number-pad"}
                    />
                    {isWrongPhone && <Text style={{ color: "red" }}>* Số điện thoại không đúng</Text>}
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nhập mật khẩu"
                        onChangeText={this.onchangePass}
                        ref={ref => this.passwordRef = ref}
                        onSubmitEditing={() => this.confirmpasswordRef.focus()}
                        blurOnSubmit={false}
                        onEndEditing={this.checkPass}
                        secureTextEntry={true}
                    />
                    {isWrongPass && <Text style={{ color: "red" }}>* Mật khẩu phải nhiều hơn 6 kí tự</Text>}
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nhập lại mật khẩu"
                        onChangeText={this.onchangeConfirm}
                        ref={ref => this.confirmpasswordRef = ref}
                        secureTextEntry={true}
                    />
                    {confirm != '' && ((confirm === password && confirm != '' && password != '') ? <Text style={{ color: 'green' }}>Mật khẩu trùng khớp</Text> : <Text style={{ color: "red" }}>* Nhập lại mật khẩu chưa trùng khớp</Text>)}
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.btnDone} onPress={() => this.onPressDone(username, fb_id)}>
                        <Text style={styles.txtDone}>HOÀN TẤT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnCancel} onPress={this.onPressCancel}>
                        <Text style={styles.txtCancel}>HỦY</Text>
                    </TouchableOpacity>
                </View>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Hủy Đăng Kí"
                    message="Bạn có chắc chắn muốn hủy?"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    confirmText="Có, hủy nó"
                    cancelText="Không, cảm ơn"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.setState({ showAlert: false })
                    }}
                    onConfirmPressed={() => {
                        this.props.navigation.navigate("Login");
                    }}
                />
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
        flex: 0.4,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textInput: {
        width: 300,
        height: 50,
        textAlign: 'center',
        borderRadius: 50,
        marginVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: "#F6F8FA",
        borderWidth: 1,
    },
    checkBoxWrap: {
        flex: 0.1,
        marginHorizontal: 5,
    },
    buttonGroup: {
        flex: 0.2,
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 5,
    },
    btnDone: {
        backgroundColor: '#46EAD2',
        borderRadius: 50,
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    txtDone: {
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
