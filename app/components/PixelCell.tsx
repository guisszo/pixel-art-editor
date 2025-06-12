import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface PixelCellProps {
  color: string | null
  onPress: () => void
  onLongPress?: () => void
  size?: number
}

export const PixelCell: React.FC<PixelCellProps> = ({
  color,
  onPress,
  onLongPress,
  size = 20,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={200}
      activeOpacity={0.7}
      style={[
        styles.cell,
        {
          backgroundColor: color ?? '#eee',
          width: size,
          height: size,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  cell: {
    margin: 1,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
})
