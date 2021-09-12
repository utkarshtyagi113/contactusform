import React, { useEffect } from 'react'
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper'
import Form from './src/Form'
import auth from '@react-native-firebase/auth'

const App = () => {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'skyblue',  
    },
  };

  {/*useEffect(() =>{
    const subscriber = auth().onAuthStateChanged();
    return subscriber;
  },[])
*/}

  return (
    <>
     <PaperProvider theme={theme}>
       <StatusBar barStyle='light-content'/>
        <View style={styles.container}>
         <Form />
        </View>
     </PaperProvider>
    </>
  )
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default App;