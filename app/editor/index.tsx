import { DEFAULT_COLORS } from '@/constants/colors'
import { getGrid, isGridEmpty } from '@/features/pixelArts/gridPixelSelectors'
import { saveGridToStorage } from '@/utils/storage'
import { Link, useNavigation } from 'expo-router'
import { FolderUp, Save } from 'lucide-react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { Alert, Button, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ColorPalette, PixelGrid, ToolBar } from '../components'

export default function EditorScreen() {
    const dispatch = useDispatch();
    const grid = useSelector(getGrid);
    const isEmptyGrid = isGridEmpty(grid);
    const [saveModalVisible, setSaveModalVisible] = useState(false)
    const [saveName, setSaveName] = useState('')
    const currentGrid = useSelector(getGrid);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Éditeur',
            headerRight: () => (
                <View style={styles.headerButtons}>
                    <TouchableOpacity
                        disabled={isEmptyGrid}
                        onPress={() => setSaveModalVisible(true)}
                        style={{ marginRight: 12 }}
                    >
                        <Save color={isEmptyGrid ? 'grey' : undefined} size={22} />
                    </TouchableOpacity>
                    <Link href="/gallery" asChild>
                        <TouchableOpacity>
                            <FolderUp size={22} />
                        </TouchableOpacity>
                    </Link>
                </View>
            )
        })
    }, [navigation, isEmptyGrid]);

    const handleSave = useCallback(async () => {
        if (!saveName.trim()) return Alert.alert("Nom requis", "Donne un nom à ta création !")

        await saveGridToStorage(saveName.trim(), currentGrid);
        setSaveModalVisible(false);
        setSaveName('');
        alert('Création sauvegardée.')
    }, [saveName, currentGrid]);

    return (
        <SafeAreaView style={styles.container}>

            <ToolBar />

            <PixelGrid rows={16} cols={16} />
            <ColorPalette colors={DEFAULT_COLORS} />

            <Modal
                visible={saveModalVisible}
                transparent
                animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Nom de la création</Text>
                        <TextInput
                            placeholder="Ex: Mon pixel art"
                            value={saveName}
                            onChangeText={setSaveName}
                            style={styles.input}
                        />
                        <View style={styles.modalButtonContainer}>
                            <Button
                                title="Annuler"
                                onPress={() => setSaveModalVisible(false)}
                                color={'#EAEEEB'}
                            />
                            <Button title="Enregistrer" onPress={handleSave} />
                        </View>

                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10
    },
    toolbarStyle: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-around',
        marginVertical: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 12,
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },

})
