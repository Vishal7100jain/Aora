import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButtons from '../../components/customButtons.jsx'
import { Link, router } from 'expo-router'
import { Login } from '../../lib/appwrite.js'
import { useGlobalContext } from '../../context/Globalprovider.js'

const login = () => {
    let [FormText, setform] = useState({ email: "", password: "" })
    const { setUser, setLoggedIn } = useGlobalContext()
    const [isLoading, setisLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!FormText.email || !FormText.password) {
            return Alert.alert("Error", "Fill all the fields")
        }

        setisLoading(true)
        try {
            console.log(FormText)
            const result = await Login(FormText.email, FormText.password)
            setUser(result)
            setLoggedIn(true)
            return router.replace("/home")
        } catch (error) {
            return Alert.alert("Error", error.message)
        }
        finally {
            setisLoading(false)
        }

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
                        handleChangeText={(e) => setform(pre => ({ ...pre, email: e }))}
                        value={FormText.email}
                    ></FormField>
                    <FormField
                        value={FormText.password}
                        title="Password"
                        otherStyle="mt-7"
                        placeholder="Password"
                        handleChangeText={(e) => setform(pre => ({ ...pre, password: e }))}
                    ></FormField>

                    <CustomButtons loadingState={isLoading} title="Login" handlePress={handleSubmit} containerStyle='mt-7'></CustomButtons>
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
