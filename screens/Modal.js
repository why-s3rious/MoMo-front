import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
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
        const { inputTextFrom, inputTextTo } = this.state
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity style={styles.btnBack} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.txtBack}> Trở về </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.txtTitle}>Cái này là Modal</Text>
                </View>
                <View>
                    <Text>Mức tiền có thể chi trả được</Text>
                </View>
                <View>
                    <RadioForm
                        radio_props={types}
                        initial={0}
                        formHorizontal={false}
                        labelHorizontal={true}
                        buttonColor={'#2196f3'}
                        animation={true}
                        onPress={(value) => this.onPressRadio(value)}
                    />
                </View>
                {this.state.isDiffrent && (
                    <View>
                        <TextInput style={styles.textInput} autoFocus keyboardType='number-pad' onChangeText={this.onChangeTo} />
                        <Text>Đến</Text>
                        <TextInput style={styles.textInput} keyboardType='number-pad' onChangeText={this.onchangeFrom} />
                    </View>
                )}
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
    btnBack: {

    },
    txtBack: {

    },
    txtTitle: {

    },
    textInput: {
        width: 100,
        height: 30,
        borderWidth: 1
    },
})
