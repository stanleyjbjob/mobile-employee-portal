import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph, List, Button, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../services/AuthContext';
import { spacing } from '../utils/theme';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const profileOptions = [
    {
      title: 'Edit Profile',
      description: 'Update your personal information',
      icon: 'account-edit',
      onPress: () => Alert.alert('Edit Profile', 'Navigate to edit profile screen'),
    },
    {
      title: 'Change Password',
      description: 'Update your password',
      icon: 'lock-reset',
      onPress: () => Alert.alert('Change Password', 'Navigate to change password screen'),
    },
    {
      title: 'Notifications',
      description: 'Manage notification preferences',
      icon: 'bell-outline',
      onPress: () => Alert.alert('Notifications', 'Navigate to notification settings'),
    },
    {
      title: 'Privacy Settings',
      description: 'Configure privacy options',
      icon: 'shield-account',
      onPress: () => Alert.alert('Privacy', 'Navigate to privacy settings'),
    },
    {
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: 'help-circle-outline',
      onPress: () => Alert.alert('Help', 'Navigate to help and support'),
    },
    {
      title: 'About',
      description: 'App version and information',
      icon: 'information-outline',
      onPress: () => Alert.alert('About', 'Employee Portal v1.0.0'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Text
            size={80}
            label={`${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`}
            style={styles.avatar}
          />
          <Title style={styles.name}>
            {user?.firstName} {user?.lastName}
          </Title>
          <Paragraph style={styles.email}>{user?.email}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.optionsCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Settings</Title>
          {profileOptions.map((option, index) => (
            <List.Item
              key={index}
              title={option.title}
              description={option.description}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={option.icon}
                  color="#1976d2"
                />
              )}
              right={(props) => (
                <List.Icon {...props} icon="chevron-right" />
              )}
              onPress={option.onPress}
              style={styles.listItem}
            />
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.actionsCard}>
        <Card.Content>
          <Button
            mode="outlined"
            onPress={handleLogout}
            icon="logout"
            style={styles.logoutButton}
            textColor="#d32f2f"
          >
            Logout
          </Button>
        </Card.Content>
      </Card>

      <View style={styles.footer}>
        <Paragraph style={styles.footerText}>
          Employee Portal v1.0.0
        </Paragraph>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    margin: spacing.md,
    marginBottom: spacing.sm,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  avatar: {
    backgroundColor: '#1976d2',
    marginBottom: spacing.md,
  },
  name: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  email: {
    color: '#666',
    fontSize: 16,
  },
  optionsCard: {
    margin: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  listItem: {
    paddingVertical: spacing.xs,
  },
  actionsCard: {
    margin: spacing.md,
    marginBottom: spacing.lg,
  },
  logoutButton: {
    borderColor: '#d32f2f',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  footerText: {
    color: '#999',
    fontSize: 12,
  },
});

export default ProfileScreen;