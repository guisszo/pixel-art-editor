import { setGrid } from '@/features/pixelArts/pixelArtsReducer'
import { deleteGridFromStorage, listSavedGrids, loadGridFromStorage } from '@/utils/storage'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, useRouter } from 'expo-router'
import { Trash2 } from 'lucide-react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

const gradientColors: [string, string][] = [
  ['#ff9a9e', '#fad0c4'],
  ['#a1c4fd', '#c2e9fb'],
  ['#fbc2eb', '#a6c1ee'],
  ['#ffecd2', '#fcb69f'],
  ['#d4fc79', '#96e6a1'],
  ['#fddb92', '#d1fdff'],
]

const GalleryScreen = () => {
  const [savedNames, setSavedNames] = useState<string[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<string | null>(null)
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Galerie',
    });
  }, [navigation]);

  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const fetchSaved = async () => {
      const names = await listSavedGrids()
      setSavedNames(names)
    }
    fetchSaved()
  }, [])

  const handleLoad = useCallback(async (name: string) => {
    const grid = await loadGridFromStorage(name)
    if (grid) {
      dispatch(setGrid(grid))
      router.dismissTo('/editor')
    }
  }, [dispatch, router])

  const confirmDelete = async () => {
    if (pendingDelete) {
      await deleteGridFromStorage(pendingDelete)
      setSavedNames((prev) => prev.filter((n) => n !== pendingDelete))
      setPendingDelete(null)
      setModalVisible(false)
    }
  }

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const colors = gradientColors[index % gradientColors.length]
    return (
      <Animated.View entering={FadeInDown.delay(index * 100)} style={styles.cardWrapper}>
        <Pressable onPress={() => handleLoad(item)} style={{ flex: 1 }}>
          <LinearGradient colors={colors} style={styles.card}>
            <Text style={styles.cardText}>{item}</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={() => {
            setPendingDelete(item)
            setModalVisible(true)
          }}
          style={styles.delete}
        >
          <Trash2 size={20} color="#ff4444" />
        </Pressable>
      </Animated.View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {savedNames.length === 0 && <Text style={styles.title}>🎨</Text>}
      <FlatList
        data={savedNames}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.empty}>Aucune sauvegarde</Text>}
      />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Supprimer "{pendingDelete}" ?</Text>
            <View style={styles.modalButtons}>
              <Pressable onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={{ color: '#555' }}>Annuler</Text>
              </Pressable>
              <Pressable
                onPress={confirmDelete}
                style={styles.deleteButton}
              >
                <Text style={{ color: 'white' }}>Supprimer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default GalleryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f8f9fb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  delete: {
    marginLeft: 12,
    padding: 8,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  deleteButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#ff4444',
  },
})
