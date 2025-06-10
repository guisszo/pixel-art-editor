import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface PixelCellProps {
    color: string | null
    onPress: () => void
    size?: number
}

export const PixelCell: React.FC<PixelCellProps> = ({ color, onPress, size = 20 }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.cell, {
                backgroundColor: color ?? '#eee',
                width: size,
                height: size,
            }]}
        />
    )
}

const styles = StyleSheet.create({
    cell: {
        margin: 1,
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
})
