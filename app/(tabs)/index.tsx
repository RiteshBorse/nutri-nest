import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

type UserPreferences = {
  goal: 'gain' | 'loss' | 'maintain';
  weight: string;
  height: string;
  age: string;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dietaryRestrictions: string;
};

export default function HomeScreen() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    goal: 'maintain',
    weight: '',
    height: '',
    age: '',
    activityLevel: 'moderate',
    dietaryRestrictions: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateMealPlan = async () => {
    try {
      setLoading(true);
      setError('');

      // Validate inputs
      if (!preferences.weight || !preferences.height || !preferences.age) {
        throw new Error('Please fill in all required fields');
      }

      const prompt = `Generate a personalized meal plan for someone with the following preferences:
        Goal: ${preferences.goal} weight
        Weight: ${preferences.weight} kg
        Height: ${preferences.height} cm
        Age: ${preferences.age} years
        Activity Level: ${preferences.activityLevel}
        Dietary Restrictions: ${preferences.dietaryRestrictions || 'None'}

        Please provide a detailed meal plan with:
        1. Daily calorie target
        2. Macro nutrient breakdown
        3. 4 meals per day with recipes
        4. Snack suggestions
        Format the response in JSON with the following structure:
        {
          "dailyCalories": number,
          "macros": {
            "protein": number,
            "carbs": number,
            "fats": number
          },
          "meals": [
            {
              "name": string,
              "type": "breakfast" | "lunch" | "dinner",
              "calories": number,
              "protein": number,
              "carbs": number,
              "fats": number,
              "ingredients": string[],
              "instructions": string
            }
          ],
          "snacks": [
            {
              "name": string,
              "calories": number,
              "protein": number,
              "carbs": number,
              "fats": number
            }
          ]
        }`;

      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBScRlazwOjcpWaKgEa8kbAa9oMbhimNsQ',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }
      
      // Navigate to meals screen with the generated plan
      router.push({
        pathname: '/(tabs)/meals',
        params: { mealPlan: JSON.stringify(data) }
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate meal plan';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NutriNest AI</Text>
        <Text style={styles.headerSubtitle}>Your personal nutrition assistant</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Goal</Text>
            <View style={styles.goalButtons}>
              {(['gain', 'loss', 'maintain'] as const).map((goal) => (
                <TouchableOpacity
                  key={goal}
                  style={[
                    styles.goalButton,
                    preferences.goal === goal && styles.selectedGoal
                  ]}
                  onPress={() => setPreferences({ ...preferences, goal })}
                >
                  <Text style={[
                    styles.goalButtonText,
                    preferences.goal === goal && styles.selectedGoalText
                  ]}>
                    {goal.charAt(0).toUpperCase() + goal.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              value={preferences.weight}
              onChangeText={(text) => setPreferences({ ...preferences, weight: text })}
              keyboardType="numeric"
              placeholder="Enter your weight"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={preferences.height}
              onChangeText={(text) => setPreferences({ ...preferences, height: text })}
              keyboardType="numeric"
              placeholder="Enter your height"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={preferences.age}
              onChangeText={(text) => setPreferences({ ...preferences, age: text })}
              keyboardType="numeric"
              placeholder="Enter your age"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Activity Level</Text>
            <View style={styles.activityButtons}>
              {(['sedentary', 'light', 'moderate', 'active', 'very_active'] as const).map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.activityButton,
                    preferences.activityLevel === level && styles.selectedActivity
                  ]}
                  onPress={() => setPreferences({ ...preferences, activityLevel: level })}
                >
                  <Text style={[
                    styles.activityButtonText,
                    preferences.activityLevel === level && styles.selectedActivityText
                  ]}>
                    {level.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dietary Restrictions (optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={preferences.dietaryRestrictions}
              onChangeText={(text) => setPreferences({ ...preferences, dietaryRestrictions: text })}
              placeholder="e.g., vegetarian, gluten-free, etc."
              multiline
              numberOfLines={3}
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.generateButton}
            onPress={handleGenerateMealPlan}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.generateButtonText}>Generate Meal Plan</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
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
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  goalButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  goalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  selectedGoal: {
    backgroundColor: '#2E7D32',
  },
  goalButtonText: {
    color: '#666',
    fontSize: 16,
  },
  selectedGoalText: {
    color: '#fff',
  },
  activityButtons: {
    gap: 8,
  },
  activityButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  selectedActivity: {
    backgroundColor: '#2E7D32',
  },
  activityButtonText: {
    color: '#666',
    fontSize: 16,
  },
  selectedActivityText: {
    color: '#fff',
  },
  generateButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  error: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
  },
});
