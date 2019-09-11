import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


export default class ItemDetail extends Component {

    onPressAddressButton = address => {
        this.props.navigation.navigate("ItemAddress", { address: address });
    }
    render() {

        const { navigation } = this.props;
        const data = navigation.getParam('data');
        console.log(data);

        return (
            <View style={styles.container}>
                <View style={styles.Header}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}><Text>Trở về</Text></TouchableOpacity>
                </View>
                <View style={styles.Content}>
                    <Image style={styles.MainImage}
                        source={{uri: data.image}}
                    />
                    <View style={styles.infoRow1}>
                        <View style={styles.infocolumn1}>
                            <Text style={styles.Textinfo}>Tên: {data.name} </Text>
                            <Text style={styles.Textinfo}>Địa chỉ: {data.address}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => { this.onPressAddressButton(data.address) }}
                            style={styles.infocolumn2}>
                            <Text style={{}}>ảnh google map</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoRow2}>
                        <Text style={styles.Textinfo}>Khoảng cách từ bạn: {data.longdis}</Text>
                        <Text style={styles.Textinfo}>Giá trung bình: {data.price} VNĐ</Text>
                    </View>
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
    },
    MainImage: {
        height: 150,
        width: 400,
    },
    infoRow1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoRow2: {
        flexDirection: 'column',
    },
    infocolumn1: {

    },
    infocolumn2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        backgroundColor: 'pink'
    },
    Textinfo: {
        marginVertical: 10,
    }
});
