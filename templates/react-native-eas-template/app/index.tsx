import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ENV } from '../config/env';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.content}>
        <Text style={styles.emoji}>🚀</Text>
        <Text style={styles.title}>Production Ready</Text>
        <Text style={styles.subtitle}>React Native EAS Template</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Environment</Text>
          <Text style={styles.infoValue}>{ENV.APP_ENV}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>API URL</Text>
          <Text style={styles.infoValue}>{ENV.API_URL}</Text>
        </View>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Features Included:</Text>
          <Text style={styles.feature}>✓ EAS Build & Update</Text>
          <Text style={styles.feature}>✓ Environment Configuration</Text>
          <Text style={styles.feature}>✓ Error Boundaries</Text>
          <Text style={styles.feature}>✓ Secure Storage</Text>
          <Text style={styles.feature}>✓ Biometric Auth</Text>
          <Text style={styles.feature}>✓ API Client with Interceptors</Text>
          <Text style={styles.feature}>✓ Logging & Monitoring</Text>
          <Text style={styles.feature}>✓ Testing Setup</Text>
          <Text style={styles.feature}>✓ CI/CD Workflows</Text>
        </View>

        <Link href="/modal" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Open Modal</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
  },
  features: {
    marginTop: 24,
    marginBottom: 24,
    width: '100%',
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  feature: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
