import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Animatable.Image
        animation={'slideInUp'}
        source={require('../images/logo.png')}
        style={styles.logo}
      />
      <Animatable.Text animation={'slideInUp'} style={styles.appName}>
        RecipePro
      </Animatable.Text>
      <Animatable.Text animation={'slideInUp'} style={styles.tagline}>
        Search AnyRecipe with helth filters
      </Animatable.Text>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05B681',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  appName: {
    fontSize: 50,
    fontWeight: '600',
    color: 'black',
    marginTop: 10,
  },
  tagline: {
    position: 'absolute',
    bottom: 50,
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
});
