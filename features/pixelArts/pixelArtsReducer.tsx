import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PixelArtState } from './types';

const initialState: PixelArtState = {
    grid: [],
    selectedColor: '#000000',
}

const pixelArtSlice = createSlice({
    name: 'pixelArt',
    initialState,
    reducers: {
        initializeGrid: (state, { payload }: PayloadAction<{ rows: number; cols: number }>) => {
            state.grid = Array.from({ length: payload.rows }, () => Array(payload.cols).fill(null))
        },
        setColor: (state, { payload }: PayloadAction<string>) => {
            state.selectedColor = payload
        },
        fillPixel: (state, { payload }: PayloadAction<{ x: number; y: number }>) => {
            const { x, y } = payload
            if (state.grid[y] && state.grid[y][x] !== undefined) {
                state.grid[y][x] = state.selectedColor
            }
        },
    },
})

export const {
    initializeGrid,
    setColor,
    fillPixel
} = pixelArtSlice.actions;
export default pixelArtSlice.reducer;
