import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { RestaurantContext } from '../../../services/restaurant/restaurant-block.context';

export const DropDownComponent = ({ restaurant = {} }) => {

    const [value, setValue] = useState(null);
    const { Search } = useContext(RestaurantContext);

    var data = [];
    if (restaurant) {
        restaurant.forEach(element => {
            const isFound = data.some((e) => {
                if (e.label == element.address) { return true }
            })
            if (isFound != true) {
                data.push({ "label": element.address, "value": element.address })
            }
        });
    }

    data.push({ label: "Select All", value: "Select All" })

    return (
        <Dropdown
            styles={styles.dropdown}
            data={data}
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
            placeholder="Filter by Location"
            searchPlaceholder="Search..."
            valueField="value"
            labelField="label"
            renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="white" name="search1" size={23} />
            )}
        />
    )
}

const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 16,
    },
    placeholderStyle: {
        fontSize: 16,
        color: "white"
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "white"
    },
    iconStyle: {
        width: 20,
        height: 20
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});