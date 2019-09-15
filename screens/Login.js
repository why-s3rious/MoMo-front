import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputTextUser: '',
            inputTextPass: '',
            account: [],
        };
        this.didFocusSubscription = props.navigation.addListener(
            'willFocus',
            payload => {
                this.getAllAccount();
            }
        );
    }
    async getAllAccount() {
        await this.props.onGetAllAccount();
        this.setState({
            account: this.props.account,
        })
        console.log("load login", this.state.account)
    }
    componentDidMount = () => {
        this.getAllAccount();
    }

    onchangeUser = textUser => {
        this.setState({
            inputTextUser: textUser
        })
    }
    onchangePass = textPass => {
        this.setState({
            inputTextPass: textPass
        })
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
    onPressLogin = () => {
        const { inputTextUser, inputTextPass, account } = this.state;
        const resultLogin = account.find(({ username }) => username === inputTextUser);
        if (resultLogin === undefined) {
            alert("Số điện thoại này chưa đăng kí");
            return false
        }
        else {
            if (resultLogin.password === inputTextPass) {
                this.saveKey(resultLogin.jwt);
                this.getKey();
                this.props.navigation.navigate("Main")
            }
            else {
                alert("Mật khẩu không chính xác, vui lòng kiểm tra lại")
                return false;
            }
        }
    }
    onPressSignUp = () => {
        this.props.navigation.navigate("Register");
    }
    render() {
        const { inputTextPass, inputTextUser } = this.state;
        console.log("user", inputTextUser)
        console.log("pass", inputTextPass)
        return (
            <KeyboardAvoidingView enabled behavior="padding" keyboardVerticalOffset="-120" style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.txtTitle}>Welcome to OKE</Text>
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Your phone number"
                        onChangeText={this.onchangeUser}
                        value={inputTextUser}
                        onSubmitEditing={() => this.passwordRef.focus()}
                        blurOnSubmit={false}
                        keyboardType={'number-pad'}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        onChangeText={this.onchangePass}
                        value={inputTextPass}
                        ref={ref => this.passwordRef = ref}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.btnSignin} onPress={this.onPressLogin}>
                        <Text style={styles.txtSignin}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.txtGroup}>
                    <Text style={styles.text} onPress={this.onPressSignUp}>Create Account</Text>
                    <Text style={styles.text}>Forgot Password</Text>
                </View>
            </KeyboardAvoidingView>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B48DFA'
    },
    title: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: "center"
    },
    txtTitle: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    inputGroup: {
        flex: 0.4,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 10,
    },
    textInput: {
        width: 300,
        height: 50,
        borderRadius: 50,
        marginVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#F6F8FA"
    },
    buttonGroup: {
        flex: 0.1,
        alignItems: 'center',
        flexDirection: 'column'
    },
    btnSignin: {
        backgroundColor: 'pink',
        borderRadius: 50,
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSignin: {
        color: 'black',
        fontSize: 25,
        fontWeight: '400'
    },
    txtGroup: {
        flexDirection: 'row',
        flex: 0.3,
        justifyContent: 'space-around',
        marginVertical: 5
    },
    text: {
        textDecorationLine: 'underline',
        fontWeight: '400'
    }
})
