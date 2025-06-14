import { DEFAULT_COLORS } from '@/constants/colors'
import { getGrid, isGridEmpty } from '@/features/pixelArts/gridPixelSelectors'
import { saveGridToStorage } from '@/utils/storage'
import { Link, useNavigation } from 'expo-router'
import { FolderDown, Grid3X3, Save, Settings, Share2 } from 'lucide-react-native'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Alert, KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, Share, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ViewShot, { captureRef } from "react-native-view-shot"
import { useSelector } from 'react-redux'
import { ColorPalette, PixelGrid, ToolBar } from '../components'
import { useStyles } from './useStyles'

export default function EditorScreen() {
    const styles = useStyles();
    const grid = useSelector(getGrid);
    const isEmptyGrid = isGridEmpty(grid);

    const [modalState, setModalState] = useState<{
        visible: boolean;
        type: 'save' | 'config' | null;
    }>({
        visible: false,
        type: null,
    });

    const [saveName, setSaveName] = useState('');
    const [gridRows, setGridRows] = useState(16);
    const [gridCols, setGridCols] = useState(16);
    const [cellSize, setCellSize] = useState(20);

    const currentGrid = useSelector(getGrid);
    const navigation = useNavigation();
    const viewShotRef = useRef<ViewShot>(null);

    const presetSizes = [
        { name: '8x8', rows: 8, cols: 8 },
        { name: '16x16', rows: 16, cols: 16 },
        { name: '32x32', rows: 32, cols: 32 },
        { name: '16x24', rows: 16, cols: 24 },
    ];

    const openSaveModal = () => setModalState({ visible: true, type: 'save' });
    const openConfigModal = () => setModalState({ visible: true, type: 'config' });
    const closeModal = useCallback(() => {
        setModalState({ visible: false, type: null });
        setSaveName('');
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Éditeur',
            headerRight: () => (
                <View style={styles.headerButtons}>
                    <TouchableOpacity
                        onPress={openConfigModal}
                        style={{ marginRight: 12 }}
                    >
                        <Settings size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={isEmptyGrid}
                        onPress={openSaveModal}
                        style={{ marginRight: 12 }}
                    >
                        <Save
                            color={isEmptyGrid ? 'grey' : undefined}
                            size={22}
                        />
                    </TouchableOpacity>
                    <Link href="/gallery" asChild>
                        <TouchableOpacity>
                            <FolderDown size={22} />
                        </TouchableOpacity>
                    </Link>
                    {
                        !isEmptyGrid && (
                            <TouchableOpacity onPress={handleShare} style={{ marginLeft: 12 }}>
                                <Share2 size={22} />
                            </TouchableOpacity>
                        )
                    }
                </View>
            )
        });
    }, [navigation, isEmptyGrid]);

    const handleSave = useCallback(async () => {
        if (!saveName.trim()) {
            return Alert.alert("Nom requis", "Donne un nom à ta création !");
        }
        await saveGridToStorage(saveName.trim(), currentGrid);
        closeModal();
        alert('Création sauvegardée.');
    }, [saveName, currentGrid, closeModal]);

    const handleConfigSave = useCallback(() => {
        const rows = Math.max(4, Math.min(64, gridRows));
        const cols = Math.max(4, Math.min(64, gridCols));
        const size = Math.max(10, Math.min(50, cellSize));

        setGridRows(rows);
        setGridCols(cols);
        setCellSize(size);
        closeModal();

        Alert.alert("Configuration mise à jour", "Les nouveaux paramètres seront appliqués à la prochaine grille.");
    }, [gridRows, gridCols, cellSize]);

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

    const renderModalContent = useCallback(() => {
        if (modalState.type === 'save') {
            return (
                <>
                    <Text style={styles.modalTitle}>Nom de la création</Text>
                    <TextInput
                        placeholder="Ex: Mon pixel art"
                        value={saveName}
                        onChangeText={setSaveName}
                        style={styles.input}
                        autoFocus
                    />
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={closeModal}>
                            <Text style={styles.cancelText}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleSave}>
                            <Text style={styles.saveText}>Enregistrer</Text>
                        </TouchableOpacity>
                    </View>
                </>
            );
        }

        if (modalState.type === 'config') {
            return (
                <>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.configHeader}>
                            <Grid3X3 size={24} color="#333" />
                            <Text style={styles.modalTitle}>Configuration de la grille</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Tailles prédéfinies</Text>
                        <View style={styles.presetContainer}>
                            {
                                presetSizes.map((preset) => (
                                    <TouchableOpacity
                                        key={preset.name}
                                        style={[
                                            styles.presetButton,
                                            gridRows === preset.rows && gridCols === preset.cols && styles.presetButtonActive,
                                        ]}
                                        onPress={() => {
                                            setGridRows(preset.rows);
                                            setGridCols(preset.cols);
                                        }}
                                    >
                                        <Text style={[
                                            styles.presetText,
                                            gridRows === preset.rows
                                            && gridCols === preset.cols
                                            && styles.presetTextActive,
                                        ]}>
                                            {preset.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                        <Text style={styles.sectionTitle}>Configuration personnalisée</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Lignes (4-64)</Text>
                            <TextInput
                                value={gridRows.toString()}
                                onChangeText={(text) => setGridRows(parseInt(text) || 16)}
                                keyboardType="numeric"
                                style={styles.configInput}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Colonnes (4-64)</Text>
                            <TextInput
                                value={gridCols.toString()}
                                onChangeText={(text) => setGridCols(parseInt(text) || 16)}
                                keyboardType="numeric"
                                style={styles.configInput}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Taille des cellules (10-50)</Text>
                            <TextInput
                                value={cellSize.toString()}
                                onChangeText={(text) => setCellSize(parseInt(text) || 20)}
                                keyboardType="numeric"
                                style={styles.configInput}
                            />
                        </View>

                        <View style={styles.previewInfo}>
                            <Text style={styles.previewText}>Aperçu: {gridRows}×{gridCols} ({gridRows * gridCols} pixels)</Text>
                            <Text style={styles.previewText}>Taille des cellules: {cellSize}px</Text>
                        </View>
                    </ScrollView>

                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={closeModal}>
                            <Text style={styles.cancelText}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleConfigSave}>
                            <Text style={styles.saveText}>Appliquer</Text>
                        </TouchableOpacity>
                    </View>
                </>
            );
        }

        return null;
    }, [
        modalState.type, saveName, gridRows, gridCols, cellSize,
        closeModal, handleSave, handleConfigSave
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <ToolBar />
            <ViewShot
                ref={viewShotRef}
                options={{ format: "png", quality: 1 }}
            >
                <PixelGrid
                    rows={gridRows}
                    cols={gridCols}
                    cellSize={cellSize}
                />
            </ViewShot>
            <ColorPalette colors={DEFAULT_COLORS} />

            <Modal
                visible={modalState.visible}
                transparent
                animationType="slide"
                onRequestClose={closeModal}
                statusBarTranslucent
            >
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'android' ? 100 : 0}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[
                            styles.modalContent,
                            modalState.type === 'config' && { maxHeight: '80%' },
                        ]}>
                            {renderModalContent()}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
}