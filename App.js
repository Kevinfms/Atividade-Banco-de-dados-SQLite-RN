import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import allMovies from './src/pages/allMovies/allMovies';
import home from  './src/pages/home/home';
import registerMovies from  './src/pages/registerMovies/registerMovies';
import searchMovies from  './src/pages/searchMovies/searchMovies';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='home' component={home}/>
        <Stack.Screen name='allMovies' component={allMovies}/>
        <Stack.Screen name='registerMovies' component={registerMovies}/>
        <Stack.Screen name='searchMovies' component={searchMovies}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

