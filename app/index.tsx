import { Redirect } from 'expo-router';
import { View } from 'react-native';
import { useMMKVBoolean } from 'react-native-mmkv';

export default function Home() {
  // default MMKV instance
  const [isAppOpenFirstTime, setIsAppOpenFirstTime] = useMMKVBoolean('isAppOpenFirstTime');
  // first-time initialization
  if (isAppOpenFirstTime === undefined || isAppOpenFirstTime === true) {
    setIsAppOpenFirstTime(false);
    return null; // render nothing until state updates
  }
  console.log('isAppOpenFirstTime 2:', isAppOpenFirstTime);

  return (
    <View>

      <Redirect href="/parentflow/onboarding" />

    </View>
  );
}
