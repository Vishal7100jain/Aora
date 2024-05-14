import React from 'react'
import { Image, Text, View } from 'react-native'
import { icons, images } from '../constants'
import CustomButtons from './customButtons'
import { router } from 'expo-router'

const Empty = ({ title, subTitle }) => {
    return (
        <View className="justify-center items-center px-4">
            <Image source={images.empty} className="w-[275px] h-[215px]" resizeMode='contain' />
            <Text className="text-xl font-psemibold text-white">{title}</Text>
            <Text className="font-pmedium text-sm text-white">{subTitle}</Text>
            <CustomButtons
                title="Create Video"
                handlePress={() => router.push("/create")}
                containerStyle="w-full mt-5"
            ></CustomButtons>
        </View>
    )
}

export default Empty
