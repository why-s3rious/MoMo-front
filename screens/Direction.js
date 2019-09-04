import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


export default class ItemDetail extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.Header}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}><Text>Trở về</Text></TouchableOpacity>
                </View>
                <View style={styles.Content}>
                    <Image style = {styles.Map}
                        source={require('../assets/testmap.png')}
                    />
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
        alignItems: 'center',
        justifyContent:'center',
    },
    Map: {
        width:300,
        height:400,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
