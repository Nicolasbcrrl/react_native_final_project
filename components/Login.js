import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Icon, Button} from 'react-native-elements';
import {StyleSheet, View, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

// initialize firebase app
const app = initializeApp({
  apiKey: "AIzaSyDDLq2Tr6jJEJUgnnQLJtYG6FxL3QjRQ6Q",
  authDomain: "final-project-991cf.firebaseapp.com",
  databaseURL: "https://final-project-991cf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "final-project-991cf",
  storageBucket: "final-project-991cf.appspot.com",
  messagingSenderId: "447968724239",
  appId: "1:447968724239:web:b0d4d79fac613a2a876a7a"
});

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});


WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }) {
    const [user, setUser] = React.useState({});
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
        clientId: '447968724239-krv8rnu8b0hrck1v2a41742jput6pe2k.apps.googleusercontent.com',
        },
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
        const { id_token } = response.params;
        const auth = getAuth();
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
        .then((result) => {
            setUser(result.user);
            const user = result.user;
            const uid = user.uid;
            const email = user.email;
            const name = user.displayName;
            const photo = user.photoURL;
            update(ref(database, 'users/' + uid), {
              uid: uid,
              email: email,
              name: name,
              photo: photo,
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
          });
        }
    }, [response]);
    return (
        <View style={styles.container}>
            <View style={styles.top}></View>
            <View style={styles.middle}>
                <Icon
                    disabled={!request}
                    type="ionicon"
                    reverse color="black"
                    name="logo-google"          
                    onPress={() =>  
                        {
                        //promptAsync();
                         navigation.navigate('Incorporations', {user: "Nicolas"});
                        }
                    }
                />
                <StatusBar style="auto" />
            </View>
            <View style={styles.bottom}></View>
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex: 0.3,
    backgroundColor: "grey",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: "beige",
    borderWidth: 5,
    justifyContent: "center",
    
  },
  bottom: {
    flex: 0.3,
    backgroundColor: "pink",
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },


});