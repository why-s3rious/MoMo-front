import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputTextUser: '',
            inputTextPass: '',
            text: "Dùng số điện thoại đã đăng kí \n    để đăng nhập vào O.K.E"
            // account: [],
        };
        // this.didFocusSubscription = props.navigation.addListener(
        //     'willFocus',
        //     payload => {
        //         this.setState({
        //             inputTextPass: '',
        //             inputTextUser: ''
        //         })
        //     }
        // );
    }
    componentDidMount = () => {
        this.setState({
            inputTextUser: '',
            inputTextPass: ''
        })
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
    onPressLogin = async () => {
        try {
            const { inputTextUser, inputTextPass } = this.state;
            let data = {
                "phone": inputTextUser,
                "password": inputTextPass
            }
            await this.props.onLogin(data);
            const getToken = this.props.successLogin
            if ('token' in getToken) {
                this.saveKey(getToken.token);
                this.getKey();
                this.props.navigation.navigate("Main");
            }
            else {
                alert("Sai tài khoản hoặc mật khẩu");
                return false;
            }
        } catch (error) {
            alert("Sai tài khoản hoặc mật khẩu");
            console.log(`Login error: ${error}`);
            return false;
        }
    }
    onPressSignUp = () => {
        this.props.navigation.navigate("Register");
    }

    render() {

        const { inputTextPass, inputTextUser, text } = this.state;
        // console.log("user", inputTextUser)
        // console.log("pass", inputTextPass)
        return (
            <KeyboardAvoidingView enabled behavior="padding" keyboardVerticalOffset="-180" style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.txtTitle1}>Đăng Nhập O.K.E</Text>
                    <Text style={styles.txtTitle2}>Nhập số điện thoại</Text>
                    <Text style={styles.txtTitle3}>{text}</Text>
                </View>
                <View style={styles.inputGroup}>
                    <View style={styles.input}>
                        <Feather name={'phone'} size={27} color="gray" style={styles.icon} />
                        <TextInput
                            style={styles.inputTextStyle}
                            placeholder="Nhập số điện thoại"
                            onChangeText={this.onchangeUser}
                            value={inputTextUser}
                            onSubmitEditing={() => this.passwordRef.focus()}
                            blurOnSubmit={false}
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <View style={styles.input}>
                        <Feather name={'lock'} size={27} color="gray" style={styles.icon} />
                        <TextInput
                            style={styles.inputTextStyle}
                            placeholder="Nhập mật khẩu"
                            onChangeText={this.onchangePass}
                            value={inputTextPass}
                            ref={ref => this.passwordRef = ref}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.btnSignin} onPress={this.onPressLogin}>
                        <Text style={styles.txtSignin}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.txtGroup}>
                    <Text style={styles.text} onPress={this.onPressSignUp}>Tạo tài khoản</Text>
                    <Text style={styles.text}>Quên mật khẩu</Text>
                </View>
            </KeyboardAvoidingView>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: 50,
        marginTop: 60
    },
    txtTitle1: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    txtTitle2: {
        fontSize: 25,
        fontWeight: '300',
        marginTop: 50,
        marginBottom: 15,
    },
    txtTitle3: {
        fontSize: 16,
        paddingHorizontal: 23
    },
    inputGroup: {
        flex: 0.3,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        paddingHorizontal: 15,
        borderRadius: 50,
        margin: 10,
        width: 300,
        height: 50
    },
    icon: {
        marginRight: 10,
    },
    buttonGroup: {
        flex: 0.1,
        alignItems: 'center',
        flexDirection: 'column'
    },
    btnSignin: {
        backgroundColor: '#00CFB5',
        borderRadius: 50,
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSignin: {
        color: 'white',
        fontSize: 20,
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
    },
    inputTextStyle: {
        flex: 1,
    }
})
