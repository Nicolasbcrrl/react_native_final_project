import * as React from 'react';
import {View,StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';


export default function MenuCalls({ route, navigation }) {
    return (
        <View style={styles.container}>
       
            <View style={{marginTop: -80, marginBottom:50}}>
                <Button 
                    buttonStyle={styles.buttonStyle}
                    title=" History "
                    titleStyle={styles.titleStyle}
                    onPress={() => 
                        navigation.navigate(
                            'History', {
                                user: route.params.user, 
                                inco: route.params.inco,
                                company: route.params.company, 
                                staff: route.params.staff
                            }
                        )
                    }
                />
            </View>
            <View style={{marginBottom:50}}>
                <Button 
                    buttonStyle={styles.buttonStyle}
                    title=" Calls "
                    titleStyle={styles.titleStyle}
                    onPress={() => 
                        navigation.navigate(
                            'Calls', {
                                user: route.params.user, 
                                company: route.params.company, 
                                staff: route.params.staff,
                                inco: route.params.inco
                            }
                        )
                    }
                />
            </View>
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
    buttonStyle: {
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 20,
        fontColor: 'black',
        width: 400,
    },
    titleStyle: {
        color: 'white', 
        fontSize: 20, 
        fontWeight: 'bold', 
        letterSpacing: 5
    }
});