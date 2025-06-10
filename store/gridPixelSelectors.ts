import { Pixel } from "@/features/pixelArts/types";
import { RootState } from ".";

export const getSelectedColor = (state: RootState): string => state.pixelArt.selectedColor;
export const getGrid = (state: RootState):Pixel[][] => state.pixelArt.grid;