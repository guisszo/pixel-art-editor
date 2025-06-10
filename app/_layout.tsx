import { store } from '@/store'
import { Stack } from 'expo-router'
import { Provider } from 'react-redux'

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "accueil" }} />
        <Stack.Screen name="editor/index" options={{ title: "Éditeur" }} />
        <Stack.Screen name="gallery/index" options={{ title: 'Galerie' }} />
      </Stack>
    </Provider>
  )
}
