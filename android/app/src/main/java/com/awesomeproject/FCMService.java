package com.awesomeproject;
import androidx.annotation.NonNull;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class FCMService extends FirebaseMessagingService {
    public static final String TAG = FCMService.class.getSimpleName()+"My";
    public FCMService() {
    }

//    @Override
//    public IBinder onBind(Intent intent) {
//        // TODO: Return the communication channel to the service.
//        throw new UnsupportedOperationException("Not yet implemented");
//    }

    @Override
    public void onNewToken(@NonNull String s){
        super.onNewToken(s);
//        Log.d(TAG, "裝置Token: "+s);
    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage){
        super.onMessageReceived(remoteMessage);
//        Log.d(TAG, "onMessageReceived: "+remoteMessage.getData());
    }

}