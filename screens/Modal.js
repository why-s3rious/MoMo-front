import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { AntDesign } from '@expo/vector-icons';


const typesMoney = [
    { label: 'Hãy làm tôi ngạc nhiên', value: 0 },
    { label: 'Tùy chọn', value: 1 },
]

const typesDistance = [
    { label: 'Hãy làm tôi ngạc nhiên', value: 0 },
    { label: 'Tùy chọn', value: 1 }
]

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueMoney: 0,
            valueDistance: 0,
            isDiffrentDistance: false,
            isDiffrentMoney: false,
            inputTextDistanceTo: 0,
            inputTextDistanceFrom: 0,
            inputTextMoneyTo: 0,
            inputTextMoneyFrom: 0,
            showDistance: false,
            showMoney: false
        };
    }
    onPressRadioMoney = value => {
        this.setState({
            valueMoney: value,
            isDiffrentMoney: false,
        })
        if (value === 1) {
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
    onchangeDistanceTo = textTo => {
        this.setState({
            inputTextDistanceTo: textTo
        })
    }
    onchangeDistanceFrom = textFrom => {
        this.setState({
            inputTextDistanceFrom: textFrom
        })
    }
    onchangeMoneyTo = textTo => {
        this.setState({
            inputTextMoneyTo: textTo
        })
    }
    onchangeMoneyFrom = textFrom => {
        this.setState({
            inputTextMoneyFrom: textFrom
        })
    }
    onPressShowDistance = () => {
        const { showDistance } = this.state;
        this.setState({
            showDistance: !showDistance
        })
    }
    onPressShowMoney = () => {
        const { showMoney } = this.state;
        this.setState({
            showMoney: !showMoney
        })
    }
    render() {
        const { isDiffrentMoney, isDiffrentDistance, showDistance, showMoney, inputTextDistanceFrom, inputTextDistanceTo, inputTextMoneyFrom, inputTextMoneyTo } = this.state;
        console.log(inputTextDistanceFrom,inputTextDistanceTo)
        return (
            <KeyboardAvoidingView enabled behavior='height' style={styles.container}>
                <View style={styles.goBack}>
                    <TouchableOpacity style={styles.btnBack} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.txtBack}> Trở về </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.title}>
                    <Text style={styles.txtTitle}>Bộ lọc</Text>
                </View>
                <View style={styles.content}>
                    <ScrollView>
                        <View style={styles.contentDistance}>
                            <View style={styles.titleContent}>
                                <Image source={require('../assets/iconmap.png')} style={{ width: 30, height: 30 }} />
                                <Text style={styles.txtContent}>Vị trí</Text>
                                <AntDesign name={!showDistance ? "right" : "down"} size={27} color="black" onPress={this.onPressShowDistance} />
                            </View>
                            {showDistance && (
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
                                            <View style={styles.text}>
                                                <Text>Từ</Text>
                                            </View>
                                            <TextInput
                                                style={styles.textInput}
                                                autoFocus
                                                keyboardType='number-pad'
                                                onChangeText={this.onchangeDistanceFrom}
                                                onSubmitEditing={() => this.inputfromref.focus()}
                                                blurOnSubmit={false}
                                            />
                                            <View style={styles.text}>
                                                <Text>đến</Text>
                                            </View>
                                            <TextInput
                                                style={styles.textInput}
                                                keyboardType='number-pad'
                                                onChangeText={this.onchangeDistanceTo}
                                                ref={ref => this.inputfromref = ref}
                                                onSubmitEditing={Keyboard.dismiss}
                                            />
                                            <View style={styles.text}>
                                                <Text>kilomet</Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                        <View style={styles.contentMoney}>
                            <View style={styles.titleContent}>
                                <Image source={require('../assets/iconmoney.png')} style={{ width: 30, height: 30 }} />
                                <Text style={styles.txtContent}>Mức tiêu dùng</Text>
                                <AntDesign name={!showMoney ? "right" : "down"} size={27} color="black" onPress={this.onPressShowMoney} />
                            </View>
                            {showMoney && (
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
                                            <View style={styles.text}>
                                                <Text>Từ</Text>
                                            </View>
                                            <TextInput
                                                style={styles.textInput}
                                                autoFocus
                                                keyboardType='number-pad'
                                                onChangeText={this.onchangeMoneyFrom}
                                                onSubmitEditing={() => this.inputfromref.focus()}
                                                blurOnSubmit={false}
                                            />
                                            <View style={styles.text}>
                                                <Text>đến</Text>
                                            </View>
                                            <TextInput
                                                style={styles.textInput}
                                                keyboardType='number-pad'
                                                onChangeText={this.onchangeMoneyTo}
                                                ref={ref => this.inputfromref = ref}
                                                onSubmitEditing={Keyboard.dismiss}
                                            />
                                            <View style={styles.text}>
                                                <Text>VND</Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            )}
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
        marginTop: 30,
        marginHorizontal: 15,
        justifyContent: 'flex-start'
    },
    title: {
        flex: 0.1,
        justifyContent: 'flex-start',
        alignItems: "center",
        marginVertical: 5,
    },
    content: {
        flex: 0.8,
        marginVertical: 5,
    },
    titleContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: 10
    },
    contentMoney: {
        marginBottom: 5,
    },
    contentDistance: {
        marginVertical: 5,
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
        marginVertical: 10,
        width: '90%',
        flexDirection: 'column',
        paddingHorizontal: 10
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
        textAlign: 'center'
    },
})
