import React from 'react'
import { StyleSheet,View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export const FilterComponent = ({ sort,category,setSort,setCategory,Search,Sort }) => {

    const options=[
        { label: 'Lab Coat', value: 'Lab Coat' },
        { label: 'Books', value: 'Books' },
        { label: 'Drafters', value: 'Drafters' },
        { label: 'Misc', value: 'Misc' },
        { label: 'Select All', value: 'Select All' }
        ]
       
    const sortData=[
        {label:'Low to High', value:'Ascending'},
        {label:'High to Low',value:'Descending'}
    ]    

    return(
        <>
        <View style={{flex:0.5}}>
            <Dropdown style={styles.dropdown}
                data={options}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                value={category}
                onChange={(item)=>{setCategory(item), Search(item.value)}}
                placeholder="Select category"
                valueField="value"
                labelField="label"
                renderLeftIcon={() => (
                    <MaterialIcons style={styles.iconStyle} name="category" size={16} />
                )}
            />
            </View>
            <View style={{flex:0.5}}>
                <Dropdown style={styles.dropdown}
                    data={sortData}
                    value={sort}
                    onChange={(item)=>{setSort(item),Sort(item.value)}}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    placeholder="Sort"
                    valueField="value"
                    labelField="label"
                    renderLeftIcon={() => (
                        <FontAwesome style={styles.iconStyle} name="unsorted" size={16} />
                    )}
            />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        margin: 12,
        height: 20,
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
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
        color:"white",
        width: 20,
        height: 16
    }
});