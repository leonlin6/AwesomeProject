import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
        popInitialNotification: true,
        requestPermissions: Platform.OS === 'android' // 因為我是local通知，所以他官網叫我這樣寫。
    });

    export default {
        deleteChannel(channelId) {
          PushNotification.deleteChannel(channelId);
        },
        getChannelExists(channelId) {
          return new Promise((resolve, reject) => {
            PushNotification.channelExists(channelId, function (exists) {
              resolve(exists);
            });
          });
        },
        getChannels() {
          return new Promise((resolve, reject) => {
            PushNotification.getChannels(function (channels) {
              resolve(channels);
            });
          });
        },
        createChannel(channelId) {
          PushNotification.createChannel(
            {
              channelId: channelId,
              channelName: channelId
            },
            created => console.log(`createChannel ${channelId} returned '${created}'`)
          );
        },
        localNotif(notiData) {
          console.log('notiData', notiData);
          try{
            PushNotification.localNotification({
              channelId: 'orderChannel',
              autoCancel: true,
              bigText: notiData.notification.body, 
              subText: '租車管理新訂單通知',
              actions: ['ok'], 
              message: notiData.notification.title // (required)
            });
          }catch(error){
            console.log('error', error);
          }

        }
      };