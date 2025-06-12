import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell, FillAllCellsProps, Pixel, PixelArtState, Tool } from './types';

const initialState: PixelArtState = {
    grid: [],
    selectedColor: '#000000',
    selectedTool: 'pen',
    past: [],
    future: [],

}

const isPositionInvalid = (x: number, y: number, grid: Pixel[][], expectedColor: Pixel) => {
    return (
        x < 0 ||
        y < 0 ||
        y >= grid.length ||
        x >= grid[y].length ||
        grid[y][x] !== expectedColor
    );
};

const addNeighborsToQueue = (x: number, y: number, positionsToFill: number[][]) => {
    positionsToFill.push(
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
    );
};

const onFillAllCells = (state: PixelArtState, action: PayloadAction<FillAllCellsProps>) => {
    state.past.push(JSON.parse(JSON.stringify(state.grid)));
    state.future = [];
    const { x, y, currentCellColor, replacementColor } = action.payload;
    let pixelGrid = state.grid;
    const currentpixelGridCellColor = pixelGrid[y] ? pixelGrid[y][x] : null;

    if (
        !pixelGrid[y]
        || currentpixelGridCellColor !== currentCellColor
        || currentCellColor === replacementColor
    ) return;

    // repasser pour resimplifier si possible
    const positionsToFill = [[x, y]];

    while (positionsToFill.length > 0) {
        const [currentPositionX, currentPositionY] = positionsToFill.pop()!;

        if (isPositionInvalid(currentPositionX, currentPositionY, pixelGrid, currentCellColor)) {
            continue;
        }

        pixelGrid[currentPositionY][currentPositionX] = replacementColor;

        addNeighborsToQueue(currentPositionX, currentPositionY, positionsToFill);
    }
};

const pixelArtSlice = createSlice({
    name: 'pixelArt',
    initialState,
    reducers: {
        initializeGrid: (state, { payload }: PayloadAction<{ rows: number; cols: number }>) => {
            state.grid = Array.from(
                { length: payload.rows },
                () => Array(payload.cols).fill(null)
            );
        },
        setColor: (state, { payload }: PayloadAction<string>) => {
            state.selectedColor = payload;
        },
        fillCell: (state, { payload }: PayloadAction<Cell>) => {
            state.past.push(JSON.parse(JSON.stringify(state.grid)));
            state.future = [];
            const { x, y } = payload;
            const row = state.grid[y];
            let cell = state.grid[y][x];

            if (row && cell !== undefined) {
                state.grid[y][x] = state.selectedColor;
            }
        },
        setGrid: (state, action: PayloadAction<Pixel[][]>) => {
            state.past.push(JSON.parse(JSON.stringify(state.grid)));
            state.future = [];
            state.grid = action.payload;
        },
        setSelectedTool: (state, action: PayloadAction<Tool>) => {
            state.selectedTool = action.payload;
        },
        fillAllCells: onFillAllCells,
        undoAction: (state) => {
            if (state.past.length === 0) return;

            const previous = state.past.pop()!;
            state.future.push(JSON.parse(JSON.stringify(state.grid)));
            state.grid = previous;
        },

        redoAction: (state) => {
            if (state.future.length === 0) return;

            const next = state.future.pop()!;
            state.past.push(JSON.parse(JSON.stringify(state.grid)));
            state.grid = next;
        },

    },
})

export const {
    initializeGrid,
    setColor,
    fillCell,
    setGrid,
    setSelectedTool,
    fillAllCells,
    undoAction,
    redoAction,
} = pixelArtSlice.actions;

export default pixelArtSlice.reducer;
