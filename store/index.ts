import { configureStore } from '@reduxjs/toolkit'
import pixelArtReducer from '../features/pixelArts/pixelArtsReducer'

export const store = configureStore({
  reducer: { pixelArt: pixelArtReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
