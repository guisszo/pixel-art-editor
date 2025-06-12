import { DEFAULT_COLORS } from '@/constants/colors'
import { getGrid, isGridEmpty } from '@/features/pixelArts/gridPixelSelectors'
import { saveGridToStorage } from '@/utils/storage'
import { Link, useNavigation } from 'expo-router'
import { FolderDown, Save, Share2 } from 'lucide-react-native'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Alert, Modal, SafeAreaView, Share, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ViewShot, { captureRef } from "react-native-view-shot"
import { useSelector } from 'react-redux'
import { ColorPalette, PixelGrid, ToolBar } from '../components'
import { useStyles } from './useStyles'

export default function EditorScreen() {
    const styles = useStyles();
    const grid = useSelector(getGrid);
    const isEmptyGrid = isGridEmpty(grid);
    const [saveModalVisible, setSaveModalVisible] = useState(false)
    const [saveName, setSaveName] = useState('')
    const currentGrid = useSelector(getGrid);
    const navigation = useNavigation();
    const viewShotRef = useRef<ViewShot>(null);

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
                            <FolderDown size={22} />
                        </TouchableOpacity>
                    </Link>
                    {
                        !isEmptyGrid && <TouchableOpacity
                            onPress={handleShare}
                            style={{ marginLeft: 12 }}
                        >
                            <Share2 color={isEmptyGrid ? 'grey' : undefined} size={22} />
                        </TouchableOpacity>
                    }

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

    const handleShare = useCallback(async () => {
        try {
            const uri = await captureRef(viewShotRef, {
                format: 'png',
                quality: 1,
            });

            await Share.share({
                url: uri,
                title: 'Mon Pixel Art',
                message: 'Regarde mon pixel art !',
            });
        } catch (error) {
            console.error("Erreur lors du partage :", error);
        }
    }, [viewShotRef]);


    return (
        <SafeAreaView style={styles.container}>
            <ToolBar />
            <ViewShot
                ref={viewShotRef}
                options={{ format: "png", quality: 1 }}
            >
                <PixelGrid rows={16} cols={16} />
            </ViewShot>
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
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setSaveModalVisible(false)}
                            >
                                <Text style={styles.cancelText}>Annuler</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleSave}
                            >
                                <Text style={styles.saveText}>Enregistrer</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
};
