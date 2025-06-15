import { store } from '@/store';
import { Stack } from 'expo-router';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: true }}>
          <Stack.Screen name="index" options={{ title: "accueil", headerShown: false }} />
          <Stack.Screen name="editor/index" options={{ title: "Éditeur" }} />
          <Stack.Screen name="gallery/index" options={{ title: 'Galerie' }} />
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  )
}
