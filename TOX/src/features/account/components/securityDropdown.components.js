import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Spacer } from '../../common/components/spacer/spacer.component'
import { Dropdown } from 'react-native-element-dropdown'
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context'
import { AuthInput } from './account.styles'

export const SecurityDropdown = ({ setSecurityQuestion, securityQuestion, security, setSecurity }) => {
    
    const { orientation } = useContext(DeviceOrientationContext)

    const data=[
        {label:"Your favourite movie",value:"Your favourite movie"},
        {label:"First pet name",value:"First pet name"},
        {label:"First school name",value:"First school name"},
        {label:"Your favourite food",value:"Your favourite food"},
        {label:"Your elder/younder sibling's pet name",value:"Your elder/younder sibling's pet name"}
      ]
    
    return(
        <Spacer size="large">
            <View style={{backgroundColor:"rgb(230,230,230)", borderTopLeftRadius:8, borderTopRightRadius:8, marginBottom:12, padding:8}}>
                <Dropdown
                    data={data}
                    value={securityQuestion}
                    onChange={item => {
                        setSecurityQuestion(item.value);
                    }}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    containerStyle={{backgroundColor:"rgb(240,240,240)",borderRadius:32 }}
                    dropdownPosition="bottom"
                    activeColor="rgb(220,220,220)"
                    iconColor='rgb(150,150,150)'
                    placeholder="Select security question"
                    valueField="value"
                    labelField="label"
                />
            </View>
            <AuthInput
                style={{width:orientation==1||orientation==2?287:400,height:50}}
                label="Answer to Security Question"
                value={security}
                textContentType="username"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(p) => setSecurity(p)}
            />
        </Spacer>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 16,
        marginLeft:8
    },
    placeholderStyle: {
        fontSize: 16,
        color: "rgb(100,100,100)"
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "rgb(100,100,100)"
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderRadius:32,
    },
  });