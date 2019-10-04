import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { getRegionForCoordinates } from '../costants/CaculateRegion';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0992;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class ItemDetail extends Component {
    state = {
        userCoordinate: null,
        storeCoordinate: this.props.navigation.getParam("coordinate"),
        errorMessage: '',
        isDirectionRequest: false,
        directionPoints: this.props.navigation.getParam("directionPoints"),
        isUserCoordinateReady: false,       // kiểm tra xem đã get được local address chưa
        isMapViewReady: false,
        initialRegion: null,
        distance: this.props.navigation.getParam("distance"),
        time: this.props.navigation.getParam("time"),
    }
    componentWillMount = async () => {
        const { storeCoordinate, directionPoints } = this.state;
        await this._getLocationAsync();
        // get local address
        this.setState({
            isUserCoordinateReady: true,
            isMapViewReady: true,
            initialRegion:
            {
                latitude: storeCoordinate.latitude,
                longitude: storeCoordinate.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
        })
        this.setState({
            isDirectionRequest: true,
            initialRegion: getRegionForCoordinates(directionPoints),
        });
    }

    async _getLocationAsync() {  // get local address
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Không có quyền truy cập vào vị trí của bạn :(',
            });
        }
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        let lat = location.coords.latitude;
        let long = location.coords.longitude;
        let coords = {
            latitude: lat,
            longitude: long,
        }
        this.setState({
            location,
            userCoordinate: coords,
        });
    }

    onPress = e => {
        console.log(e.nativeEvent);
    }
    onLongPress = e => {
        console.log(e.nativeEvent);
    }
    render() {
        const { navigation } = this.props;
        const data = navigation.getParam('data');
        const {
            storeCoordinate, errorMessage, userCoordinate, isDirectionRequest,
            directionPoints, initialRegion, isMapViewReady, distance, time
        } = this.state;
        if (errorMessage != '') {
            <View style={styles.container}>
                <Text> {errorMessage} </Text>
            </View>
        }
        return (
            <View style={styles.container}>
                <View style={styles.Header}>
                    <View style={styles.TitileGroup}>
                        <TouchableOpacity style={{ height: 20, }}
                            onPress={() => { this.props.navigation.goBack() }}>
                            <Text style={{ color: 'rgba(241, 58, 58, 0.78)', fontSize: 17 }}>← Trở về</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Đường đến cửa hàng</Text>
                    </View>
                </View>
                <View style={styles.Content}>
                    {
                        isMapViewReady ?
                            <MapView style={styles.MapViewContent}
                                provider={PROVIDER_GOOGLE}
                                onPress={this.onPress}
                                onLongPress={this.onLongPress}
                                region={initialRegion}
                            >
                                <MapView.Polyline
                                    coordinates={directionPoints}
                                    strokeColor="#00CFB5" // fallback for when `strokeColors` is not supported by the map-provider
                                    strokeColors={[
                                        '#7F0000',
                                        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                                        '#B24112',
                                        '#E5845C',
                                        '#238C23',
                                        '#7F0000'
                                    ]}
                                    strokeWidth={4}
                                />
                                {
                                    isDirectionRequest ?
                                        <Marker
                                            coordinate={userCoordinate}
                                            title={"Your address"}
                                        >
                                            <View style={styles.MarkerRadius}>
                                                <View style={styles.UserMarker}></View>
                                            </View>
                                        </Marker>
                                        : null
                                }
                                <Marker
                                    coordinate={storeCoordinate}
                                    title={data.address}
                                    description={data.name}
                                >
                                </Marker>
                            </MapView>
                            :
                            <Text>Waiting...</Text>
                    }
                    <Text style={styles.addressText}> Địa chỉ: {data.address}</Text>
                    <Text style={styles.addressText}>
                        Cách bạn <Text style={{ color: "#30E94E", fontWeight: '300' }}> {distance}</Text>
                        &ensp;-&ensp;
                        <Text style={{ color: "rgba(241, 58, 58, 0.78)", fontWeight: '300' }}>{time}</Text> lái xe.
                    </Text>
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
    },
    TitileGroup: {
        marginHorizontal: width * 0.03,
        marginTop: height * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 23,
        fontWeight: '400',
        marginLeft: width * 0.08
    },
    Content: {
        flex: 0.88,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    MapViewContent: {
        width: width * 0.95,
        height: height * 0.6,
        borderRadius: 20,
    },
    MarkerRadius: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,112,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    UserMarker: {
        height: 15,
        width: 15,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 15 / 2,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    },
    addressText: {
        marginTop: 20,
        width: width * 0.95
    }
});
