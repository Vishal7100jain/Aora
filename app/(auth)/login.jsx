import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButtons from '../../components/customButtons.jsx'
import { Link } from 'expo-router'

const login = () => {
    let [FormText, setform] = useState({ email: "", password: "" })

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                    <Image source={images.logo} className="w-[130px] h-[35px]" resizeMode='contain'></Image>
                    <Text className="text-2xl text-semibold mt-10 font-psemibold text-white">Login to Aora</Text>
                    <FormField
                        title="Email"
                        placeholder="Email"
                        otherStyle="mt-7"
                        handleChangeText={(e) => setform((pre) => pre.email = e)}
                        value={FormText.email}
                    ></FormField>
                    <FormField
                        value={FormText.password}
                        title="Password"
                        otherStyle="mt-7"
                        placeholder="Password"
                        handleChangeText={(e) => setform((pre) => pre.password = e)}
                    ></FormField>

                    <CustomButtons title="Login" handlePress={handleSubmit} containerStyle='mt-7'></CustomButtons>
                    <View className="mt-3 justify-center flex-row">
                        <Text className="text-white font-pregular">Don't have Account ? </Text>
                        <Link href="/signUp" className='text-secondary font-psemibold'>SignUp</Link>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default login
