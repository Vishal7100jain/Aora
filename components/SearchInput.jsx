import { View, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const SearchField = ({ handleChangeText, value, placeholder }) => {
    return (
        <View className="border-2 rounded-2xl w-full h-16 px-4 border-black-200 focus:border-secondary flex-row items-center">
            <TextInput
                value={value}
                onChangeText={handleChangeText}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                className="flex-1 w-full text-base text-white font-psemibold"
            />
            <TouchableOpacity >
                <Image source={icons.search} className="w-6 h-6" resizeMode='contain'></Image>
            </TouchableOpacity>
        </View>
    )
}

export default SearchField