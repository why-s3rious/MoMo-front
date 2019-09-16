import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
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
        storeCoordinate: {              // địa chỉ cửa hàng (sẽ get param)
            latitude: 10.7623244,
            longitude: 106.7056788,
        },
        errorMessage: '',
        isDirectionRequest: false,
        directionPoints: [              // fake direction api, sẽ sửa sau
            {
                latitude: 10.7623244,
                longitude: 106.7056788,
            }
        ],
        isUserCoordinateReady: false,       // kiểm tra xem đã get được local address chưa
        isMapViewReady: false,
        initialRegion: null,
    }
    componentWillMount = async () => {
        const { storeCoordinate } = this.state;
        await this._getLocationAsync();         // get local address
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
    }

    _getLocationAsync = async () => {  // get local address
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
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

    onPressDirectButton = async () => {   /// click vào chỉ đường
        const { userCoordinate, directionPoints } = this.state;
        let newArrayOfCoordinate = [...directionPoints, { latitude: userCoordinate.latitude, longitude: userCoordinate.longitude }];
        this.setState({
            isDirectionRequest: true,
            directionPoints: newArrayOfCoordinate,
            initialRegion: getRegionForCoordinates(newArrayOfCoordinate)
        });
    }
    render() {
        const { navigation } = this.props;
        const data = navigation.getParam('data');
        const {
            storeCoordinate, errorMessage, userCoordinate, isDirectionRequest,
            directionPoints, isUserCoordinateReady, initialRegion, isMapViewReady
        } = this.state;
        if (errorMessage != '') {
            <View style={styles.container}>
                <Text> {errorMessage} </Text>
            </View>
        }
        return (
            <View style={styles.container}>
                <View style={styles.Header}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}><Text>Trở về</Text></TouchableOpacity>
                </View>
                <View style={styles.Content}>
                    {
                        isMapViewReady ?
                            <MapView style={styles.MapViewContent}
                                provider={PROVIDER_GOOGLE}
                                onPress={this.onPress}
                                onLongPress={this.onLongPress}
                                region={{
                                    latitude: initialRegion.latitude,
                                    longitude: initialRegion.longitude,
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,
                                }}
                            >
                                <Polyline
                                    coordinates={directionPoints}
                                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                                    strokeColors={[
                                        '#7F0000',
                                        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                                        '#B24112',
                                        '#E5845C',
                                        '#238C23',
                                        '#7F0000'
                                    ]}
                                    strokeWidth={3}
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
                    <Text> Đỉa chỉ: {data.address}</Text>
                    {
                        isUserCoordinateReady ?
                            <TouchableOpacity
                                style={styles.DirectButton}
                                onPress={this.onPressDirectButton}
                            >
                                <Text>Chỉ đường</Text>
                            </TouchableOpacity>
                            :
                            <ActivityIndicator size='small' color="black" />
                    }

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
        backgroundColor: 'gray'
    },
    MapViewContent: {
        width: width * 0.95,
        height: height * 0.4,
        backgroundColor: 'red'
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
});
