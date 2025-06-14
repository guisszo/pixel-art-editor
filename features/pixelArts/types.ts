export type Pixel = string | null

export interface PixelArtState {
  grid: Pixel[][];
  selectedColor: string;
  selectedTool: Tool;
  future: Array<Pixel[][]>;
  past: Array<Pixel[][]>;
  gridRows: number;
  gridCols: number;
  cellSize: number;
  zoomLevel: number;
}

export type Cell = { x: number; y: number };

export type Tool = 'pen' | 'fill' | 'picker' | 'undo' | 'redo';

export type FillAllCellsProps = {
  x: number,
  y: number,
  currentCellColor: Pixel,
  replacementColor: string
}

export type GridConfigProps = {
  rows: number;
  cols: number;
  cellSize: number;
}