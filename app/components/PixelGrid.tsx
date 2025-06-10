import { fillPixel, initializeGrid } from '@/features/pixelArts/pixelArtsReducer'
import { getGrid } from '@/store/gridPixelSelectors'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { PixelCell } from './PixelCell'

export const PixelGrid: React.FC<{
    rows: number; cols: number, cellSize?: number
}> = ({ rows, cols, cellSize = 20 }) => {
    const dispatch = useDispatch()
    const grid = useSelector(getGrid)

    useEffect(() => {
        dispatch(initializeGrid({ rows, cols }))
    }, [rows, cols])

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
                                    onPress={() => dispatch(fillPixel({ x, y }))}
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