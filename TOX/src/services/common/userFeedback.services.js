import { db } from "../../../database.config";
import { addDoc,collection } from "firebase/firestore";
import { Alert } from "react-native";

export const StoreFeedback = async(setIsLoading,feedback,mail,navigation) => {
    setIsLoading(true)
    if(feedback==""||feedback==undefined)
    {   
        setIsLoading(false)
        Alert.alert(
            "No feedback filled",
            "Fill the information first to send your feedback",
            [

                {
                    text: "Ok",
                    onPress: () => {<></>}
                }
            ]
        ) 
        return
    }
    let data={
        userMail:mail,
        feedback:feedback
    }
    const feedbackRef=collection(db,"feedbacks")
    await addDoc(feedbackRef,data).then(res=>{
        setIsLoading(false)
        Alert.alert(
            "Done",
            "Feedback successfully sent",
            [

                {
                    text: "Ok",
                    onPress: () => {navigation.goBack()}
                }
            ]
        )
    })
    .catch(err=>{
        console.log(err)
        setIsLoading(false)
        Alert.alert(
            "Error",
            "Try to send the feedback again",
            [

                {
                    text: "Ok",
                    onPress: () => {navigation.goBack()}
                }
            ]
        )
    })
} 