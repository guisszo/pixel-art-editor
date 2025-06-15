import {
    getCellSize,
    getCurrentSavedName,
    getFuture,
    getGrid, getGridCols, getGridRows,
    getPast,
    getSelectedTool,
    getZoomLevel, isGridEmpty
} from '@/features/pixelArts/gridPixelSelectors';
import {
    createNewGrid,
    setCurrentSavedName,
    setGridCols, setGridRows,
    setZoomLevel
} from '@/features/pixelArts/pixelArtsReducer';
import { findGridByContent, loadGridFromStorage, saveGridToStorage } from '@/utils/storage';
import { useCallback, useRef, useState } from 'react';
import { Alert, Share } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { useDispatch, useSelector } from 'react-redux';

export const useController = () => {
    const dispatch = useDispatch();
    const grid = useSelector(getGrid);
    const gridRows = useSelector(getGridRows);
    const gridCols = useSelector(getGridCols);
    const cellSize = useSelector(getCellSize);
    const zoomLevel = useSelector(getZoomLevel);
    const isEmptyGrid = isGridEmpty(grid);
    const selectedTool = useSelector(getSelectedTool);
    const future = useSelector(getFuture);
    const past = useSelector(getPast);

    const [saveName, setSaveName] = useState<string>('');
    const currentSavedName = useSelector(getCurrentSavedName);

    const [modalState, setModalState] = useState<
        { visible: boolean, type: 'save' | 'config' | null }
    >({
        visible: false,
        type: null,
    });
    const openConfigModal = () => setModalState({ visible: true, type: 'config' });
    const setRows = (val: number) => dispatch(setGridRows(Math.max(4, Math.min(64, val))));
    const setCols = (val: number) => dispatch(setGridCols(Math.max(4, Math.min(64, val))));
    const setZoom = (val: number) => dispatch(setZoomLevel(Math.max(0.5, Math.min(3, val))));

    const handleZoomIn = () => setZoom(zoomLevel + 0.25);
    const handleZoomOut = () => setZoom(zoomLevel - 0.25);

    const viewShotRef = useRef(null);

    const hasUnsavedChanges = useCallback(async () => {
        if (!currentSavedName) return true;

        const savedGrid = await loadGridFromStorage(currentSavedName);
        if (!savedGrid) return true;

        return JSON.stringify(grid) !== JSON.stringify(savedGrid);
    }, [grid, currentSavedName]);

    const openSaveModal = useCallback(async () => {
        if (currentSavedName && !(await hasUnsavedChanges())) {
            Alert.alert(
                "Aucun changement",
                `Cette création est déjà sauvegardée sous le nom "${currentSavedName}".`,
                [{ text: "OK" }]
            );
            return;
        }

        const existingName = await findGridByContent(grid);

        if (existingName && existingName !== currentSavedName) {
            Alert.alert(
                "Déjà sauvegardé",
                `Cette création existe déjà sous le nom "${existingName}".`,
                [
                    { text: "OK" },
                    {
                        text: "Sauvegarder une copie",
                        onPress: () => {
                            setSaveName(`${existingName}-Copie`);
                            setModalState({ visible: true, type: 'save' });
                        }
                    }
                ]
            );
        } else {
            if (currentSavedName) {
                setSaveName(currentSavedName);
            }
            setModalState({ visible: true, type: 'save' });
        }
    }, [grid, currentSavedName, hasUnsavedChanges]);


    const closeModal = useCallback(() => {
        setModalState({ visible: false, type: null });
        setSaveName('');
    }, []);

    const handleSave = useCallback(async () => {
        if (!saveName.trim()) {
            return Alert.alert("Nom requis", "Donne un nom à ta création !");
        }

        await saveGridToStorage(saveName.trim(), grid);

        dispatch(setCurrentSavedName(saveName.trim()));

        closeModal();
        Alert.alert('Création sauvegardée.');
    }, [saveName, grid, closeModal, dispatch]);

    const handleShare = useCallback(async () => {
        try {
            const uri = await captureRef(viewShotRef, { format: 'png', quality: 1 });
            await Share.share({
                url: uri,
                title: 'Mon Pixel Art',
                message: 'Regarde mon pixel art !',
            });
        } catch (err) {
            console.error("Erreur lors du partage :", err);
        }
    }, []);


    const handlePresetSelect = useCallback((preset: { rows: number; cols: number }) => {
        setRows(preset.rows);
        setCols(preset.cols);
    }, []);

    const handleAddNewGrid = useCallback(async () => {
        const hasChanges = await hasUnsavedChanges();

        if (isEmptyGrid && !hasChanges) {
            dispatch(createNewGrid({}));
            return;
        }

        Alert.alert(
            "Nouvelle grille",
            "Êtes-vous sûr de vouloir créer une nouvelle grille ? Toutes les modifications seront perdues.",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Créer",
                    style: "destructive",
                    onPress: () => dispatch(createNewGrid({}))
                }
            ]
        );
    }, [dispatch, isEmptyGrid, hasUnsavedChanges]);

    return {
        grid,
        gridRows,
        gridCols,
        cellSize,
        zoomLevel,
        isEmptyGrid,
        saveName,
        past,
        future,
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
    };
}
