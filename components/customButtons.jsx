import { TouchableOpacity, Text } from 'react-native'

import React from 'react'

const CustomButtons = ({ title, handlePress, containerStyle, textStyles, isloading }) => {
    return (
        <TouchableOpacity
            className={`bg-secondary ${isloading ? "opacity-50" : ""} rounded-xl min-h-[62px] justify-center items-center ${containerStyle}`}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity >
    )
}

export default CustomButtons