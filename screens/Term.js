import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';


let randomJwt = (Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 16));
export default class Term extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false,
            account: [],
            showAlert: false
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
    }
    componentDidMount = () => {
        this.getAllAccount();
    }
    onPressDone = async (username, password) => {
        const { check } = this.state;
        const accountLocal = {
            id: this.state.account.length + 1,
            username: username,
            password: password,
            jwt: randomJwt,
        }
        if (!check) {
            alert("Cần đồng ý điều khoản để tiếp tục")
            return false
        }
        await this.props.onRegister(accountLocal);
        this.props.navigation.navigate("Login")
    }
    onPressCancel = () => {
        // Alert.alert(
        //     'Cancel Sign Up',
        //     'Are you sure you want to cancel?'
        //     [
        //     {
        //         text: 'Cancel',
        //         onPress: () => console.log('Cancel Pressed'),
        //         style: 'cancel'
        //     },
        //     { text: 'OK', onPress: () => this.props.navigation.navigate("Login") }
        //     ],
        //     { cancelable: true }
        // );
        this.setState({
            showAlert: true
        })
    }
    render() {
        const { check, showAlert } = this.state;
        const { navigation } = this.props;
        const username = navigation.getParam("username");
        const password = navigation.getParam("password");
        return (
            <View enabled behavior="padding" keyboardVerticalOffset="-100" style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.txtTitle}>Term</Text>
                </View>
                <View style={styles.termGroup}>
                    <Text termText>Điều 1: </Text>
                    <Text termText>Điều 2: </Text>
                    <Text termText>Điều 3: </Text>
                    <Text termText>Điều 4: </Text>
                    <Text termText>Điều 5: </Text>
                </View>
                <View style={styles.checkBoxWrap}>
                    <CheckBox
                        containerStyle={styles.checkBox}
                        title="I accept all term of OKE"
                        checked={check}
                        onPress={() => this.setState({ check: !this.state.check })}
                    />
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.btnDone} onPress={() => this.onPressDone(username, password)}>
                        <Text style={styles.txtDone}>Done</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnCancel} onPress={this.onPressCancel}>
                        <Text style={styles.txtCancel}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Cancel Sign up"
                    message="Are you sure you want to cancel?"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    confirmText="Yes, cancel it"
                    cancelText="No, thanks"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.setState({ showAlert: false })
                    }}
                    onConfirmPressed={() => {
                        this.props.navigation.navigate("Login");
                    }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B48DFA',
    },
    title: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: "center"
    },
    txtTitle: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    termGroup: {
        flex: 0.4,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderWidth: 1,
        borderRadius: 20
    },
    termText: {
        width: 300,
        height: 50,
        borderRadius: 50,
        marginVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#F6F8FA"
    },
    checkBoxWrap: {
        flex: 0.1,
        marginHorizontal: 5,
    },
    checkBox: {

    },
    buttonGroup: {
        flex: 0.3,
        alignItems: 'center',
        flexDirection: 'column',
    },
    btnDone: {
        backgroundColor: 'pink',
        borderRadius: 50,
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    txtDone: {
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
