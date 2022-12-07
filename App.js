import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import Login from './components/Login';
import Companies from './components/Companies';
import AddSection from './components/AddSection';
import AddIncorporation from './components/AddIncorporation';
import Incorporation from './components/Incorporation';
import Calls from './components/Calls';
import CompanyDetail from './components/CompanyDetail';
import EditCompany from './components/EditCompany';
import { NavigationContainer, TabRouter } from'@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false}} />
        <Stack.Screen name="Companies" component={Companies} options={({ route }) => ({ title: route.params.name })}/>
        <Stack.Screen name="Incorporations" component={Incorporation} options={({ route }) => ({ title: route.params.name })} />
        <Stack.Screen name="Add Incorporation" component={AddIncorporation} options={({ route }) => ({ title: route.params.name })} />
        <Stack.Screen name="Add Section" component={AddSection} options={({ route }) => ({ title: route.params.name })} />
        <Stack.Screen name="Calls" component={Calls} options={({ route }) => ({ title: route.params.name })}/>
        <Stack.Screen name="Company Detail" component={CompanyDetail} options={({ route }) => ({ title: route.params.name })}/>
        <Stack.Screen name="Edit company" component={EditCompany} options={({ route }) => ({ title: route.params.name })}/>
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
