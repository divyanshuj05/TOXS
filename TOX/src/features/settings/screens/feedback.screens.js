import React,{ useState,useContext,useRef } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { ActivityIndicator,Colors } from 'react-native-paper';
import { StoreFeedback } from '../../../services/common/userFeedback.services';

const Container=styled.ScrollView`
    flex:1
    background-color:${props=>props.theme.background}
    flex-direction:column
`;

const Title=styled.Text`
    color:${props=>props.theme.text}
    text-align:center
    margin-vertical:${props=>props.theme.space[4]}
    font-family:${props=>props.theme.fonts.body}
    font-size:${props=>props.theme.fontSizes.h5}
`;

const Description=styled.Text`
    color:${props=>props.theme.text}
    font-family:${props=>props.theme.fonts.heading}
    font-size:${props=>props.theme.fontSizes.body}
    margin-vertical:${props=>props.theme.space[2]}
    margin-horizontal:${props=>props.theme.space[3]}
`;

const Input=styled.TextInput`
    color:black
    width:100%
    margin-vertical:${props=>props.theme.space[3]}
    height:300px
    background-color:"rgb(230,230,230)"
    font-size:${props=>props.theme.fontSizes.body}
    font-family:${props=>props.theme.fonts.heading}
`;

const Information=styled.Text`
    margin-top:${props=>props.theme.space[5]}
    margin-horizontal:${props=>props.theme.space[3]}
    font-size:${props=>props.theme.fontSizes.body}
    font-family:${props=>props.theme.fonts.heading}
    color:${props=>props.theme.text}
`;

const SendButton=styled.TouchableOpacity`
    background-color:${props=>props.theme.colors.ui.basic}
    margin-horizontal:120px;
    padding-vertical:14px
    padding-horizontal:30px
    border-radius:8px;
    align-items:center
`;

const SendText=styled.Text`
    color:white
    font-size:${props=>props.theme.fontSizes.title}
    font-family:${props=>props.theme.fonts.heading}
`;

export const FeedbackScreen = ({ navigation }) => {

    const feedback=useRef("")
    const { user } = useContext(AuthenticationContext)
    const [ isLoading,setIsLoading ] = useState(false)

    if(isLoading){
        return(
            <Container>
                <ActivityIndicator style={{marginTop:50}} color={Colors.red400} size={50} />
            </Container>
        )
    }
    
    return(
        <Container>
            <Title>Send Feedback</Title>
            <Description>Describe your issue or suggestion</Description>
            <View style={{marginHorizontal:16}}>
                <Input
                    multiline={true}
                    numberOfLines={15}
                    style={{ textAlignVertical: 'top',color:"black"}}
                    placeholder="Tell us how we can improve our product"  
                    onChangeText={(text)=>{feedback.current=text}}  
                    value={feedback}
                    selectionColor={"purple"}
                />
            </View>
            <Information>*We may email you for more information or updates*</Information>
            <View style={{alignItems:"center",justifyContent:"center",height:200}}>            
            <SendButton onPress={()=>{StoreFeedback(setIsLoading,feedback.current,user.email,navigation)}}>
                <SendText>Send</SendText>
            </SendButton>
            </View>
        </Container>
    )
} 