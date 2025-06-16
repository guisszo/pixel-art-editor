import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

type AnimatedToolButtonProps = {
    tool: { type: string; label: React.ComponentType<{ color: string; size: number }> };
    index: number;
    selectedTool: string;
    isDisabled: boolean;
    onPress: () => void;
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);


export const AnimatedToolButton: React.FC<AnimatedToolButtonProps> = ({ tool, index, selectedTool, isDisabled, onPress }) => {
    const scale = useSharedValue(1);
    const rotation = useSharedValue(0);
    const translateY = useSharedValue(0);
    const shadowOpacity = useSharedValue(0.1);

    const ToolIcon = tool.label;
    const isValid = selectedTool === tool.type && index <= 2;

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { rotate: `${rotation.value}deg` },
            { translateY: translateY.value }
        ],
        shadowOpacity: shadowOpacity.value,
        elevation: shadowOpacity.value * 50,
    }));

    const onPressIn = () => {
        scale.value = withSpring(0.9, { damping: 12, stiffness: 600 });
        translateY.value = withSpring(2, { damping: 10, stiffness: 600 });
        shadowOpacity.value = withSpring(0.05, { damping: 10, stiffness: 600 });
    };

    const onPressOut = () => {
        scale.value = withSpring(1.05, { damping: 10, stiffness: 600 }, () => {
            scale.value = withSpring(1, { damping: 12, stiffness: 600 });
        });
        translateY.value = withSpring(0, { damping: 10, stiffness: 600 });
        shadowOpacity.value = withSpring(isValid ? 0.2 : 0.1, { damping: 10, stiffness: 600 });
    };

    const handlePress = () => {
        if (tool.type === 'reset') {
            rotation.value = withSpring(rotation.value + 360, { damping: 10, stiffness: 300 });
            scale.value = withSpring(1.1, { damping: 6 }, () => {
                scale.value = withSpring(0.95, { damping: 6 }, () => {
                    scale.value = withSpring(1, { damping: 10 });
                });
            });
        } else if (tool.type === 'undo' || tool.type === 'redo') {
            const direction = tool.type === 'undo' ? -10 : 10;

            translateY.value = withSpring(direction, {
                damping: 10,
                stiffness: 250,
                mass: 0.3,
            }, () => {
                translateY.value = withSpring(0, {
                    damping: 12,
                    stiffness: 250,
                    mass: 0.3,
                });
            });

            scale.value = withSpring(1.1, {
                damping: 12,
                stiffness: 300,
                mass: 0.3,
            }, () => {
                scale.value = withSpring(1, {
                    damping: 14,
                    stiffness: 300,
                    mass: 0.3,
                });
            });
        }
        else {
            scale.value = withSpring(1.15, { damping: 8, stiffness: 700 }, () => {
                scale.value = withSpring(1, { damping: 12, stiffness: 500 });
            });
        }

        onPress();
    };

    return (
        <AnimatedTouchableOpacity
            disabled={isDisabled}
            onPress={handlePress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[
                styles.button,
                isValid && styles.selected,
                isDisabled && styles.disabled,
                animatedStyle
            ]}
            activeOpacity={0.7}
        >
            <ToolIcon
                color={isValid ? "#fff" : isDisabled ? "#999" : "#333"}
                size={24}
            />
        </AnimatedTouchableOpacity>
    );
};

const styles = StyleSheet.create({
    disabled: {
        opacity: 0.5,
    },
    button: {
        marginHorizontal: 8,
        padding: 5,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
        overflow: 'hidden'
    },
    selected: {
        backgroundColor: '#61BCD3',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
});