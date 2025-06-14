import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS } from 'react-native-reanimated';
import { PixelCell } from '../PixelCell';
import { useController } from './useController';

interface PixelGridProps {
    rows: number;
    cols: number;
    cellSize?: number;
}

export const PixelGrid: React.FC<PixelGridProps> = ({ rows, cols, cellSize = 20 }) => {
    const {
        grid,
        handleCellPress,
        getGridCoordinates
    } = useController({ rows, cols, cellSize });

    const gridRef = useRef<View>(null);

    const panGesture = Gesture.Pan()
        .onStart((event) => {
            runOnJS(getGridCoordinates)(event.x, event.y, false);
        })
        .onUpdate((event) => {
            runOnJS(getGridCoordinates)(event.x, event.y, true);
        })
        .onEnd(() => {
        });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={styles.container}>
                <View
                    ref={gridRef}
                    style={styles.grid}
                >
                    {
                        grid.map((row, y) => (
                            <View key={y} style={styles.row}>
                                {
                                    row.map((color, x) => (
                                        <PixelCell
                                            key={`${x}-${y}`}
                                            color={color}
                                            onPress={() => handleCellPress(x, y)}
                                            size={cellSize}
                                        />
                                    ))
                                }
                            </View>
                        ))
                    }
                </View>
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    grid: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
});