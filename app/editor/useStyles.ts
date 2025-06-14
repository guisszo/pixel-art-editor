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
    title: {
      fontSize: 20,
      marginVertical: 10
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
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50',
    },
    presetText: {
      fontSize: 14,
      color: '#666',
      fontWeight: '500',
    },
    presetTextActive: {
      color: 'white',
    },
    inputGroup: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: '#333',
      marginBottom: 6,
    },
    configInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      backgroundColor: 'white',
    },
    previewInfo: {
      backgroundColor: '#f8f9fa',
      padding: 16,
      borderRadius: 8,
      marginTop: 16,
    },
    previewText: {
      fontSize: 14,
      color: '#666',
      marginBottom: 4,
    },

  }), []);

  return styles;
}