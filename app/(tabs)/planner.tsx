import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define SavedMeal type
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

// Set locale config if needed
LocaleConfig.locales['en'] = LocaleConfig.locales[''];
LocaleConfig.defaultLocale = 'en';

function getToday() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function getDayNumber() {
  const today = new Date();
  return today.getDate();
}

function getMonthShort() {
  const today = new Date();
  return today.toLocaleString('default', { month: 'short' }).toUpperCase();
}

export default function PlannerScreen() {
  const [markedDates, setMarkedDates] = useState({
    // Example: mark the first week as completed
    '2024-06-01': { marked: true, dotColor: '#2E7D32' },
    '2024-06-02': { marked: true, dotColor: '#2E7D32' },
    '2024-06-03': { marked: true, dotColor: '#2E7D32' },
    '2024-06-04': { marked: true, dotColor: '#2E7D32' },
    '2024-06-05': { marked: true, dotColor: '#2E7D32' },
    [getToday()]: { selected: true, selectedColor: '#2E7D32' },
  });
  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>([]);

  useEffect(() => {
    const loadSavedMeals = async () => {
      try {
        const meals = await AsyncStorage.getItem('savedMeals');
        if (meals) {
          setSavedMeals(JSON.parse(meals));
        } else {
          setSavedMeals([]);
        }
      } catch (error) {
        setSavedMeals([]);
      }
    };
    loadSavedMeals();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meal Planner</Text>
        <Text style={styles.headerSubtitle}>Plan your meals for the week</Text>
      </View>

      <View style={styles.calendarHeaderContainer}>
        <View style={styles.dayBadgeContainer}>
          <View style={styles.badgeHexagon}>
            <Text style={styles.badgeDay}>{getDayNumber()}</Text>
            <Text style={styles.badgeMonth}>{getMonthShort()}</Text>
          </View>
        </View>
        <View style={styles.dayInfoContainer}>
          <Text style={styles.dayInfoTitle}>Day {getDayNumber()} <Text style={styles.dayInfoTime}>15:27:50 left</Text></Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Calendar
          current={getToday()}
          markedDates={markedDates}
          theme={{
            backgroundColor: '#fff',
            calendarBackground: '#fff',
            textSectionTitleColor: '#2E7D32',
            selectedDayBackgroundColor: '#2E7D32',
            selectedDayTextColor: '#fff',
            todayTextColor: '#2E7D32',
            dayTextColor: '#2E7D32',
            textDisabledColor: '#ccc',
            dotColor: '#2E7D32',
            selectedDotColor: '#fff',
            arrowColor: '#2E7D32',
            monthTextColor: '#2E7D32',
            indicatorColor: '#2E7D32',
            textDayFontWeight: '500',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          style={styles.calendar}
        />
        <Text style={styles.sectionTitle}>Saved Meals</Text>
        <ScrollView style={styles.mealsList}>
          {savedMeals.length === 0 ? (
            <Text style={styles.emptyText}>No saved meals yet. Save meals from your meal plans!</Text>
          ) : (
            savedMeals.map((meal) => (
              <View key={meal.id} style={styles.mealCard}>
                <Image source={{ uri: meal.image }} style={styles.mealImage} />
                <View style={styles.mealInfo}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealDate}>{meal.date}</Text>
                  <View style={styles.macrosContainer}>
                    <View style={styles.macroContainer}>
                      <Text style={[styles.macroValue, { color: '#2E7D32' }]}>{meal.protein}g</Text>
                      <Text style={styles.macroLabel}>Protein</Text>
                    </View>
                    <View style={styles.macroContainer}>
                      <Text style={[styles.macroValue, { color: '#1976D2' }]}>{meal.carbs}g</Text>
                      <Text style={styles.macroLabel}>Carbs</Text>
                    </View>
                    <View style={styles.macroContainer}>
                      <Text style={[styles.macroValue, { color: '#D32F2F' }]}>{meal.fats}g</Text>
                      <Text style={styles.macroLabel}>Fats</Text>
                    </View>
                  </View>
                  <Text style={styles.calories}>{meal.calories} calories</Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  calendarHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  dayBadgeContainer: {
    marginRight: 16,
  },
  badgeHexagon: {
    width: 56,
    height: 64,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeDay: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  badgeMonth: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 0.8,
  },
  dayInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dayInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  dayInfoTime: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'normal',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  calendar: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  mealsList: {
    flex: 1,
  },
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  mealImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  mealDate: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'normal',
  },
  macrosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  macroContainer: {
    marginRight: 16,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  macroLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'normal',
  },
  calories: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'normal',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 16,
  },
}); 