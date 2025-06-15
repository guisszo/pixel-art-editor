import { DEFAULT_COLORS } from '@/constants/colors';
import { setCellSize, setGridCols, setGridRows, setZoomLevel } from '@/features/pixelArts/pixelArtsReducer';
import Slider from '@react-native-community/slider';
import { Link, useNavigation } from 'expo-router';
import { FolderDown, Grid3X3, Minus, Plus, Save, Settings, Share2, ZoomIn, ZoomOut } from 'lucide-react-native';
import React, { useCallback, useLayoutEffect } from 'react';
import { KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ViewShot from "react-native-view-shot";
import { useDispatch } from 'react-redux';
import { ColorPalette, PixelGrid, ToolBar } from '../components';
import { useController } from './useController';
import { useStyles } from './useStyles';

export default function EditorScreen() {
    const styles = useStyles();
    const dispatch = useDispatch();
    const {
        grid,
        past,
        future,
        gridRows,
        gridCols,
        cellSize,
        zoomLevel,
        isEmptyGrid,
        saveName,
        setSaveName,
        modalState,
        currentSavedName,
        selectedTool,
        hasUnsavedChanges,
        openSaveModal,
        openConfigModal,
        closeModal,
        viewShotRef,
        handleSave,
        handleShare,
        handlePresetSelect,
        handleZoomIn,
        handleZoomOut,
        handleAddNewGrid
    } = useController();


    const navigation = useNavigation();

    const presetSizes = [
        { name: '8x8', rows: 8, cols: 8 },
        { name: '16x16', rows: 16, cols: 16 },
        { name: '32x32', rows: 32, cols: 32 },
        { name: '16x24', rows: 16, cols: 24 },
    ];


    useLayoutEffect(() => {
        const setHeader = async () => {
            const unsaved = await hasUnsavedChanges();
            navigation.setOptions({
                headerTitle: () => (
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ maxWidth: 70, fontWeight: 'bold' }}
                    >
                        {currentSavedName ? `${currentSavedName}${unsaved ? ' *' : ''}` : 'Éditeur'}
                    </Text>
                ),
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
        };
        setHeader();
    }, [navigation, isEmptyGrid, currentSavedName, hasUnsavedChanges, openConfigModal, openSaveModal, isEmptyGrid, handleShare, styles.headerButtons]);

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
                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={closeModal}
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
                            <Text style={styles.modalTitle}>
                                Configuration de la grille
                            </Text>
                        </View>

                        <Text style={styles.sectionTitle}>
                            Tailles prédéfinies
                        </Text>
                        <View style={styles.presetContainer}>
                            {
                                presetSizes.map((preset) => (
                                    <TouchableOpacity
                                        key={preset.name}
                                        style={[
                                            styles.presetButton,
                                            gridRows === preset.rows &&
                                            gridCols === preset.cols &&
                                            styles.presetButtonActive
                                        ]}
                                        onPress={() => handlePresetSelect(preset)}
                                    >
                                        <Text style={[
                                            styles.presetText,
                                            gridRows === preset.rows &&
                                            gridCols === preset.cols &&
                                            styles.presetTextActive
                                        ]}>
                                            {preset.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                        <Text style={styles.sectionTitle}>Configuration personnalisée</Text>

                        <View style={styles.sliderContainer}>
                            <View style={styles.sliderHeader}>
                                <Text style={styles.sliderLabel}>Lignes: {gridRows}</Text>
                                <View style={styles.sliderButtons}>
                                    <TouchableOpacity
                                        onPress={() => dispatch(setGridRows(Math.max(4, gridRows - 1)))}
                                        style={styles.sliderButton}
                                    >
                                        <Minus size={16} color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => dispatch(setGridRows(Math.min(64, gridRows + 1)))}
                                        style={styles.sliderButton}
                                    >
                                        <Plus size={16} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Slider
                                style={styles.slider}
                                minimumValue={4}
                                maximumValue={64}
                                step={1}
                                value={gridRows}
                                onValueChange={(value) => dispatch(setGridRows(Math.round(value)))}
                                minimumTrackTintColor="#61BCD3"
                                maximumTrackTintColor="#E0E0E0"
                                thumbTintColor="#61BCD3"
                            />
                        </View>

                        <View style={styles.sliderContainer}>
                            <View style={styles.sliderHeader}>
                                <Text style={styles.sliderLabel}>Colonnes: {gridCols}</Text>
                                <View style={styles.sliderButtons}>
                                    <TouchableOpacity
                                        onPress={() => dispatch(setGridCols(Math.max(4, gridCols - 1)))}
                                        style={styles.sliderButton}
                                    >
                                        <Minus size={16} color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => dispatch(setGridCols(Math.min(64, gridCols + 1)))}
                                        style={styles.sliderButton}
                                    >
                                        <Plus size={16} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Slider
                                style={styles.slider}
                                minimumValue={4}
                                maximumValue={64}
                                step={1}
                                value={gridCols}
                                onValueChange={(value) => dispatch(setGridCols(Math.round(value)))}
                                minimumTrackTintColor="#61BCD3"
                                maximumTrackTintColor="#E0E0E0"
                                thumbTintColor="#61BCD3"
                            />
                        </View>

                        <View style={styles.sliderContainer}>
                            <View style={styles.sliderHeader}>
                                <Text style={styles.sliderLabel}>Taille des cellules: {cellSize}px</Text>
                                <View style={styles.sliderButtons}>
                                    <TouchableOpacity
                                        onPress={() => dispatch(setCellSize(Math.max(10, cellSize - 2)))}
                                        style={styles.sliderButton}
                                    >
                                        <Minus size={16} color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => dispatch(setCellSize(Math.min(50, cellSize + 2)))}
                                        style={styles.sliderButton}
                                    >
                                        <Plus size={16} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View >
                            <Slider
                                style={styles.slider}
                                minimumValue={10}
                                maximumValue={50}
                                step={1}
                                value={cellSize}
                                onValueChange={(value) => dispatch(setCellSize(Math.round(value)))}
                                minimumTrackTintColor="#61BCD3"
                                maximumTrackTintColor="#E0E0E0"
                                thumbTintColor="#61BCD3"
                            />
                        </View >

                        <View style={styles.sliderContainer}>
                            <View style={styles.sliderHeader}>
                                <Text
                                    style={styles.sliderLabel}
                                >
                                    Zoom: {Math.round(zoomLevel * 100)}%
                                </Text>
                                <View style={styles.sliderButtons}>
                                    <TouchableOpacity
                                        onPress={handleZoomOut}
                                        style={styles.sliderButton}
                                    >
                                        <ZoomOut size={16} color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleZoomIn}
                                        style={styles.sliderButton}
                                    >
                                        <ZoomIn size={16} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Slider
                                style={styles.slider}
                                minimumValue={0.5}
                                maximumValue={3}
                                step={0.25}
                                value={zoomLevel}
                                onValueChange={(value) => dispatch(setZoomLevel(value))}
                                minimumTrackTintColor="#61BCD3"
                                maximumTrackTintColor="#E0E0E0"
                                thumbTintColor="#61BCD3"
                            />
                        </View>

                        <View style={styles.previewInfo}>
                            <Text
                                style={styles.previewText}
                            >
                                Aperçu: {gridRows}×{gridCols} ({gridRows * gridCols} pixels)
                            </Text>
                            <Text
                                style={styles.previewText}
                            >
                                Taille réelle: {Math.round(cellSize * zoomLevel)}px par cellule
                            </Text>
                        </View>
                    </ScrollView >

                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={closeModal}
                        >
                            <Text style={styles.cancelText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </>
            );
        }

        return null;
    }, [
        modalState.type, saveName, gridRows, gridCols, cellSize, zoomLevel,
        closeModal, handleSave, handlePresetSelect, handleZoomIn, handleZoomOut, dispatch
    ]);


    return (
        <SafeAreaView style={styles.container}>
            <ToolBar
                grid={grid}
                selectedTool={selectedTool}
                barActions={{
                    onAddNewGrid: handleAddNewGrid,
                    future,
                    past
                }}
            />

            <View style={styles.zoomControls}>
                <TouchableOpacity
                    onPress={handleZoomOut}
                    style={styles.zoomButton}>
                    <ZoomOut size={20} color="#666" />
                </TouchableOpacity>
                <Text
                    style={styles.zoomText}>
                    {Math.round(zoomLevel * 100)}%
                </Text>
                <TouchableOpacity
                    onPress={handleZoomIn}
                    style={styles.zoomButton}>
                    <ZoomIn size={20} color="#666" />
                </TouchableOpacity>
            </View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View
                    style={styles.horizontalScrollViewWrapper}
                >
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ padding: 20 }}
                        showsHorizontalScrollIndicator={false}>
                        <View style={{ transform: [{ scale: zoomLevel }] }}>
                            <ViewShot
                                ref={viewShotRef}
                                options={{ format: 'png', quality: 1 }}
                            >
                                <PixelGrid
                                    rows={gridRows}
                                    cols={gridCols}
                                    cellSize={cellSize}
                                />
                            </ViewShot>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView >

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
                >
                    <View style={styles.modalOverlay}>
                        <View style={[
                            styles.modalContent,
                            modalState.type === 'config' && { maxHeight: '85%', width: '90%' },
                        ]}>
                            {renderModalContent()}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView >
    );
}