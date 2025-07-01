import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../services/AuthContext';
import { spacing } from '../utils/theme';

const DashboardScreen: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'View Employees',
      description: 'Browse and manage employee records',
      icon: 'account-group',
      color: '#1976d2',
    },
    {
      title: 'Add Employee',
      description: 'Register a new employee',
      icon: 'account-plus',
      color: '#388e3c',
    },
    {
      title: 'Reports',
      description: 'View employee reports and analytics',
      icon: 'chart-line',
      color: '#f57c00',
    },
    {
      title: 'Settings',
      description: 'Configure application settings',
      icon: 'cog',
      color: '#7b1fa2',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Title>Welcome back, {user?.firstName}!</Title>
            <Paragraph>Manage your employee portal efficiently</Paragraph>
          </Card.Content>
        </Card>

        <Title style={styles.sectionTitle}>Quick Actions</Title>
        
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <Card key={index} style={styles.actionCard}>
              <Card.Content style={styles.actionContent}>
                <MaterialCommunityIcons
                  name={action.icon as any}
                  size={40}
                  color={action.color}
                  style={styles.actionIcon}
                />
                <Title style={styles.actionTitle}>{action.title}</Title>
                <Paragraph style={styles.actionDescription}>
                  {action.description}
                </Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>

        <Card style={styles.statsCard}>
          <Card.Content>
            <Title>Statistics</Title>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Title style={styles.statNumber}>42</Title>
                <Paragraph>Total Employees</Paragraph>
              </View>
              <View style={styles.statItem}>
                <Title style={styles.statNumber}>8</Title>
                <Paragraph>New This Month</Paragraph>
              </View>
              <View style={styles.statItem}>
                <Title style={styles.statNumber}>5</Title>
                <Paragraph>Departments</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // Navigate to add employee screen
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: spacing.md,
  },
  welcomeCard: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    marginLeft: spacing.sm,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  actionCard: {
    width: '48%',
    marginBottom: spacing.md,
  },
  actionContent: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  actionIcon: {
    marginBottom: spacing.sm,
  },
  actionTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  actionDescription: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
  statsCard: {
    marginBottom: spacing.xxl,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    color: '#1976d2',
  },
  fab: {
    position: 'absolute',
    margin: spacing.md,
    right: 0,
    bottom: 0,
    backgroundColor: '#1976d2',
  },
});

export default DashboardScreen;