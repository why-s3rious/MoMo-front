import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    onPressContinued = () => {
        this.props.navigation.navigate("Login")
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('../assets/coffee-dessert.png')}
                        />
                    </View>
                    <View>
                        <Text>Recommend theo vị trí</Text>
                    </View>
                    <View style={styles.iconVector}>
                        <FontAwesome name={'circle'} color="gray" size={15} />
                        <FontAwesome name={'circle'} color="gray" size={15} />
                        <FontAwesome name={'circle'} color="black" size={15} />
                    </View>
                </View>
                <View style={styles.bottomWrapper}>
                    <View>
                        <TouchableOpacity onPress={this.onPressContinued}>
                            <Text>
                                Tiếp tục
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text>Khi nhấn tiếp tục, bạn đã đồng  ý điều khoản của chúng tôi</Text>
                    </View>
                </View>
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
    iconVector: {
        flexDirection: 'row'
    },
    bottomWrapper: {
        backgroundColor: 'pink'
    }
})
