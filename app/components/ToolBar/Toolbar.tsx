import { isGridEmpty } from '@/features/pixelArts/gridPixelSelectors'
import { resetGrid } from '@/features/pixelArts/pixelArtsReducer'
import { Pixel } from '@/features/pixelArts/types'
import { PaintBucket, Pencil, PlusIcon, Redo, RotateCcw, Target, Undo } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'

const tools = [
    { type: 'pen', label: Pencil },
    { type: 'fill', label: PaintBucket },
    { type: 'picker', label: Target },
    { type: 'undo', label: Undo },
    { type: 'redo', label: Redo },
    { type: 'reset', label: RotateCcw },
    { type: 'new', label: PlusIcon }
];

type ToolBarProps = {
    grid: Pixel[][];
    selectedTool: string
    barActions: {
        past: Pixel[][][];
        future: Pixel[][][]
    }
    onToolbarActionPress: (type: string) => void;

}
export const ToolBar: React.FC<ToolBarProps> = ({ grid, selectedTool, barActions, onToolbarActionPress }) => {
    const dispatch = useDispatch();

    const handleReset = useCallback(() => {
        if (!isGridEmpty(grid)) {
            Alert.alert(
                "Réinitialiser le tableau",
                "Es-tu sûr de vouloir réinitialiser la grille ? Toutes les modifications seront perdues.",
                [
                    {
                        text: "Annuler",
                        style: "cancel"
                    },
                    {
                        text: "Réinitialiser",
                        style: "destructive",
                        onPress: () => {
                            dispatch(resetGrid());
                        }
                    }
                ]
            );
        }
    }, [dispatch, grid]);


    return (
        <View style={styles.container}>
            {
                tools.map((tool, index) => {
                    const ToolIcon = tool.label;
                    const isValid = selectedTool === tool.type && index <= 2;
                    const isDisabled = (tool.type === 'undo' && barActions.past.length === 0)
                        || (tool.type === 'redo' && barActions.future.length === 0)
                        || (tool.type === 'reset' && isGridEmpty(grid))
                        || (tool.type === 'new' && isGridEmpty(grid));

                    return (
                        <React.Fragment
                            key={tool.type}
                        >
                            <TouchableOpacity
                                disabled={isDisabled}
                                onPress={() => onToolbarActionPress(tool.type)}
                                style={[
                                    styles.button,
                                    isValid && styles.selected,
                                    isDisabled && styles.disabled
                                ]}
                            >
                                <ToolIcon
                                    color={isValid ? "#fff" : undefined}
                                    size={24}
                                />
                            </TouchableOpacity>

                            {(index === 2 || index === 5) && <View style={styles.separator} />}
                        </React.Fragment>
                    );
                })
            }
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
        marginHorizontal: 5,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    disabled: {
        backgroundColor: '#e0e0e0',
        opacity: 0.5,
    },
    button: {
        marginHorizontal: 8,
        padding: 5,
        borderRadius: 6,
        backgroundColor: '#f0f0f0',
    },
    selected: {
        backgroundColor: '#61BCD3',
    },
    text: {
        fontSize: 18,
    },
    separator: {
        width: 1,
        height: 24,
        backgroundColor: '#aaa',
        marginHorizontal: 8,
    },
})
