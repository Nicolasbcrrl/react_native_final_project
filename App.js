import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import Login from './components/Login';
import Companies from './components/Companies';
import AddCompany from './components/AddCompany';
import AddIncorporation from './components/AddIncorporation';
import Incorporation from './components/Incorporation';
import Calls from './components/Calls';
import { NavigationContainer } from'@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false}} />
        <Stack.Screen name="Companies" component={Companies} />
        <Stack.Screen name="Incorporations" component={Incorporation} />
        <Stack.Screen name="Add Incorporation" component={AddIncorporation} />
        <Stack.Screen name="Add Company" component={AddCompany} />
        <Stack.Screen name="Calls" component={Calls} />
      </Stack.Navigator>
    </NavigationContainer>
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
    backgroundColor: "yellow",
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
