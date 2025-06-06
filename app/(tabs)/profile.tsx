import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

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
  const [savedMeals] = useState<SavedMeal[]>([
    {
      id: '1',
      name: 'Grilled Chicken Salad',
      calories: 450,
      protein: 35,
      carbs: 25,
      fats: 20,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      date: '2024-03-20'
    },
    {
      id: '2',
      name: 'Quinoa Bowl',
      calories: 380,
      protein: 15,
      carbs: 45,
      fats: 12,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      date: '2024-03-19'
    }
  ]);

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  const MacroNutrient = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <View style={styles.macroContainer}>
      <Text style={[styles.macroValue, { color }]}>{value}g</Text>
      <Text style={styles.macroLabel}>{label}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
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
          <Text style={styles.statValue}>12</Text>
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
        {savedMeals.map((meal) => (
          <TouchableOpacity key={meal.id} style={styles.mealCard}>
            <Image source={{ uri: meal.image }} style={styles.mealImage} />
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealDate}>{meal.date}</Text>
              <View style={styles.macrosContainer}>
                <MacroNutrient label="Protein" value={meal.protein} color="#2E7D32" />
                <MacroNutrient label="Carbs" value={meal.carbs} color="#1976D2" />
                <MacroNutrient label="Fats" value={meal.fats} color="#D32F2F" />
              </View>
              <Text style={styles.calories}>{meal.calories} calories</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  mealDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
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
}); 