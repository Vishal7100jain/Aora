import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({ otherStyle, handleChangeText, title, value, placeholder }) => {
    let [passwordShow, SetShowPassword] = useState(false)
    return (
        <View className={`${otherStyle} space-y-2`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
            <View className="border-2 rounded-2xl w-full h-16 px-4 border-black-200 focus:border-secondary flex-row">
                <TextInput
                    value={value}
                    onChange={handleChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    className="flex-1 w-full text-base text-white font-psemibold"
                    secureTextEntry={passwordShow}
                />
                {title === 'Password' &&
                    <TouchableOpacity onPress={(e) => SetShowPassword(pre => !pre)}>
                        {passwordShow ?
                            (<Image className="w-8 h-18" resizeMode='contain' source={icons.eye} />) :
                            (<Image className="w-8 h-18" resizeMode='contain' source={icons.eyeHide} />)
                        }
                    </TouchableOpacity>
                }
            </View>
        </View >
    )
}

export default FormField