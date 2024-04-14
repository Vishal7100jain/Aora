import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
    return <>
        <View className="flex-1 justify-center items-center">
            <Text className="font-pblack text-3xl">Aora</Text>
            <StatusBar style="auto" />
            <Link href='/create' className='text-blue-500 text-5xl'>Home</Link>
        </View>
    </ >
}

