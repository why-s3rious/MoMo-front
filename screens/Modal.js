import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
const types = [
    { label: '10.000 - 200.000', value: 0 },
    { label: '200.000 - 1.000.000', value: 1 },
    { label: 'Trên 1.000.000', value: 2 },
    { label: 'Cụ thể', value: 3 }
]

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isDiffrent: false,
            inputTextTo: 0,
            inputTextFrom: 0,
        };
    }
    onPressRadio = value => {
        this.setState({
            value: value,
            isDiffrent: false
        })
        if (value === 3) {
            this.setState({
                isDiffrent: true
            })
        }
    }
    onchangeTo = textTo => {
        this.setState({
            inputTextTo: textTo
        })
        console.log(this.state.inputTextTo)
    }
    onchangeFrom = textFrom => {
        this.setState({
            inputTextFrom: textFrom
        })
        console.log(this.state.inputTextFrom)
    }
    render() {
        const { isDiffrent } = this.state; 
        return (
            <KeyboardAvoidingView enabled behavior="padding" style={styles.container}>
                <View style={styles.goBack}>
                    <TouchableOpacity style={styles.btnBack} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.txtBack}> Trở về </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.title}>
                    <Text style={styles.txtTitle}>Cái này là Modal</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.txtContent}>Mức tiền có thể chi trả được</Text>
                    <View style={styles.radioFrom}>
                        <RadioForm
                            radio_props={types}
                            initial={0}
                            formHorizontal={false}
                            labelHorizontal={true}
                            buttonColor={'#2196f3'}
                            animation={true}
                            onPress={(value) => this.onPressRadio(value)}
                        />
                        {isDiffrent && (
                            <View style={styles.isDiffrentView}>
                                <TextInput
                                    style={styles.textInput}
                                    autoFocus
                                    keyboardType='number-pad'
                                    onChangeText={this.onChangeTo}
                                    onSubmitEditing={() => this.inputfromref.focus()}
                                    blurOnSubmit={false}
                                />
                                <Text>-></Text>
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType='number-pad'
                                    onChangeText={this.onchangeFrom}
                                    ref={ref => this.inputfromref = ref}
                                    onSubmitEditing={Keyboard.dismiss}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    goBack: {
        flex: 0.1,
        marginVertical: 30,
        marginHorizontal: 15,
        justifyContent: 'flex-start'
    },
    title: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: "center",
        marginVertical: 5,
    },
    content: {
        flex: 0.8,
        marginVertical: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column', 
    },
    txtContent: {
        fontSize: 25,
        fontWeight: '600',
        marginVertical: 5,
    },
    radioFrom: {
        marginVertical: 5,
        width: '90%',
        flexDirection: 'column'
    },
    isDiffrentView: {
        flex: 1,
        flexDirection: 'row',
    },
    btnBack: {
        borderRadius: 10,
        height: 30,
        width: 80,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtBack: {
        fontWeight: '400'
    },
    txtTitle: {
        fontWeight: 'bold',
        fontSize: 35
    },
    textInput: {
        width: 100,
        height: 30,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
    },
})
