import { isGridEmpty } from '@/features/pixelArts/gridPixelSelectors'
import { Pixel } from '@/features/pixelArts/types'
import { PaintBucket, Pencil, PlusIcon, Redo, RotateCcw, Target, Undo } from 'lucide-react-native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AnimatedToolButton } from './AnimatedToolButton'

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

    return (
        <View style={styles.container}>
            {
                tools.map((tool, index) => {
                    const isDisabled = (tool.type === 'undo' && barActions.past.length === 0)
                        || (tool.type === 'redo' && barActions.future.length === 0)
                        || (tool.type === 'reset' && isGridEmpty(grid))
                        || (tool.type === 'new' && isGridEmpty(grid));

                    return (
                        <React.Fragment key={tool.type}>
                            <AnimatedToolButton
                                tool={tool}
                                index={index}
                                selectedTool={selectedTool}
                                isDisabled={isDisabled}
                                onPress={() => onToolbarActionPress(tool.type)}
                            />
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
        opacity: 0.5,
    },
    button: {
        marginHorizontal: 8,
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    selected: {
        backgroundColor: '#61BCD3',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    separator: {
        width: 1,
        height: 24,
        backgroundColor: '#aaa',
        marginHorizontal: 8,
    },
})