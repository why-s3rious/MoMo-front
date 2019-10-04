import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { screenWidth, screenHeight } from '../costants/DeviceSize';
import { FontAwesome, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Polyline from '@mapbox/polyline';




const ASPECT_RATIO = (screenWidth * 0.48) / (screenHeight * 0.48);
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = 0.02;
export default class ItemDetail extends Component {
    state = {
        data: this.props.navigation.getParam('data'),
        coordinate: {
            latitude: this.props.navigation.getParam('data').lat,
            longitude: this.props.navigation.getParam('data').long,
        },
        directionPoints: [],
        userLocation: this.props.navigation.getParam("userLocation"),
        distance: '',
        time: '',
    }
    async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${destinationLoc.latitude},${destinationLoc.longitude}&key=AIzaSyDqn5t9-pR4mBAgZeutQJS0T8V4bA46h4Q`);
            let respJson = await resp.json();
            console.log(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${destinationLoc.latitude},${destinationLoc.longitude}&key=AIzaSyDqn5t9-pR4mBAgZeutQJS0T8V4bA46h4Q`)
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({
                directionPoints: coords,
                distance: respJson.routes[0].legs[0].distance.text,
                time: `${Math.floor(respJson.routes[0].legs[0].duration.value / 60)} phút`,
            })
            return coords
        } catch (error) {
            console.log("error", error)
            return error
        }
    }
    componentWillMount = async () => {
        const {
            userLocation, coordinate
        } = this.state
        await this.getDirections(userLocation, coordinate)
    }
    onPressDirection = (data, coordinate) => {
        const { directionPoints, distance, time } = this.state
        this.props.navigation.navigate("ItemAddress", {
            data: data, coordinate: coordinate,
            directionPoints: directionPoints,
            distance: distance,
            time: time,
        });
    }
    onPressContact = data => {
        alert("Gọi điện thoại cho: " + data.name);
    }

    onPress = e => {
        console.log(e.nativeEvent);
    }
    onLongPress = e => {
        console.log(e.nativeEvent);
    }

    render() {
        
        const { navigation } = this.props;
        const { data, coordinate, distance } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.Header}>
                    <View style={styles.TitileGroup}>
                        <TouchableOpacity style={{ height: 20, }}
                            onPress={() => { this.props.navigation.goBack() }}>
                            <Text style={{ color: 'rgba(241, 58, 58, 0.78)', fontSize: 17 }}>← Trở về</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Chi tiết cửa hàng</Text>
                    </View>
                </View>
                <View style={styles.Content}>
                    <Image style={styles.MainImage}
                        source={data.image}
                    />
                    <View style={styles.NameItem}>
                        <Text style={styles.NameItemText}>{data.name}</Text>
                    </View>
                    <View style={styles.infoGroup}>
                        <View style={styles.infoCol1}>
                            <Text style={styles.infoText}>
                                <MaterialCommunityIcons
                                    name='map-marker-outline'
                                    size={15}
                                    style={styles.iconInfo}
                                />
                                &ensp;{data.address}
                            </Text>
                            <Text style={styles.infoText}>
                                <AntDesign
                                    name='car'
                                    size={15}
                                    style={styles.iconInfo}
                                />
                                &ensp;<Text style={{ color: "#30E94E", fontWeight: '300' }}> {distance} </Text>(từ vị trí hiện tại)
                            </Text>
                            <Text style={styles.infoText}>
                                <AntDesign
                                    name='clockcircleo'
                                    size={15}
                                    style={styles.iconInfo}
                                />
                                &ensp;{data.time}
                            </Text>
                            <Text style={styles.infoText}>
                                <FontAwesome
                                    name='money'
                                    size={15}
                                    style={styles.iconInfo}
                                />
                                &ensp;{data.price} VNĐ
                            </Text>
                        </View>
                        <View style={styles.infoCol2}>
                            <View style={styles.itemMap}>
                                {
                                    data != null ?
                                        <MapView style={styles.MapViewContent}
                                            provider={PROVIDER_GOOGLE}
                                            onPress={this.onPress}
                                            onLongPress={this.onLongPress}
                                            region={{
                                                latitude: data.lat,
                                                longitude: data.long,
                                                latitudeDelta: LATITUDE_DELTA,
                                                longitudeDelta: LONGITUDE_DELTA,
                                            }}
                                        >
                                            <Marker
                                                coordinate={coordinate}
                                                title={data.address}
                                                description={data.name}
                                            >
                                            </Marker>
                                        </MapView>
                                        :
                                        <Text style={{ fontWeight: 'bold', textAlign: 'center', alignSelf: 'center' }}>
                                            vị trí chưa cập nhật :(
                                        </Text>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity onPress={() => this.onPressDirection(data, coordinate)} style={styles.buttonDirection}>
                            <Text style={{ fontSize: 17, color: 'white' }}>Chỉ đường</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onPressContact(data)} style={styles.buttonContact}>
                            <Text style={{ fontSize: 17, color: 'white' }}>Liên hệ</Text>
                        </TouchableOpacity>
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
        flex: 0.12,
        backgroundColor:'#BCFFF3',
    },
    TitileGroup: {
        marginHorizontal: screenWidth * 0.03,
        marginTop: screenHeight * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 23,
        fontWeight: '400',
        marginLeft: screenWidth * 0.08
    },
    Content: {
        flex: 0.88,
        flexDirection: 'column',

    },
    MainImage: {
        height: screenHeight * 0.35,
        width: screenWidth,
    },
    NameItem: {
        width: screenWidth,
        height: 50,
        borderBottomColor: "#999898",
        borderBottomWidth: 0.5,
        justifyContent: 'center'
    },
    NameItemText: {
        fontSize: 17,
        fontWeight: '300',
        marginHorizontal: screenWidth * 0.03,
    },
    infoGroup: {
        height: screenHeight * 0.3,
        width: screenWidth,
        flexDirection: 'row'
    },
    infoCol1: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 0.5,
    },
    infoCol2: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        marginBottom: screenHeight * 0.03,
        marginLeft: screenWidth * 0.03,
        fontSize: 13,
    },
    iconInfo: {
        marginRight: screenWidth * 0.1,
    },
    itemMap: {
        width: screenWidth * 0.48,
        height: screenHeight * 0.28,

        borderRadius: 8,
        backgroundColor: "#999898",
        justifyContent: 'center',
    },
    MapViewContent: {
        flex: 1,
        borderRadius: 8,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonDirection: {
        width: screenWidth * 0.35,
        height: screenHeight * 0.08,
        borderRadius: 15,
        backgroundColor: '#3A78F1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContact: {
        width: screenWidth * 0.35,
        height: screenHeight * 0.08,
        borderRadius: 15,
        backgroundColor: '#3AF199',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
