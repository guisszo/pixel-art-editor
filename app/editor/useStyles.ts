import { useMemo } from "react";
import { Platform, StyleSheet } from "react-native";

export const useStyles = () => {
  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f2f2f2'
    },
    headerButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 10
    },
    toolbarStyle: {
      flexDirection: 'row',
      marginHorizontal: 20,
      justifyContent: 'space-around',
      marginVertical: 10,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 12,
    },
    horizontalScrollViewWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginTop: 20,
    },
    modalButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    cancelButton: {
      backgroundColor: '#F0F0F0',
    },
    saveButton: {
      backgroundColor: '#5EC5DF',
    },
    cancelText: {
      color: '#333',
      fontWeight: '600',
    },
    saveText: {
      color: '#fff',
      fontWeight: '600',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      ...Platform.select({
        android: {
          elevation: 5,
        },
      }),
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 12,
      width: '80%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
    },
    configHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      gap: 10,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginTop: 20,
      marginBottom: 12,
    },
    presetContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 10,
    },
    presetButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    presetButtonActive: {
      backgroundColor: '#61BCD3',
      borderColor: '#61BCD3',
    },
    presetText: {
      fontSize: 14,
      color: '#666',
      fontWeight: '500',
    },
    presetTextActive: {
      color: 'white',
    },
    sliderContainer: {
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    sliderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    sliderLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
    },
    sliderButtons: {
      flexDirection: 'row',
      gap: 8,
    },
    sliderButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#61BCD3',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#61BCD3',
    },
    slider: {
      width: '100%',
      height: 40,
    },
    zoomControls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      backgroundColor: '#f8f8f8',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    zoomButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 15,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    zoomText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      minWidth: 50,
      textAlign: 'center',
    },
    previewInfo: {
      backgroundColor: '#f0f8ff',
      padding: 15,
      borderRadius: 8,
      marginTop: 20,
      borderWidth: 1,
      borderColor: '#e0e8f0',
    },
    previewText: {
      fontSize: 14,
      color: '#0066cc',
      textAlign: 'center',
      marginBottom: 5,
    },
    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center',
    },
  }), []);

  return styles;
};
