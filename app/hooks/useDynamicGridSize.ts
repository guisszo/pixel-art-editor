import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

interface UseDynamicGridSizeProps {
    minCellSize?: number;
    maxCellSize?: number;
    padding?: number;
    aspectRatio?: number;
}

export const useDynamicGridSize = ({
    minCellSize = 15,
    maxCellSize = 30,
    padding = 40,
    aspectRatio = 1.25 
}: UseDynamicGridSizeProps = {}) => {
    const [dimensions, setDimensions] = useState(() => {
        const { width, height } = Dimensions.get('window');
        return calculateGridDimensions(width, height, minCellSize, maxCellSize, padding, aspectRatio);
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            const newDimensions = calculateGridDimensions(
                window.width, 
                window.height, 
                minCellSize, 
                maxCellSize, 
                padding, 
                aspectRatio
            );
            setDimensions(newDimensions);
        });

        return () => subscription?.remove();
    }, [minCellSize, maxCellSize, padding, aspectRatio]);

    return dimensions;
};

const  calculateGridDimensions = (
    screenWidth: number,
    screenHeight: number,
    minCellSize: number,
    maxCellSize: number,
    padding: number,
    aspectRatio: number
) => {
    const availableWidth = screenWidth - padding;
    const availableHeight = screenHeight - padding;

    const maxColsByWidth = Math.floor(availableWidth / minCellSize);
    const maxRowsByWidth = Math.floor(maxColsByWidth / aspectRatio);

    const maxRowsByHeight = Math.floor(availableHeight / minCellSize);
    const maxColsByHeight = Math.floor(maxRowsByHeight * aspectRatio);

    const cols = Math.min(maxColsByWidth, maxColsByHeight);
    const rows = Math.min(maxRowsByWidth, maxRowsByHeight);

    const cellSizeByWidth = Math.min(availableWidth / cols, maxCellSize);
    const cellSizeByHeight = Math.min(availableHeight / rows, maxCellSize);
    const cellSize = Math.floor(Math.min(cellSizeByWidth, cellSizeByHeight));

    return {
        rows: Math.max(rows, 8), // Minimum 8 lignes
        cols: Math.max(cols, 10), // Minimum 10 colonnes
        cellSize: Math.max(cellSize, minCellSize)
    };
}