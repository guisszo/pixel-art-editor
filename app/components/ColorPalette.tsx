import { setColor } from '@/features/pixelArts/pixelArtsReducer'
import { getSelectedColor } from '@/store/gridPixelSelectors'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

interface ColorPaletteProps {
    colors: string[]
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
    const dispatch = useDispatch()
    const selectedColor = useSelector(getSelectedColor)

    return (
        <View style={styles.container}>
            {
                colors.map((color) => {
                    const isSelected = color === selectedColor
                    return (
                        <Pressable
                            key={color}
                            onPress={() => dispatch(setColor(color))}
                            style={[
                                styles.colorBlock,
                                { backgroundColor: color },
                                isSelected && styles.selected,
                            ]}
                        />
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    colorBlock: {
        width: 32,
        height: 32,
        borderRadius: 4,
        margin: 5,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    selected: {
        borderColor: '#000',
        borderWidth: 3,
    },
})
