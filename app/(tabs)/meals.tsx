import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import mealsData from '../data/meals.json';

type Meal = {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  image: string;
  category: string;
  prepTime: string;
  ingredients: string[];
};

type GeneratedMealPlan = {
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  meals: Array<{
    name: string;
    type: 'breakfast' | 'lunch' | 'dinner';
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    ingredients: string[];
    instructions: string;
  }>;
  snacks: Array<{
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  }>;
};

export default function MealsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedMealPlan | null>(null);
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.mealPlan) {
      try {
        const rawData = JSON.parse(params.mealPlan as string);
        const mealPlanText = rawData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!mealPlanText) {
          throw new Error('No meal plan data found in API response');
        }

        // Clean up the response text by removing markdown formatting
        const cleanedText = mealPlanText
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();

        const mealPlan = JSON.parse(cleanedText);
        setGeneratedPlan(mealPlan);
      } catch (error) {
        console.error('Failed to parse meal plan:', error);
      }
    }
  }, [params.mealPlan]);

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner'];
  
  const filteredMeals = selectedCategory && selectedCategory !== 'All'
    ? mealsData.meals.filter(meal => meal.category === selectedCategory)
    : mealsData.meals;

  const MacroNutrient = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <View style={styles.macroContainer}>
      <Text style={[styles.macroValue, { color }]}>{value}g</Text>
      <Text style={styles.macroLabel}>{label}</Text>
    </View>
  );

  if (generatedPlan) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.summaryContainer}>
          <Text style={styles.title}>Your Personalized Meal Plan</Text>
          <View style={styles.dailySummary}>
            <Text style={styles.dailyCalories}>{generatedPlan.dailyCalories} calories</Text>
            <View style={styles.macrosContainer}>
              <MacroNutrient label="Protein" value={generatedPlan.macros.protein} color="#2E7D32" />
              <MacroNutrient label="Carbs" value={generatedPlan.macros.carbs} color="#1976D2" />
              <MacroNutrient label="Fats" value={generatedPlan.macros.fats} color="#D32F2F" />
            </View>
          </View>
        </View>

        {generatedPlan.meals.map((meal, index) => (
          <View key={index} style={styles.mealCard}>
            <View style={styles.mealInfo}>
              <View style={styles.mealHeader}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealCategory}>{meal.type}</Text>
              </View>
              
              <View style={styles.macrosContainer}>
                <MacroNutrient label="Protein" value={meal.protein} color="#2E7D32" />
                <MacroNutrient label="Carbs" value={meal.carbs} color="#1976D2" />
                <MacroNutrient label="Fats" value={meal.fats} color="#D32F2F" />
              </View>

              <View style={styles.ingredientsContainer}>
                <Text style={styles.sectionTitle}>Ingredients:</Text>
                {meal.ingredients.map((ingredient, idx) => (
                  <Text key={idx} style={styles.ingredient}>• {ingredient}</Text>
                ))}
              </View>

              <View style={styles.instructionsContainer}>
                <Text style={styles.sectionTitle}>Instructions:</Text>
                <Text style={styles.instructions}>{meal.instructions}</Text>
              </View>

              <Text style={styles.calories}>{meal.calories} calories</Text>
            </View>
          </View>
        ))}

        <View style={styles.snacksContainer}>
          <Text style={styles.sectionTitle}>Recommended Snacks:</Text>
          {generatedPlan.snacks.map((snack, index) => (
            <View key={index} style={styles.snackCard}>
              <Text style={styles.snackName}>{snack.name}</Text>
              <View style={styles.macrosContainer}>
                <MacroNutrient label="Protein" value={snack.protein} color="#2E7D32" />
                <MacroNutrient label="Carbs" value={snack.carbs} color="#1976D2" />
                <MacroNutrient label="Fats" value={snack.fats} color="#D32F2F" />
              </View>
              <Text style={styles.calories}>{snack.calories} calories</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Plans</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.mealsContainer}>
        {filteredMeals.map((meal: Meal) => (
          <View key={meal.id} style={styles.mealCard}>
            <Image
              source={{ uri: meal.image }}
              style={styles.mealImage}
            />
            <View style={styles.mealInfo}>
              <View style={styles.mealHeader}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealCategory}>{meal.category}</Text>
              </View>
              
              <Text style={styles.mealDescription}>{meal.description}</Text>
              
              <View style={styles.macrosContainer}>
                <MacroNutrient label="Protein" value={meal.protein} color="#2E7D32" />
                <MacroNutrient label="Carbs" value={meal.carbs} color="#1976D2" />
                <MacroNutrient label="Fats" value={meal.fats} color="#D32F2F" />
              </View>

              <View style={styles.mealFooter}>
                <Text style={styles.calories}>{meal.calories} calories</Text>
                <Text style={styles.prepTime}>{meal.prepTime}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  summaryContainer: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  dailySummary: {
    marginTop: 12,
  },
  dailyCalories: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: '#2E7D32',
  },
  categoryText: {
    color: '#666',
    fontSize: 16,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  mealsContainer: {
    flex: 1,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  mealInfo: {
    padding: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  mealCategory: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mealDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
  },
  macroContainer: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  macroLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  mealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calories: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
  },
  prepTime: {
    fontSize: 14,
    color: '#666',
  },
  ingredientsContainer: {
    marginBottom: 16,
  },
  instructionsContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  snacksContainer: {
    marginTop: 20,
  },
  snackCard: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  snackName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
}); 
 