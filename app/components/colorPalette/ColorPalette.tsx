import { getSelectedColor } from '@/features/pixelArts/gridPixelSelectors';
import React from 'react';
import {
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { ColorPickerComponent } from '../colorPickerComponent';
import { usePaletteAnimations } from './useAnimations';
import { useStyles } from './useStyles';

interface Props {
  colors: string[];
}

export const ColorPalette: React.FC<Props> = ({ colors }) => {
  const selectedColor = useSelector(getSelectedColor);
  const styles = useStyles(selectedColor);
  const {
    handleColorSelect,
    handleCustomColorSelect,
    toggleColorPicker,
    toggleExpand,
    getLayoutWidth,
    expanded,
    showColorPicker,
    animatedContainerStyle,
    animatedIndicatorStyle,
    animatedContentStyle,
    animatedColorPreviewStyle,
    animatedPaletteTextStyle,
    animatedCustomTextStyle
  } = usePaletteAnimations();

  return (
    <>
      {
        expanded && (
          <TouchableWithoutFeedback onPress={toggleExpand}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
        )
      }

      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <TouchableOpacity
          onPress={toggleExpand}
          activeOpacity={1}
          style={styles.touchable}
        >
          <Text style={styles.title}>
            {expanded ? 'Choisis une couleur' : 'Palette de couleurs'}
          </Text>
          {
            !expanded && (
              <View
                style={[
                  styles.colorBlock,
                  { backgroundColor: selectedColor },
                ]}
              />
            )
          }
        </TouchableOpacity>

        {
          expanded && (
            <View style={styles.expandedContent}>
              <View style={styles.toggleContainer}>
                <Animated.View
                  style={[styles.tabIndicator, animatedIndicatorStyle]}
                />

                <TouchableOpacity
                  onLayout={getLayoutWidth}
                  onPress={toggleColorPicker}
                  style={styles.toggleButton}
                  activeOpacity={0.7}
                >
                  <Animated.Text
                    style={[styles.toggleText, animatedPaletteTextStyle]}
                  >
                    Palette
                  </Animated.Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onLayout={getLayoutWidth}
                  onPress={toggleColorPicker}
                  style={styles.toggleButton}
                  activeOpacity={0.7}
                >
                  <Animated.Text
                    style={[styles.toggleText, animatedCustomTextStyle]}
                  >
                    Personnalisé
                  </Animated.Text>
                </TouchableOpacity>
              </View>

              <Animated.View style={[styles.contentContainer, animatedContentStyle]}>
                {
                  showColorPicker ? (
                    <ColorPickerComponent
                      onColorSelect={handleCustomColorSelect}
                      selectedColor={selectedColor}
                    />
                  ) : (
                    <View style={styles.colorsWrapperView}>
                      <Animated.View
                        style={[
                          styles.colorBlock,
                          styles.colorPreview,
                          { backgroundColor: selectedColor },
                          animatedColorPreviewStyle
                        ]}
                      />
                      <View style={styles.colorsContainer}>
                        {
                          colors.map((color, _) => {
                            const isSelected = color === selectedColor;
                            return (
                              <Pressable
                                key={color}
                                onPress={() => handleColorSelect(color)}
                                style={[
                                  styles.colorBlock,
                                  { backgroundColor: color },
                                  isSelected && styles.selected,
                                ]}
                              />
                            );
                          })
                        }
                      </View>
                    </View>
                  )
                }
              </Animated.View>
            </View>
          )}
      </Animated.View>
    </>
  );
};