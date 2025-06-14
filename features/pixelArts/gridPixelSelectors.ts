import { RootState } from "../../store";
import { Pixel } from "./types";

export const getSelectedColor = (state: RootState): string => state.pixelArt.selectedColor;
export const getGrid = (state: RootState):Pixel[][] => state.pixelArt.grid;
export const getSelectedTool = (state: RootState): string => state.pixelArt.selectedTool;
export const getPast = (state: RootState): Pixel[][][] => state.pixelArt.past;
export const getFuture = (state: RootState): Pixel[][][] => state.pixelArt.future;
export const getGridRows = (state: RootState) => state.pixelArt.gridRows;
export const getGridCols = (state: RootState) => state.pixelArt.gridCols;
export const getCellSize = (state: RootState) => state.pixelArt.cellSize;
export const getZoomLevel = (state: RootState) => state.pixelArt.zoomLevel;
export const isGridEmpty = (grid:Pixel[][]) => {

    if (!grid || grid.length === 0) return true;
    
    return grid.every(row => 
        row.every(pixel => pixel === null)
    );
};