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
import { useStyles } from './useStyles';

const screenHeight = Dimensions.get('window').height;
const COLLAPSED_HEIGHT = 100;
const EXPANDED_HEIGHT = screenHeight * 0.3;

interface Props {
  colors: string[];
}

export const ColorPalette: React.FC<Props> = ({ colors }) => {
  const dispatch = useDispatch();
  const selectedColor = useSelector(getSelectedColor);
  const styles = useStyles();
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(COLLAPSED_HEIGHT)).current;

  const toggleExpand = useCallback(() => {
    setExpanded(prev => !prev);
    Animated.timing(animation, {
      toValue: expanded ? COLLAPSED_HEIGHT : EXPANDED_HEIGHT,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded, animation]);

  const handleColorSelect = useCallback((color: string) => {
    dispatch(setColor(color));
    toggleExpand();
  }, [dispatch, toggleExpand]);

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
        </TouchableOpacity>
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
      </Animated.View>
    </>
  );
};

