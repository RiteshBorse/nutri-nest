import { View, Text, StyleSheet, ScrollView } from 'react-native';

const healthFacts = [
  'Drinking enough water can boost your metabolism and energy levels.',
  'Regular physical activity reduces the risk of chronic diseases.',
  'A balanced diet includes a variety of fruits and vegetables.',
  'Quality sleep is essential for mental and physical health.',
  'Managing stress is important for overall well-being.'
];

const everydayTips = [
  'Start your day with a healthy breakfast.',
  'Take short walks during work breaks.',
  'Stay hydrated throughout the day.',
  'Limit processed foods and added sugars.',
  'Practice mindfulness or meditation for a few minutes daily.'
];

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <Text style={styles.headerSubtitle}>Health Facts & Everyday Tips</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Facts</Text>
          {healthFacts.map((fact, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardText}>{fact}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Everyday Tips</Text>
          {everydayTips.map((tip, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardText}>{tip}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
});
