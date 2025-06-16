import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabItem: {
    fontSize: 16,
    color: '#999999',
  },
  tabActive: {
    color: '#2A6B7C',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A6B7C',
    marginBottom: 10,
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
  },
});