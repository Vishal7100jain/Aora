import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PostAllVideos } from '../../lib/appwrite'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField.jsx'
import CustomButtons from '../../components/customButtons'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '../../constants'
import * as DocumentPicker from 'expo-document-picker';

const create = () => {
    const [isLoading, setisLoading] = useState(false)
    const [formData, setFormData] = useState({ Title: '', video: null, thumbnail: null, AiPrompt: "" })

    useEffect(() => {
        // PostAllVideos()
    }, [])

    const picker = async (FileType) => {
        const result = await DocumentPicker.getDocumentAsync({
            type: FileType === 'image' ?
                ['image/png', 'image/jpg', 'image/tiff', 'image/jpeg'] : ['video/mp4', 'video/gif']
        })

        if (!result.canceled) {
            if (FileType === "image") {
                setFormData(pre => pre = { ...pre, thumbnail: result.assets[0] })
            }
            if (FileType === "video") {
                setFormData(pre => pre = { ...pre, video: result.assets[0] })
            }
        }
    }

    const submit = () => {
        if (!formData.AiPrompt || !formData.Title || !formData.thumbnail || !formData.video) {
            return Alert.alert("Error", "Fill all the Fields")
        }

        console.log(formData)
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="px-4 my-6">
                <Text className='text-white font-psemibold text-2xl'>Upload Video</Text>
                <View>
                    <FormField handleChangeText={(e) => setFormData(pre => pre = { ...pre, Title: e })} title='Video title' placeholder='Give your video a catchy title' value={formData.Title} otherStyle='mt-10' />
                </View>

                <View className="mt-7 space-y-2">
                    <Text className='text-base text-gray-100 font-pmedium'>
                        Upload video
                    </Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={(e) => picker('video')}>
                        {formData.video ? (
                            <Video
                                source={{ uri: formData.video.uri }}
                                className='w-full h-64 rounded-2xl '
                                useNativeControls
                                isLooping
                                resizeMode={ResizeMode.CONTAIN}
                            />
                        ) : (
                            <View className="h-40 px-4 bg-black-100 rounded-2xl items-center justify-center">
                                <View className='w-14 h-14 border rounded-2xl border-secondary-100 justify-center items-center'>
                                    <Image source={icons.upload} className='w-1/2 h-1/2' resizeMode='contain'></Image>
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View className='mt-7 space-y-2'>
                    <Text className='text-base text-gray-100 font-pmedium'>
                        Upload thumbnail
                    </Text>

                    <TouchableOpacity activeOpacity={0.7} onPress={(e) => picker('image')}>
                        {formData.thumbnail ? (
                            <Image
                                source={{ uri: formData.thumbnail.uri }}
                                className="w-full h-32 rounded-2xl"
                            ></Image>
                        ) : (
                            <View className="h-15 px-4 bg-black-100 rounded-2xl flex-row items-center justify-center">
                                <View className='w-14 h-14 justify-center items-center'>
                                    <Image source={icons.upload} className='w-1/2 h-1/2' resizeMode='contain'></Image>
                                </View>
                                <Text className='text-base text-gray-100 font-pmedium'>Choose a file</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <View className='mt-7 space-y-2'>
                    <FormField handleChangeText={(e) => setFormData(pre => pre = { ...pre, AiPrompt: e })} title='AI Prompt' placeholder='The ai prompt for your video' value={formData.AiPrompt} />
                </View>

                <View className='mt-7 space-y-2'>
                    <CustomButtons handlePress={submit} title='submit & Publish'></CustomButtons>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default create

const styles = StyleSheet.create({})