import { useMemo } from "react";
import { StyleSheet } from "react-native";

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
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
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

    }), []);

    return styles;
}