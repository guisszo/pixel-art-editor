import { getScreenLayout } from '@/utils'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export default function Home() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'))
  const styles = useStyles(dimensions.width, dimensions.height)

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window)
    })

    return () => subscription?.remove()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pixel Art!</Text>

      <View style={styles.grid}>
        <AnimatedCard
          href="/editor/"
          icon="brush"
          label="Éditeur"
          colors={['#8e2de2', '#4a00e0']}
          delay={100}
          width={dimensions.width}
          height={dimensions.height}
        />

        <AnimatedCard
          href="/gallery/"
          icon="image-multiple"
          label="Galerie"
          colors={['#00b09b', '#96c93d']}
          delay={200}
          width={dimensions.width}
          height={dimensions.height}
        />

        {/* <AnimatedCard
          href="/about"
          icon="information"
          label="À propos"
          colors={['#f7971e', '#ffd200']}
          delay={300}
          width={dimensions.width}
          height={dimensions.height}
        />

        <AnimatedCard
          href="/settings"
          icon="cog"
          label="Réglages"
          colors={['#ff416c', '#ff4b2b']}
          delay={400}
          width={dimensions.width}
          height={dimensions.height}
        /> */}
      </View>
    </View>
  )
}

const AnimatedCard = ({ href, icon, label, colors, delay, width, height }: any) => {
  const styles = useStyles(width, height)
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const onPressIn = () => {
    scale.value = withSpring(0.92, { damping: 6 })
  }

  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 6 })
  }

  return (
    <Animated.View entering={FadeInDown.delay(delay)} style={styles.cardWrapper}>
      <Link href={href} asChild>
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
          <Animated.View style={[animatedStyle, styles.cardShadow]}>
            <LinearGradient colors={colors} style={styles.card}>
              <MaterialCommunityIcons name={icon} size={32} color="#fff" />
              <Text style={styles.cardText}>{label}</Text>
            </LinearGradient>
          </Animated.View>
        </Pressable>
      </Link>
    </Animated.View>
  )
}

const useStyles = (width: number, height: number) => {
  const { isMobile, isDesktop, isTablet, isLandscape } = getScreenLayout(width, height)
  
  const CARD_WIDTH = useMemo(() => {
    if (isTablet || isLandscape) {
      return (width - 80) / 2
    }
    if (isDesktop) {
      return (width - 250) / 2
    }
    return (width - 80) / 2
  }, [width, isTablet, isDesktop, isLandscape])

  const alignment = useMemo(() => {
    if (isMobile && !isLandscape) {
      return 'space-between'
    }
    return 'space-around'
  }, [isMobile, isLandscape])

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center',
      marginBottom: 30,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: alignment as any,
    },
    cardWrapper: {
      marginBottom: 20,
      width: CARD_WIDTH,
    },
    card: {
      height: 120,
      borderRadius: 16,
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardShadow: {
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    cardText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      marginTop: 10,
    },
  }), [CARD_WIDTH, alignment, width, height])

  return styles
}