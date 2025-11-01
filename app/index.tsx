import { Redirect, useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Home() {
  const router= useRouter()
  return (
    <View>


      <Redirect href="/onboarding" />
    </View>
  );
}

