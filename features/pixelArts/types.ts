export type Pixel = string | null

export interface PixelArtState {
  grid: Pixel[][]
  selectedColor: string
}


export const pixelArtInitialState: PixelArtState = {
  grid: [],
  selectedColor: '#000000',
}