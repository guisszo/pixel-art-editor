import {
    getCellSize,
    getGrid, getGridCols, getGridRows,
    getZoomLevel, isGridEmpty
} from '@/features/pixelArts/gridPixelSelectors';
import {
    setGridCols, setGridRows,
    setZoomLevel
} from '@/features/pixelArts/pixelArtsReducer';
import { saveGridToStorage } from '@/utils/storage';
import { useCallback, useRef, useState } from 'react';
import { Alert, Share } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { useDispatch, useSelector } from 'react-redux';

export const useEditorController = () => {
    const dispatch = useDispatch();
    const grid = useSelector(getGrid);
    const gridRows = useSelector(getGridRows);
    const gridCols = useSelector(getGridCols);
    const cellSize = useSelector(getCellSize);
    const zoomLevel = useSelector(getZoomLevel);
    const isEmptyGrid = isGridEmpty(grid);

    const [saveName, setSaveName] = useState<string>('');
    const [modalState, setModalState] = useState<{ visible: boolean, type: 'save' | 'config' | null }>({
        visible: false,
        type: null,
    });

    const viewShotRef = useRef(null);

    const openSaveModal = () => setModalState({ visible: true, type: 'save' });
    const openConfigModal = () => setModalState({ visible: true, type: 'config' });
    const closeModal = useCallback(() => {
        setModalState({ visible: false, type: null });
        setSaveName('');
    }, []);

    const handleSave = useCallback(async () => {
        if (!saveName.trim()) {
            return Alert.alert("Nom requis", "Donne un nom à ta création !");
        }
        await saveGridToStorage(saveName.trim(), grid);
        closeModal();
        Alert.alert('Création sauvegardée.');
    }, [saveName, grid, closeModal]);

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

    const setRows = (val: number) => dispatch(setGridRows(Math.max(4, Math.min(64, val))));
    const setCols = (val: number) => dispatch(setGridCols(Math.max(4, Math.min(64, val))));
    const setZoom = (val: number) => dispatch(setZoomLevel(Math.max(0.5, Math.min(3, val))));

    const handleZoomIn = () => setZoom(zoomLevel + 0.25);
    const handleZoomOut = () => setZoom(zoomLevel - 0.25);

    const handlePresetSelect = useCallback((preset: { rows: number; cols: number }) => {
        setRows(preset.rows);
        setCols(preset.cols);
    }, []);

    return {
        gridRows,
        gridCols,
        cellSize,
        zoomLevel,
        isEmptyGrid,
        saveName,
        setSaveName,
        modalState,
        openSaveModal,
        openConfigModal,
        closeModal,
        viewShotRef,
        handleSave,
        handleShare,
        handlePresetSelect,
        handleZoomIn,
        handleZoomOut
    };
}
