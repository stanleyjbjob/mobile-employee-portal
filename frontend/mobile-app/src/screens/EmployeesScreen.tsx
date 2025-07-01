import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Title, Paragraph, Searchbar, FAB, ActivityIndicator, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Employee } from '../types/api';
import { apiService } from '../services/ApiService';
import { spacing } from '../utils/theme';

const EmployeesScreen: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [searchQuery, employees]);

  const loadEmployees = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getEmployees();
      setEmployees(data);
    } catch (error: any) {
      Alert.alert('Error', 'Failed to load employees');
    } finally {
      setIsLoading(false);
    }
  };

  const filterEmployees = () => {
    if (!searchQuery.trim()) {
      setFilteredEmployees(employees);
      return;
    }

    const filtered = employees.filter(employee =>
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const renderEmployee = ({ item }: { item: Employee }) => (
    <Card style={styles.employeeCard}>
      <Card.Content>
        <View style={styles.employeeHeader}>
          <View style={styles.employeeInfo}>
            <Title style={styles.employeeName}>
              {item.firstName} {item.lastName}
            </Title>
            <Paragraph style={styles.employeeEmail}>{item.email}</Paragraph>
          </View>
          <MaterialCommunityIcons
            name="account-circle"
            size={50}
            color="#1976d2"
          />
        </View>
        
        <View style={styles.employeeDetails}>
          {item.position && (
            <Chip mode="outlined" style={styles.chip}>
              {item.position}
            </Chip>
          )}
          {item.department && (
            <Chip mode="outlined" style={styles.chip}>
              {item.department}
            </Chip>
          )}
        </View>

        <View style={styles.employeeMeta}>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="calendar" size={16} color="#666" />
            <Paragraph style={styles.metaText}>
              Hired: {new Date(item.hireDate).toLocaleDateString()}
            </Paragraph>
          </View>
          {item.phoneNumber && (
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="phone" size={16} color="#666" />
              <Paragraph style={styles.metaText}>{item.phoneNumber}</Paragraph>
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search employees..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      
      <FlatList
        data={filteredEmployees}
        renderItem={renderEmployee}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="account-search" size={80} color="#ccc" />
            <Title style={styles.emptyTitle}>No employees found</Title>
            <Paragraph style={styles.emptyText}>
              {searchQuery ? 'Try adjusting your search' : 'Add your first employee'}
            </Paragraph>
          </View>
        }
      />

      <FAB
        icon="account-plus"
        style={styles.fab}
        onPress={() => {
          // Navigate to add employee screen
          Alert.alert('Add Employee', 'Navigate to add employee screen');
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbar: {
    margin: spacing.md,
    marginBottom: spacing.sm,
  },
  listContent: {
    padding: spacing.md,
    paddingTop: 0,
  },
  employeeCard: {
    marginBottom: spacing.md,
  },
  employeeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  employeeEmail: {
    color: '#666',
    fontSize: 14,
  },
  employeeDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  chip: {
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  employeeMeta: {
    flexDirection: 'column',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  metaText: {
    marginLeft: spacing.xs,
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    marginTop: spacing.md,
    color: '#666',
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  fab: {
    position: 'absolute',
    margin: spacing.md,
    right: 0,
    bottom: 0,
    backgroundColor: '#1976d2',
  },
});

export default EmployeesScreen;