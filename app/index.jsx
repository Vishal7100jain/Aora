import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButtons from '../components/customButtons.jsx'
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/Globalprovider.js';


export default function App() {
    const { isLoading, isLoggedIn } = useGlobalContext()

    if (!isLoading && isLoggedIn) return <Redirect href="/create" />

    return <>
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="w-full items-center justify-center h-full px-4">
                    <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode='contain'></Image>
                    <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode='contain'></Image>
                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center ">
                            Discover Endless Possiblities with{" "}
                            <Text className="text-secondary-200">
                                Aora
                            </Text>
                        </Text>
                        <Image source={images.path} className="w-[116px] h-[15px] absolute -bottom-2 -right-8" resizeMode='contain'></Image>
                    </View>
                    <Text className="text-gray-100 mt-7 text-center text-xs">Where creativity meets innovation: embark on a journey of limitless exploration with Aror</Text>
                    <CustomButtons title="Continue With Email" handlePress={() => router.push("/login")} containerStyle="w-full mt-7" />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light'></StatusBar>
        </SafeAreaView>
    </ >
}

