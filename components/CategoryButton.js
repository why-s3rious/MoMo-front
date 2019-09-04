import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

class CategoryButton extends Component {

    render() {
        const {
            onPress
        } = this.props;
        return (
            <TouchableOpacity onPress={onPress}
                style={styles.CategoryButton}
            >
                <Text style={{ fontSize: 20, }}>Tên danh mục</Text>
                <Image
                    style={{ width: 120, height: 80 }}
                    source={require('../assets/coffee-dessert.png')}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    CategoryButton: {
        height: 80,
        width: 310,
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    }

});
export default CategoryButton;
