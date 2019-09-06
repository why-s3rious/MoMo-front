import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputTextUser: '',
            inputTextPass: '',
        };
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
    onPressLogin = () => {
        this.props.navigation.navigate("Main");
    }
    onPressSignUp = () => {
        this.props.navigation.navigate("Register");
    }
    render() {
        const { inputTextUser, inputTextPass } = this.state
        return (
            <KeyboardAvoidingView enabled behavior="padding" keyboardVerticalOffset="-120" style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.txtTitle}>Welcome to OKE</Text>
                </View>
                <View style={styles.inputGroup}>
                    <TextInput style={styles.textInput} placeholder="Email" onChangeText={this.onchangeUser} value={inputTextUser} />
                    <TextInput style={styles.textInput} placeholder="Password" onChangeText={this.onchangePass} value={inputTextPass} />
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.btnSignin} onPress={this.onPressLogin}>
                        <Text style={styles.txtSignin}>Sign in</Text>
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
