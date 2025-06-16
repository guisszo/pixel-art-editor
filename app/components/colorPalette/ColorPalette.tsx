import { getSelectedColor } from '@/features/pixelArts/gridPixelSelectors';
import { setColor } from '@/features/pixelArts/pixelArtsReducer';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ColorPickerComponent } from '../colorPickerComponent';
import { useStyles } from './useStyles';

const screenHeight = Dimensions.get('window').height;
const COLLAPSED_HEIGHT = 100;
const EXPANDED_HEIGHT = screenHeight * 0.6;

interface Props {
  colors: string[];
}

export const ColorPalette: React.FC<Props> = ({ colors }) => {
  const dispatch = useDispatch();
  const selectedColor = useSelector(getSelectedColor);
  const styles = useStyles(selectedColor);
  const [expanded, setExpanded] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const animation = useRef(new Animated.Value(COLLAPSED_HEIGHT)).current;

  const toggleExpand = useCallback(() => {
    setExpanded(prev => !prev);
    // setShowColorPicker(false);
    Animated.timing(animation, {
      toValue: expanded ? COLLAPSED_HEIGHT : EXPANDED_HEIGHT,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded, animation]);

  const handleColorSelect = useCallback((color: string) => {
    dispatch(setColor(color));
    setShowColorPicker(false);
    toggleExpand();
  }, [dispatch, toggleExpand]);

  const handleCustomColorSelect = useCallback((color: string) => {
    dispatch(setColor(color));
  }, [dispatch]);

  const toggleColorPicker = useCallback(() => {
    setShowColorPicker(prev => !prev);
  }, []);

  return (
    <>
      {
        expanded && (
          <TouchableWithoutFeedback onPress={toggleExpand}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
        )
      }
      <Animated.View style={[styles.container, { height: animation }]}>
        <TouchableOpacity
          onPress={toggleExpand}
          activeOpacity={1}
          style={styles.touchable}
        >
          <Text style={styles.title}>
            {expanded ? 'Choisis une couleur' : 'Palette de couleurs'}
          </Text>
          {
            !expanded && <View
              key={selectedColor}
              style={[styles.colorBlock, { backgroundColor: selectedColor }]}
            />
          }
        </TouchableOpacity>

        {
          expanded && (
            <View style={styles.expandedContent}>
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  onPress={toggleColorPicker}
                  style={[
                    styles.toggleButton,
                    !showColorPicker && styles.toggleButtonActive
                  ]}
                >
                  <Text style={[
                    styles.toggleText,
                    !showColorPicker && styles.toggleTextActive
                  ]}>
                    Palette
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={toggleColorPicker}
                  style={[
                    styles.toggleButton,
                    showColorPicker && styles.toggleButtonActive
                  ]}
                >
                  <Text style={[
                    styles.toggleText,
                    showColorPicker && styles.toggleTextActive
                  ]}>
                    Personnalisé
                  </Text>
                </TouchableOpacity>
              </View>

              {
                showColorPicker ? (
                  <ColorPickerComponent
                    onColorSelect={handleCustomColorSelect}
                    selectedColor={selectedColor}
                  />
                ) : (
                  <View style={styles.colorsWrapperView}>
                    <View
                      key={selectedColor}
                      style={[styles.colorBlock, styles.colorPreview]}
                    />
                    <View style={styles.colorsContainer}>
                      {
                        colors.map((color) => {
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
            </View>
          )
        }
      </Animated.View>
    </>
  );
};