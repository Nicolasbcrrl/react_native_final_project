import { resolveDiscoveryAsync } from 'expo-auth-session';
import * as React from 'react';
import { useState, useEffect} from 'react';
import { Button,View,Text,StyleSheet, FlatList} from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, remove } from'firebase/database';
import AddIncorporation from './AddIncorporation';

export default function Incorporations({ route, navigation }) {
    const [inco, setInco] = useState({key : 1, name : "Rav-45"});
    const [incorporations, setIncorporations] = useState([inco]);

    const firebaseConfig = {
        apiKey: "AIzaSyDDLq2Tr6jJEJUgnnQLJtYG6FxL3QjRQ6Q",
        authDomain: "final-project-991cf.firebaseapp.com",
        databaseURL: "https://final-project-991cf-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "final-project-991cf",
        storageBucket: "final-project-991cf.appspot.com",
        messagingSenderId: "447968724239",
        appId: "1:447968724239:web:b0d4d79fac613a2a876a7a"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    useEffect(() => {
        const incorporationRef = ref(database, 'users/'+ route.params.user +'/incorporations/');
        onValue(incorporationRef, (snapshot) => {const data = snapshot.val();
            if(data !== null){
                const incorporationsFind = object.keys(data).map((key)=>({
                    key: key,
                    name: data[key].name
                }));
                setIncorporations(incorporationsFind);
            }
        })
    }, []);
    if (incorporations.length > 0) {
        console.log(incorporations.length)
        return (
            <View style={styles.container}>
                <Text>Incorporations de {route.params.user}</Text>
                <View style={{ width: '100%', marginTop: 20 }}>
                    <FlatList style={{ width: '100%' }}
                        data={incorporations}
                        renderItem={({ item }) => (
                            <ListItem
                                style={styles.ListItem}
                                key={item.key}
                                bottomDivider={true}
                                topDivider={true}
                                onPress={() => navigation.navigate('Calls', { user: route.params.user, Inco: item.key })}
                                >
                                <ListItem.Content style={{ width: '100%' }}>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        )}
                    />
                </View>
                <View>
                    <Icon
                            type="ionicon"
                            size={50}
                            name="add-circle-outline"     
                            onPress={() =>  
                                {
                                    navigation.navigate('Add Incorporation', {user: route.params.user});
                                }
                            }     
                        />
                </View>
            </View>
        );
    }
    else {
        
        return (
            <View style={styles.container}>
                <Text>Companies de {route.params.user}</Text>
                <View>
                    <Icon
                            type="ionicon"
                            size={50}
                            name="add-circle-outline"     
                            onPress={() =>  
                                {
                                    navigation.navigate('Calls', {user: route.params.user});
                                }
                            }     
                        />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ListItem: {
        width: '100%',
    }
});