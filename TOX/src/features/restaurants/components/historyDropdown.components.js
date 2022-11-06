import React from 'react'
import { StyleSheet,View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { AntDesign } from '@expo/vector-icons';

export const HistoryFilterComponent = ({ status,options,SearchByStatus,type,name }) => {

    return(
        <>
            <Dropdown style={styles.dropdown}
                data={options}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                onChange={(text)=>{
                    status.current=text.value
                    SearchByStatus(text.value,type,name)    
                }}
                value={status.current}
                placeholder="Sort by status"
                valueField="value"
                labelField="label"
                renderLeftIcon={() => (
                    <AntDesign style={styles.icon} color="white" name="search1" size={12} />
                )}
            />
        </>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        margin: 12,
        height: 20,
        borderBottomColor: 'rgb(185,185,185)',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize:14,
        color: "white"
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "white"
    },
    iconStyle: {
        color:"white",
        width: 20,
        height: 16,
        marginRight:12
    },
    icon:{
        marginRight:12
    }
});