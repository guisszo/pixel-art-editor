import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PixelCell } from '../PixelCell';
import { useController } from './useController';

interface PixelGridProps {
    rows: number;
    cols: number;
    cellSize?: number;
};
export const PixelGrid: React.FC<PixelGridProps> = ({ rows, cols, cellSize = 20 }) => {

    const {
        grid,
        handleCellPress
    } = useController({ rows, cols });

    return (
        <View style={styles.grid}>
            {
                grid.map((row, y) => (
                    <View
                        key={y}
                        style={styles.row}>
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
    )
}
const styles = StyleSheet.create({
    grid: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
    },
    row: {
        flexDirection: 'row',
    },
})