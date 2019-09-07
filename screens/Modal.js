import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
const typesMoney = [
    { label: '10.000 - 200.000', value: 0 },
    { label: '200.000 - 1.000.000', value: 1 },
    { label: 'Trên 1.000.000', value: 2 },
    { label: 'Cụ thể', value: 3 }
]

const typesDistance = [
    { label: 'Mặc định (dưới 5km)', value: 0 },
    { label: 'Cụ thể', value: 1 }
]

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueMoney: 0,
            valueDistance: 0,
            isDiffrentDistance: false,
            isDiffrentMoney: false,
            inputTextTo: 0,
            inputTextFrom: 0,
        };
    }
    onPressRadioMoney = value => {
        this.setState({
            valueMoney: value,
            isDiffrentMoney: false,
        })
        if (value === 3) {
            this.setState({
                isDiffrentMoney: true
            })
        }
    }
    onPressRadioDistance = value => {
        this.setState({
            valueDistance: value,
            isDiffrentDistance: false,
        })
        if (value === 1) {
            this.setState({
                isDiffrentDistance: true
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
        const { isDiffrentMoney, isDiffrentDistance } = this.state;
        return (
            <KeyboardAvoidingView enabled behavior='height' style={styles.container}>
                <View style={styles.goBack}>
                    <TouchableOpacity style={styles.btnBack} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.txtBack}> Trở về </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.title}>
                    <Text style={styles.txtTitle}>Cái này là Modal</Text>
                </View>
                <View style={styles.content}>
                    <ScrollView>
                        <View style={styles.contentMoney}>
                            <Text style={styles.txtContent}>Mức tiền có thể chi trả được</Text>
                            <View style={styles.radioFrom}>
                                <RadioForm
                                    radio_props={typesMoney}
                                    initial={0}
                                    formHorizontal={false}
                                    labelHorizontal={true}
                                    buttonColor={'#2196f3'}
                                    animation={true}
                                    onPress={(value) => this.onPressRadioMoney(value)}
                                />
                                {isDiffrentMoney && (
                                    <View style={styles.isDiffrent}>
                                        <TextInput
                                            style={styles.textInput}
                                            autoFocus
                                            keyboardType='number-pad'
                                            onChangeText={this.onChangeTo}
                                            onSubmitEditing={() => this.inputfromref.focus()}
                                            blurOnSubmit={false}
                                        />
                                        <View style={styles.text}>
                                            <Text>Đến</Text>
                                        </View>
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
                        <View style={styles.contentDistance}>
                            <Text style={styles.txtContent}>Khoảng cách</Text>
                            <View style={styles.radioFrom}>
                                <RadioForm
                                    radio_props={typesDistance}
                                    initial={0}
                                    formHorizontal={false}
                                    labelHorizontal={true}
                                    buttonColor={'#2196f3'}
                                    animation={true}
                                    onPress={(value) => this.onPressRadioDistance(value)}
                                />
                                {isDiffrentDistance && (
                                    <View style={styles.isDiffrent}>
                                        <TextInput
                                            style={styles.textInput}
                                            autoFocus
                                            keyboardType='number-pad'
                                            onChangeText={this.onChangeTo}
                                            onSubmitEditing={() => this.inputfromref.focus()}
                                            blurOnSubmit={false}
                                        />
                                        <View style={styles.text}>
                                            <Text>Đến</Text>
                                        </View>
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
                    </ScrollView>
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
    },
    contentMoney: {
        marginVertical: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
    contentDistance: {
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
    text: {
        marginHorizontal: 5,
    },
    radioFrom: {
        marginVertical: 5,
        width: '90%',
        flexDirection: 'column'
    },
    isDiffrent: {
        flexDirection: 'row',
        alignItems: 'center'
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
