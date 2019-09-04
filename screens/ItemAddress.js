import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default class ItemDetail extends Component {

    onPressDirectButton = () =>{
        this.props.navigation.navigate("Direction");
    }
    render() {
        const { navigation } = this.props;
        const address = navigation.getParam('address');
        return (
            <View style={styles.container}>
                <View style={styles.Header}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}><Text>Trở về</Text></TouchableOpacity>
                </View>
                <View style={styles.Content}>
                    <Text>Địa chỉ full màn hình</Text>
                    <Text>{address}</Text>
                    <TouchableOpacity
                        style={styles.DirectButton}
                        onPress = {this.onPressDirectButton}
                    >
                        <Text>Chỉ đường</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    Header: {
        flex: 0.2,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
    },
    Content: {
        flex: 0.8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    DirectButton: {
        width: 120,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'gray'
    }
});
