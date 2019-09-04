import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

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
    render() {
        const { inputTextUser, inputTextPass } = this.state
        return (
            <View style={styles.container}>
                <View>
                    <TextInput style={styles.textInput} onChangeText={this.onchangeUser} value={inputTextUser} />
                </View>
                <View>
                    <TextInput style={styles.textInput} onChangeText={this.onchangePass} value={inputTextPass} />
                </View>
                <View>
                    <TouchableOpacity onPress={this.onPressLogin}>
                        <Text>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30, 
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    textInput: {
        width: 100,
        height: 30,
        borderWidth: 1
    },
})
