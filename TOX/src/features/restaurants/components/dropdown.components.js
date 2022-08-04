import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { RestaurantContext } from '../../../services/restaurant/restaurant-block.context';

export const DropDownComponent = () => {

    const [value, setValue] = useState(null);
    const { Search } = useContext(RestaurantContext);

    const dropDownData = [
        { label: 'Wrapchik', value: '1' },
        { label: 'Sip n Bites', value: '2' },
        { label: 'Pizza Nation', value: '3' },
        { label: 'Dessert Club', value: '4' },
        { label: 'All', value: '5' }
    ];

    return (
        <Dropdown
            styles={styles.dropdown}
            data={dropDownData}
            onChange={item => {
                setValue(item.value);
                Search(item.label)
            }}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            value={value}
            placeholder="Select Resturant"
            searchPlaceholder="Search..."
            valueField="value"
            labelField="label"
            renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="search1" size={23} />
            )}
        />
    )
}

const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5
    },
    icon: {
        marginRight: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});