import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, RefreshControl, Alert } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

type SavedMeal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  image: string;
  date: string;
};

export default function ProfileScreen() {
  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadSavedMeals = async () => {
    try {
      const meals = await AsyncStorage.getItem('savedMeals');
      if (meals) {
        const parsedMeals = JSON.parse(meals);
        setSavedMeals(parsedMeals);
      }
    } catch (error) {
      console.error('Failed to load saved meals:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadSavedMeals();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadSavedMeals();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  };

  const handleRemoveMeal = async (mealId: string) => {
    Alert.alert(
      'Remove Meal',
      'Are you sure you want to remove this meal?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedMeals = savedMeals.filter(meal => meal.id !== mealId);
              await AsyncStorage.setItem('savedMeals', JSON.stringify(updatedMeals));
              setSavedMeals(updatedMeals);
            } catch (error) {
              console.error('Failed to remove meal:', error);
              Alert.alert('Error', 'Failed to remove meal. Please try again.');
            }
          },
        },
      ],
    );
  };

  const MacroNutrient = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <View style={styles.macroContainer}>
      <Text style={[styles.macroValue, { color }]}>{value}g</Text>
      <Text style={styles.macroLabel}>{label}</Text>
    </View>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>S</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>Sakshi</Text>
            <Text style={styles.email}>sakshi@gmail.com</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{savedMeals.length}</Text>
          <Text style={styles.statLabel}>Saved Meals</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Meal Plans</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>28</Text>
          <Text style={styles.statLabel}>Days Streak</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Meals</Text>
        {savedMeals.length === 0 ? (
          <Text style={styles.emptyText}>No saved meals yet. Generate and save meals from your meal plans!</Text>
        ) : (
          savedMeals.map((meal) => (
            <TouchableOpacity key={meal.id} style={styles.mealCard}>
              <Image source={{ uri: meal.image }} style={styles.mealImage} />
              <View style={styles.mealInfo}>
                <View style={styles.mealHeader}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => handleRemoveMeal(meal.id)}
                  >
                    <Ionicons name="trash-outline" size={24} color="#D32F2F" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.mealDate}>{meal.date}</Text>
                <View style={styles.macrosContainer}>
                  <MacroNutrient label="Protein" value={meal.protein} color="#2E7D32" />
                  <MacroNutrient label="Carbs" value={meal.carbs} color="#1976D2" />
                  <MacroNutrient label="Fats" value={meal.fats} color="#D32F2F" />
                </View>
                <Text style={styles.calories}>{meal.calories} calories</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#2E7D32',
    padding: 20,
    paddingTop: 40,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: -20,
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  mealImage: {
    width: '100%',
    height: 150,
  },
  mealInfo: {
    padding: 15,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  mealDate: {
    fontSize: 14,
    color: '#666',
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  macroContainer: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  calories: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  removeButton: {
    padding: 8,
  },
}); 