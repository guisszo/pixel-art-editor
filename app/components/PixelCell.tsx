import React, { useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface PixelCellProps {
  color: string | null;
  onPress: () => void;
  onLongPress?: () => void;
  onDragEnter?: () => void;
  size?: number;
}

export const PixelCell: React.FC<PixelCellProps> = ({
  color,
  onPress,
  onLongPress,
  onDragEnter,
  size = 20,
}) => {
  const cellRef = useRef<View>(null);

  return (
    <Pressable
      ref={cellRef}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={200}
      onTouchMove={(e) => {
        // Check si le doigt est dans la cellule pendant le move
        const { locationX, locationY } = e.nativeEvent;
        if (
          locationX >= 0 &&
          locationY >= 0 &&
          locationX <= size &&
          locationY <= size
        ) {
          onDragEnter?.();
        }
      }}
      style={[
        styles.cell,
        {
          backgroundColor: color ?? '#eee',
          width: size,
          height: size,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    margin: 1,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
});
