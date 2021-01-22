import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data);
      setRepositories(response.data);
    })
  }, []);
  
  async function handleLikeRepository(id) {
    
    const response = await api.post(`repositories/${ id }/like`);
    const newRepo = response.data;

    const repoIndex = repositories.findIndex(repo => repo.id === id);
    const updatedRepo = repositories;
    updatedRepo[repoIndex] = newRepo;

    setRepositories([...updatedRepo]);
  }

  function checkArr(arr) {
    console.log(typeof arr);
    console.log(Array.isArray(arr));
    console.log(arr);
  }

  
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <View>

          <FlatList 
            data={ repositories }
            renderItem={ ({ item: repo }) => (
              <>
                <View style={ styles.repositoryContainer }>
                  <Text style={styles.repository}>{ repo.title }</Text>

                  <View style={styles.techsContainer}>
                    
                    { repo.techs.map((tech, techIndex) =>
                      <Text 
                        style={styles.tech}
                        key={techIndex}
                      >
                        { tech }
                      </Text>
                    ) }

                  </View>

                  <View style={styles.likesContainer}>
                    <Text
                      style={styles.likeText}
                      testID={`repository-likes-${ repo.id }`}
                    >
                      { repo.likes } curtidas
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleLikeRepository(repo.id)}
                    testID={`like-button-${ repo.id }`}
                  >
                    <Text style={styles.buttonText}>Curtir</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            keyExtractor={repo => repo.id}
          />
          
        </View>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    marginTop: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
    borderRadius: 3,
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    borderRadius: 5,
    textAlign: "center",
  },
});
