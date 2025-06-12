import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2A6B7C',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  statCardAccent: {
    width: 4,
    backgroundColor: '#4ECDC4',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  statCardContent: {
    padding: 20,
    flex: 1,
  },
  statCardTitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  statCardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2A6B7C',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A6B7C',
    marginBottom: 10,
  },
  noCommitmentsText: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginVertical: 20,
  },
  commitmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  commitmentDetails: {
    flex: 1,
  },
  commitmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  commitmentSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginVertical: 2,
  },
  commitmentDate: {
    fontSize: 12,
    color: '#999999',
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  statusPendente: {
    backgroundColor: '#FFC145',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  bottomSpacer: {
    height: 80,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2A6B7C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 10,
  },
  floatingButtonText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
});

export default styles;