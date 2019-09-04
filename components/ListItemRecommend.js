import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';

import ItemRecommend from './ItemRecommend';

const Data = [
    { id: 1, name: 'Phúc Long', image: require('../assets/Momo_1.jpg'), address: 'quận 1' },
    { id: 2, name: 'The Coffee House', image: require('../assets/Momo_2.jpg'), address: 'quận 2' },
    { id: 3, name: 'Hoàng Yến Buffet', image: require('../assets/Momo_3.jpg'), address: 'quận 3' },
    { id: 4, name: 'Phúc Long', image: require('../assets/Momo_1.jpg'), address: 'quận 4' },
    { id: 5, name: 'The Coffee House', image: require('../assets/Momo_2.jpg'), address: 'quận 5' },
    { id: 6, name: 'Hoàng Yến Buffet', image: require('../assets/Momo_3.jpg'), address: 'quận 6' },
];

class ListItemRecommend extends Component {
    render() {
        const {
            KindOfList
        } = this.props;
        return (
            <ScrollView contentContainerStyle={styles.ListDanhMuc}>
                {KindOfList ?
                    Data.map(item => {
                        return (
                            <ItemRecommend
                                key={item.id}
                                itemData={item}
                            />
                        );
                    })
                    :
                    Data.slice(0).reverse().map(item => {
                        return (
                            <ItemRecommend
                                key={item.id}
                                itemData={item}
                            />
                        );
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    ListDanhMuc: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ListItemRecommend;