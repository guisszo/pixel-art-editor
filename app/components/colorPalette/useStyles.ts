import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useStyles = () => {

    const styles = useMemo(() => StyleSheet.create({
        container: {
            position: 'absolute',
            bottom:  0 ,
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
        colorsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: 10,
        },
        colorBlock: {
            width: 32,
            height: 32,
            borderRadius: 100,
            margin: 6,
            borderWidth: 2,
            borderColor: '#ccc',
        },
        selected: {
            borderColor: '#000',
            borderWidth: 2,
        },
        backdrop: {
            ...StyleSheet.absoluteFillObject,
            // backgroundColor: 'rgba(0,0,0,0.3)',
        },
    }), []);
    return styles;
}