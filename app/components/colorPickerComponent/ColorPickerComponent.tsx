import { useCallback } from 'react';
import { View } from "react-native";
import { runOnJS } from 'react-native-reanimated';
import ColorPicker, { ColorFormatsObject, HueSlider, Panel1 } from 'reanimated-color-picker';
import { useStyles } from './useStyles';

interface PickerComponentProps {
    onColorSelect: (color: string) => void;
    selectedColor: string
}

export const ColorPickerComponent: React.FC<PickerComponentProps> = ({
    onColorSelect,
    selectedColor
}) => {
    const styles = useStyles();
    const onSelectColor = useCallback((color: ColorFormatsObject) => {
        'worklet';
        runOnJS(onColorSelect)(color.hex);
    }, [onColorSelect]);

    const onCompleteColor = useCallback((color: ColorFormatsObject) => {
        'worklet';
        runOnJS(onColorSelect)(color.hex);
    }, [onColorSelect]);

    return (
        <View style={styles.pickerContainer}>
            <ColorPicker
                value={selectedColor}
                onComplete={onCompleteColor}
                onChange={onSelectColor}
                style={styles.picker}
                thumbSize={24}
                sliderThickness={20}
                boundedThumb={true}
            >
                <Panel1 style={styles.panel} />
                <HueSlider style={styles.sliderHue} thumbShape='pill' />
            </ColorPicker>
        </View>
    );
};