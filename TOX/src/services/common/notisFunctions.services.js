import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound:true
    }),
  });

export async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
}

export const SendNotification = async(token,Title,message) => {
    let response=fetch('https://exp.host/--/api/v2/push/send',{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        to:token,
        sound:'default',
        title:Title,
        body:message
      })
    })
}
