const Data = [
    { id: 1, name: 'Phịch phịch', image: require('../assets/Momo_1.jpg'), address: 'quận 1', longdis: '7km', price: '100.000 - 200.000' },
    { id: 2, name: 'The Coffee House', image: require('../assets/Momo_2.jpg'), address: 'quận 2', longdis: '6km', price: '150.000 - 200.000' },
    { id: 3, name: 'Hoàng Yến Buffet', image: require('../assets/Momo_3.jpg'), address: 'quận 3', longdis: '5km', price: '300.000 - 400.000' },
    { id: 4, name: 'Phúc Long', image: require('../assets/Momo_1.jpg'), address: 'quận 4', longdis: '4km', price: '250.000 - 300.000' },
    { id: 5, name: 'The Coffee House', image: require('../assets/Momo_2.jpg'), address: 'quận 5', longdis: '3km', price: '50.000- 100.000' },
    { id: 6, name: 'Hoàng Yến Buffet', image: require('../assets/Momo_3.jpg'), address: 'quận 6', longdis: '2km', price: '500.000 - 1.000.000' },
  ];

const categoryListItem = (state = [], action) => {
    switch (action.type) {
        case 'GET_CATEGORY_LIST_ITEM': {
            return action.categoryListItem
        }
        default:
            return state
    }
}

export default categoryListItem;