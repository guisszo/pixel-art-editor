import { useCallback } from 'react';
import { View } from "react-native";
import { runOnJS } from 'react-native-reanimated';
import ColorPicker, { ColorFormatsObject, HueSlider, Panel1 } from 'reanimated-color-picker';

interface PickerComponentProps {
    onColorSelect: (color: string) => void;
    selectedColor: string
}

export const ColorPickerComponent: React.FC<PickerComponentProps> = ({
    onColorSelect,
    selectedColor
}) => {
    const onSelectColor = useCallback((color: ColorFormatsObject) => {
        'worklet';
        runOnJS(onColorSelect)(color.hex);
    }, [onColorSelect]);

    const onCompleteColor = useCallback((color: ColorFormatsObject) => {
        'worklet';
        runOnJS(onColorSelect)(color.hex);
    }, [onColorSelect]);

    return (
        <View style={{ alignItems: 'center', marginVertical: 15 }}>
            <ColorPicker
                value={selectedColor}
                onComplete={onCompleteColor}
                onChange={onSelectColor}
                style={{ width: 280, height: 280 }}
                thumbSize={24}
                sliderThickness={20}
                boundedThumb={true}
            >
                <Panel1 style={{
                    borderRadius: 16,
                    width: '70%',
                    height: '70%',
                    alignSelf: 'center'
                }} />
                <HueSlider style={{
                    justifyContent: 'center',
                    marginTop: 20
                }} thumbShape='pill' />
            </ColorPicker>
        </View>
    );
};