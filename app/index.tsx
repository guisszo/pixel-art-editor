import { Link } from 'expo-router'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue dans Pixel Art!</Text>
      <Link href="/editor" asChild>
        <Button title="Aller à l’éditeur" />
      </Link>
      <View style={{ height: 20 }} />
      <Link href="/gallery" asChild>
        <Button title="Voir les créations" />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
})
