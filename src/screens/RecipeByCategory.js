import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {APP_ID, APP_KEY} from '../Keys';
import {useNavigation, useRoute} from '@react-navigation/native';

const RecipeByCategory = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    searchRecipe();
  }, []);
  const searchRecipe = () => {
    console.log(search);
    var myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=food&app_id=${APP_ID}&app_key=${APP_KEY}&mealType=${route.params.data}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result.hits);
        setRecipes(result.hits);
      })
      .catch(error => console.log('error', error));
  };
  return (
    <View style={styles.conatainer}>
      <StatusBar barStyle={'dark-content'} />
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={require('../images/back.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <FlatList
        data={recipes}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.recipeItem}
              onPress={() => {
                navigation.navigate('Details', {data: item});
              }}>
              <Image
                source={{uri: item.recipe.image}}
                style={styles.itemImage}
              />
              <View>
                <Text style={styles.title}>
                  {item.recipe.label.length > 40
                    ? item.recipe.label.substring(0, 40) + '...'
                    : item.recipe.label}
                </Text>
                <Text style={styles.source}>{item.recipe.source}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default RecipeByCategory;
const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
  },
  backBtn: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 60,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  searchBox: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 8,
    borderColor: '#9e9e9e',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  input: {
    width: '80%',
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  close: {
    width: 20,
    height: 20,
  },
  searchBtn: {
    width: '40%',
    height: 50,
    backgroundColor: '#05B681',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchTitle: {
    fontSize: 16,
    color: 'white',
  },
  recipeItem: {
    width: '90%',
    height: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 90,
    height: 90,
    marginLeft: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    width: '60%',
    fontWeight: '500',
    marginLeft: 10,
  },
  source: {
    fontSize: 16,
    width: '60%',
    fontWeight: '500',
    marginLeft: 10,
    marginTop: 10,
    color: 'green',
  },
});
