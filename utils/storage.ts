import { Pixel } from '@/features/pixelArts/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PREFIX = 'PIXEL_ART_'

export const saveGridToStorage = async (name: string, grid: (string | null)[][]) => {
    try {
        await AsyncStorage.setItem(`${PREFIX}${name}`, JSON.stringify(grid))
    } catch (e) {
        console.error('Erreur lors de la sauvegarde', e)
    }
}

export const loadGridFromStorage = async (name: string) => {
    try {
        const data = await AsyncStorage.getItem(`${PREFIX}${name}`)
        return data ? (JSON.parse(data) as Pixel[][]) : null
    } catch (e) {
        console.error('Erreur lors du chargement', e)
        return null
    }
}

export const listSavedGrids = async (): Promise<string[]> => {
    const keys = await AsyncStorage.getAllKeys()
    return keys.filter((k) => k.startsWith(PREFIX)).map((k) => k.replace(PREFIX, ''))
}

export const deleteGridFromStorage = async (name: string) => {
    try {
        await AsyncStorage.removeItem(`${PREFIX}${name}`)
    } catch (e) {
        console.error('Erreur lors de la suppression', e)
    }
}

