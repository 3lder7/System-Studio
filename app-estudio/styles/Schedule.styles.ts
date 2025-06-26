import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A6B7C',
  },
  headerControls: {
    flexDirection: 'row',
    gap: 10,
  },
  container: {
    padding: 20,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
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
  sectionSubtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#3339',
  },

  // Semana
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#E8EEF1',
  },
  weekDayToday: {
    backgroundColor: '#2A6B7C',
  },
  weekDaySelected: {
    backgroundColor: '#144A59',
  },
  weekDayText: {
    color: '#2A6B7C',
    fontWeight: '600',
    fontSize: 14,
  },
  weekDayTextActive: {
    color: '#FFFFFF',
  },
  weekDayDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2A6B7C',
  },

  // Dia
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeSlotHour: {
    width: 60,
    fontSize: 14,
    color: '#444',
  },
  timeSlotLine: {
    height: 1,
    backgroundColor: '#CCC',
    flex: 1,
  },

  // Mês
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  calendarDay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8EEF1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentDay: {
    backgroundColor: '#2A6B7C',
  },
  calendarDayText: {
    color: '#2A6B7C',
    fontWeight: '600',
  },
});
export default styles;