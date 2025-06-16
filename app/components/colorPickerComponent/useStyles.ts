import { getScreenLayout } from "@/utils";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useStyles = () => {
    const { isMobile, isLandscape } = getScreenLayout();
    const styles = useMemo(() => StyleSheet.create({
        pickerContainer: {
            alignItems: 'center',
            marginVertical: 15
        },
        picker: {
            width: isLandscape || isMobile ? 230 : 280,
            height: isLandscape || isMobile ? 230 : 280
        },
        panel: {
            borderRadius: 16,
            width: isLandscape || isMobile ? '65%' : '70%',
            height: isLandscape || isMobile ? '65%' : '70%',
            alignSelf: 'center'
        },
        sliderHue: {
            justifyContent: 'center',
            marginTop: 20
        }
    }), [isLandscape, isMobile]);

    return styles;
}