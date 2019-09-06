import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    onPressNext = () => {
        this.props.navigation.navigate("Term")
    }
    onPressCancel = () => {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <KeyboardAvoidingView enabled behavior="padding" keyboardVerticalOffset="-100" style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.txtTitle}>Sign Up</Text>
                </View>
                <View style={styles.inputGroup}>
                    <TextInput style={styles.textInput} placeholder="Email" onChangeText={this.onchangeEmail} />
                    <TextInput style={styles.textInput} placeholder="Password" onChangeText={this.onchangePass} />
                    <TextInput style={styles.textInput} placeholder="Confirm Password" onChangeText={this.onchangeConfirm} />
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.btnNext} onPress={this.onPressNext}>
                        <Text style={styles.txtNext}>Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnCancel} onPress={this.onPressCancel}>
                        <Text style={styles.txtCancel}>Cancel</Text>
                    </TouchableOpacity>
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
        marginVertical: 5,
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
        flex: 0.3,
        alignItems: 'center',
        flexDirection: 'column',
    },
    btnNext: {
        backgroundColor: 'pink',
        borderRadius: 50,
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    txtNext: {
        color: 'black',
        fontSize: 25,
        fontWeight: '400'
    },
    btnCancel: {
        borderWidth: 1,
        borderRadius: 50,
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtCancel: {
        color: 'black',
        fontSize: 25,
        fontWeight: '400'
    },
})
