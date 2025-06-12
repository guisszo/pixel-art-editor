import { getGrid, getSelectedColor, getSelectedTool } from "@/features/pixelArts/gridPixelSelectors";
import { fillAllCells, fillCell, initializeGrid, setColor, setSelectedTool } from "@/features/pixelArts/pixelArtsReducer";
import { AppDispatch } from "@/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UseControllerProps {
    rows: number;
    cols: number;
};
export const useController = ({ rows, cols }: UseControllerProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const grid = useSelector(getGrid);
    const selectedTool = useSelector(getSelectedTool);
    const selectedColor = useSelector(getSelectedColor);

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
}, [selectedTool, selectedColor, grid, dispatch]);


    useEffect(() => {
        if (!grid || grid.length === 0) {
            dispatch(initializeGrid({ rows, cols }))
        }
    }, [rows, cols,dispatch]);

    return {
        grid,
        handleCellPress
    };
}