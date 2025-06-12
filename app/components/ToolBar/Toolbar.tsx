import { getFuture, getPast, getSelectedTool } from '@/features/pixelArts/gridPixelSelectors'
import { redoAction, setSelectedTool, undoAction } from '@/features/pixelArts/pixelArtsReducer'
import { Tool } from '@/features/pixelArts/types'
import { PaintBucket, Pencil, Redo, Target, Undo } from 'lucide-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const tools = [
    { type: 'pen', label: Pencil },
    { type: 'fill', label: PaintBucket },
    { type: 'picker', label: Target },
    { type: 'undo', label: Undo },
    { type: 'redo', label: Redo },
];

export const ToolBar: React.FC = () => {
    const dispatch = useDispatch();
    const selected = useSelector(getSelectedTool);
    const past = useSelector(getPast);
    const future = useSelector(getFuture);

    return (
        <View style={styles.container}>
            {
                tools.map((tool, index) => {
                    const ToolIcon = tool.label;
                    const isValid = selected === tool.type && index <= 2;
                    const isDisabled = (tool.type === 'undo' && past.length === 0) ||
                        (tool.type === 'redo' && future.length === 0);
                    return (
                        <React.Fragment
                            key={tool.type}
                        >
                            <TouchableOpacity
                                disabled={isDisabled}
                                onPress={() => {
                                    switch (tool.type) {
                                        case 'undo':
                                            dispatch(undoAction())
                                            break;
                                        case 'redo':
                                            dispatch(redoAction());
                                        default:
                                            if (['pen', 'fill', 'picker'].includes(tool.type)) {
                                                dispatch(setSelectedTool(tool.type as Tool));
                                            }
                                            break;
                                    }
                                }}
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

                            {index === 2 && <View style={styles.separator} />}
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
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
        marginHorizontal: 20,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    disabled: {
        backgroundColor: '#e0e0e0',
        opacity: 0.5,
    },
    button: {
        marginHorizontal: 10,
        padding: 10,
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
