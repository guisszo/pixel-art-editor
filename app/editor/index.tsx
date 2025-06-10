import { DEFAULT_COLORS } from '@/constants/colors'
import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { ColorPalette } from '../components/ColorPalette'
import { PixelGrid } from '../components/PixelGrid'

export default function EditorScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Éditeur Pixel Art</Text>
            <PixelGrid rows={16} cols={16} />
            <ColorPalette colors={DEFAULT_COLORS} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
})
