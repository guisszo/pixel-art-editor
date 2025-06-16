import { setColor } from "@/features/pixelArts/pixelArtsReducer";
import { useCallback, useState } from "react";
import { Dimensions, LayoutChangeEvent } from "react-native";
import { Easing, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import { useDispatch } from "react-redux";

const screenHeight = Dimensions.get('window').height;
const COLLAPSED_HEIGHT = 100;
const EXPANDED_HEIGHT = screenHeight * 0.6;

export const usePaletteAnimations = () => {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

    const height = useSharedValue(COLLAPSED_HEIGHT);
    const tabWidth = useSharedValue(0);
    const tabIndicator = useSharedValue(0);
    const contentOpacity = useSharedValue(1);
    const contentTranslateX = useSharedValue(0);
    const colorPreviewScale = useSharedValue(1);

    const getLayoutWidth = useCallback((e: LayoutChangeEvent) => {
        const width = e.nativeEvent.layout.width;
        tabWidth.value = width;
    }, [tabWidth]);

    const toggleExpand = useCallback(() => {
        const newExpanded = !expanded;
        setExpanded(newExpanded);

        // if (!newExpanded) {
        //     // setShowColorPicker(false);
        //     // tabIndicator.value = withTiming(0, { duration: 200 });
        // }

        height.value = withTiming(
            newExpanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT,
            {
                duration: 400,
                easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
            }
        );
    }, [expanded, height, tabIndicator]);

    const handleColorSelect = useCallback((color: string) => {
        dispatch(setColor(color));

        // Animation de la preview de couleur
        colorPreviewScale.value = withSequence(
            withTiming(1.2, { duration: 150 }),
            withTiming(1, { duration: 150 })
        );

        setShowColorPicker(false);
        toggleExpand();
    }, [dispatch, toggleExpand, colorPreviewScale]);

    const handleCustomColorSelect = useCallback((color: string) => {
        dispatch(setColor(color));

        // Animation de la preview de couleur
        colorPreviewScale.value = withSequence(
            withTiming(1.2, { duration: 150 }),
            withTiming(1, { duration: 150 })
        );
    }, [dispatch, colorPreviewScale]);

    const animateContentTransition = useCallback(() => {
        'worklet';

        contentOpacity.value = withTiming(0, { duration: 150 });
        contentTranslateX.value = withTiming(
            showColorPicker ? 30 : -30,
            { duration: 150 },
            () => {
                // Callback exécuté après l'animation sortante
                runOnJS(setShowColorPicker)(!showColorPicker);

                contentTranslateX.value = showColorPicker ? -30 : 30;
                contentOpacity.value = withTiming(1, { duration: 200 });
                contentTranslateX.value = withTiming(0, {
                    duration: 200,
                    easing: Easing.out(Easing.cubic)
                });
            }
        );
    }, [showColorPicker, contentOpacity, contentTranslateX]);

    const toggleColorPicker = useCallback(() => {
        tabIndicator.value = withTiming(
            showColorPicker ? 0 : 1,
            {
                duration: 300,
                easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
            }
        );

        animateContentTransition();
    }, [showColorPicker, tabIndicator, animateContentTransition]);

    const animatedContainerStyle = useAnimatedStyle(() => ({
        height: height.value,
    }));

    const animatedIndicatorStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: interpolate(
                    tabIndicator.value,
                    [0, 1],
                    [0, tabWidth.value]
                )
            }
        ],
        opacity: interpolate(tabIndicator.value, [0, 1], [1, 1]),
    }));

    const animatedContentStyle = useAnimatedStyle(() => ({
        opacity: contentOpacity.value,
        transform: [
            { translateX: contentTranslateX.value }
        ],
    }));

    const animatedColorPreviewStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: colorPreviewScale.value }
        ],
    }));

    const animatedPaletteTextStyle = useAnimatedStyle(() => ({
        color: tabIndicator.value < 0.5 ? '#fff' : '#666666',
        fontWeight: tabIndicator.value < 0.5 ? '600' : '500',
    }));

    const animatedCustomTextStyle = useAnimatedStyle(() => ({
        color: tabIndicator.value > 0.5 ? '#fff' : '#666666',
        fontWeight: tabIndicator.value > 0.5 ? '600' : '500',
    }));


    return {
        handleColorSelect,
        handleCustomColorSelect,
        toggleColorPicker,
        toggleExpand,
        getLayoutWidth,
        showColorPicker,
        expanded,
        animatedContainerStyle,
        animatedIndicatorStyle,
        animatedContentStyle,
        animatedColorPreviewStyle,
        animatedPaletteTextStyle,
        animatedCustomTextStyle
    };
}