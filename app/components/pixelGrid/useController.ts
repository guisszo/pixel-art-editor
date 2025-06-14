import { getGrid, getSelectedColor, getSelectedTool } from "@/features/pixelArts/gridPixelSelectors";
import { fillAllCells, fillCell, initializeGrid, setColor, setSelectedTool } from "@/features/pixelArts/pixelArtsReducer";
import { AppDispatch } from "@/store";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UseControllerProps {
    rows: number;
    cols: number;
    cellSize: number;
}

export const useController = ({ rows, cols, cellSize }: UseControllerProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const grid = useSelector(getGrid);
    const selectedTool = useSelector(getSelectedTool);
    const selectedColor = useSelector(getSelectedColor);

    const lastDragCoordinates = useRef<{ x: number; y: number } | null>(null);

    const handleCellPress = useCallback((x: number, y: number) => {
        if (
            !grid ||
            y < 0 || y >= grid.length ||
            x < 0 || x >= grid[0]?.length
        ) {
            return;
        }

        const currentColor = grid[y][x];
        const fillCellsParams = {
            x,
            y,
            currentCellColor: currentColor,
            replacementColor: selectedColor
        };

        switch (selectedTool) {
            case 'pen':
                dispatch(fillCell({ x, y }));
                break;
            case 'fill':
                dispatch(fillAllCells(fillCellsParams));
                break;
            case 'picker':
                if (currentColor) {
                    dispatch(setColor(currentColor));
                    dispatch(setSelectedTool('pen'));
                }
                break;
        }

        lastDragCoordinates.current = { x, y };
    }, [selectedTool, selectedColor, grid, dispatch]);

    const handleCellDrag = useCallback((x: number, y: number) => {
        if (
            !grid ||
            y < 0 || y >= grid.length ||
            x < 0 || x >= grid[0]?.length
        ) {
            return;
        }

        if (
            lastDragCoordinates.current &&
            lastDragCoordinates.current.x === x &&
            lastDragCoordinates.current.y === y
        ) {
            return;
        }

        lastDragCoordinates.current = { x, y };

        if (selectedTool === 'pen') {
            dispatch(fillCell({ x, y }));
        }
    }, [selectedTool, grid, dispatch]);

    const getGridCoordinates = useCallback((x: number, y: number, isDrag: boolean = false) => {
        const adjustedY = y - 10 // car on à une marge de 10px niveau style;

        const gridX = Math.floor(x / cellSize);
        const gridY = Math.floor(adjustedY / cellSize);

        if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
            if (isDrag) {
                handleCellDrag(gridX, gridY);
            } else {
                handleCellPress(gridX, gridY);
            }
        }
    }, [cellSize, cols, rows, handleCellPress, handleCellDrag]);

    useEffect(() => {
        if (!grid || grid.length === 0) {
            dispatch(initializeGrid({ rows, cols }));
        }
    }, [rows, cols, dispatch]);

    return {
        grid,
        handleCellPress,
        getGridCoordinates
    };
};