import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2A6B7C',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    minHeight: 40,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#2A6B7C',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});