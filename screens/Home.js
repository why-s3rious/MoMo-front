import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import SearchBox from '../components/SearchBox';
import CategoryButton from '../components/CategoryButton';

const Data = [
  { id: 1, name: 'Cafe/Dessert' },
  { id: 2, name: 'Nhà hàng' },
  { id: 3, name: 'Siêu thị' },
  { id: 4, name: 'Mua sắm' },
  { id: 5, name: 'Giải trí' },
  { id: 6, name: 'Du lịch' },
  { id: 7, name: 'Khác' },
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
    };

    this.didFocusSubscription = props.navigation.addListener(
      'willFocus',
      payload => {
        this.setState({
          textSearch: '',
        })
      }
    );
  }

  navigateModal = () => {
    this.props.navigation.navigate("Modal");
  };
  onPressCategoryButton = item => {
    this.props.navigation.navigate("MainHome", { data: item });
  };
  onEndEditingSearch = textSearch => {
    if (textSearch != '') {
      this.setState({
        textSearch: '',
      })
      this.props.navigation.navigate("SearchScreen", { search: textSearch });
    }
  };
  onPressItemAuto = (item) => {
    this.props.navigation.navigate("SearchScreen", { search: item.name });
  }
  render() {
    const { textSearch } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <SearchBox
            text={textSearch}
            onChangeText={(text) => this.setState({ textSearch: text })}
            onEndEditing={() => this.onEndEditingSearch(textSearch)}
            onPressItemAuto={this.onPressItemAuto}
        />
          <View>
            <TouchableOpacity style={styles.buttonLoc} onPress={this.navigateModal}>
              <Text>Lọc</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Content}>
          <Text style={styles.TextDanhMuc}>DANH MỤC</Text>
          <ScrollView contentContainerStyle={styles.ListDanhMuc}>
            {
              Data.map(item => {
                return (
                  <CategoryButton
                    onPress={() => this.onPressCategoryButton(item)}
                    Data={item}
                    key={item.id} />
                )
              })
            }
          </ScrollView>
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
  buttonLoc: {
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'gray',
    backgroundColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    width: 40,
  },
  Content: {
    flex: 0.8,
    flexDirection: 'column',
  },
  TextDanhMuc: {
    marginLeft: 25,
    fontSize: 25,
    fontWeight: '400',
  },
  ListDanhMuc: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
