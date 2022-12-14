import * as React from 'react';
import {View,StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';


export default function CompanyDetail({ route, navigation }) {
    return (
        <View style={styles.container}>
       
            <View style={{marginTop: -80, marginBottom:50}}>
                <Button 
                    buttonStyle={styles.buttonStyle}
                    title=" Add Sections "
                    titleStyle={styles.titleStyle}
                    onPress={() => 
                        navigation.navigate(
                            'Add Section', {
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
                            'Call Menu', {
                                user: route.params.user, 
                                company: route.params.company, 
                                staff: route.params.staff,
                                inco: route.params.inco
                            }
                        )
                    }
                />
            </View>
            <View>
                <Button 
                    buttonStyle={styles.buttonStyle}
                    title=" Edit "
                    titleStyle={styles.titleStyle}
                    onPress={() => 
                        navigation.navigate(
                            'Edit', {
                                user: route.params.user, 
                                incoStaff: route.params.incoStaff,
                                inco: route.params.inco, 
                                company: route.params.company, 
                                staff: route.params.staff,
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