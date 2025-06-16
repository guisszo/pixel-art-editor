import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useStyles = (selectedColor: string) => {
    const styles = useMemo(() => StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: 10,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: -2 },
            shadowRadius: 8,
            overflow: 'hidden',
            zIndex: 999,
        },
        touchable: {
            padding: 10,
            alignItems: 'center',
        },
        title: {
            fontWeight: '600',
            fontSize: 14,
            color: '#555',
        },
        expandedContent: {
            flex: 1,
            paddingHorizontal: 10,
        },
        toggleContainer: {
            flexDirection: 'row',
            marginBottom: 15,
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
            padding: 2,
        },
        toggleButton: {
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 6,
            alignItems: 'center',
        },
        toggleButtonActive: {
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 2,
            elevation: 2,
        },
        toggleText: {
            fontSize: 12,
            fontWeight: '500',
            color: '#666',
        },
        toggleTextActive: {
            color: '#333',
            fontWeight: '600',
        },
        colorsWrapperView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        colorsContainer: {
            flex:1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            // justifyContent: 'center',
            paddingVertical: 5,
        },
        colorBlock: {
            width: 32,
            height: 32,
            borderRadius: 100,
            margin: 6,
            borderWidth: 2,
            borderColor: '#ccc',
        },
        colorPreview: {
            backgroundColor: selectedColor,
            width: 100,
            height: 100,
            borderRadius: 100
        },
        selected: {
            borderColor: '#000',
            borderWidth: 2,
        },
        backdrop: {
            ...StyleSheet.absoluteFillObject,
            // backgroundColor: 'rgba(0,0,0,0.3)',
        },
    }), [selectedColor]);

    return styles;
}