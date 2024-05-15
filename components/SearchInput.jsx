import { View, TextInput, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchField = ({ placeholder, loadingState }) => {
    const pathName = usePathname()
    const [query, setQuery] = useState("")

    return (
        <View className="border-2 rounded-2xl w-full h-16 px-4 border-black-200 focus:border-secondary flex-row items-center">
            <TextInput
                value={query}
                onChangeText={(e) => setQuery(e)}
                placeholder={placeholder}
                placeholderTextColor="#CDCDE0"
                className="flex-1 w-full text-base text-white font-psemibold"
            />
            <TouchableOpacity onPress={() => {
                if (!query) {
                    return Alert.alert("Missing query", "Please enter something to search")
                }

                if (pathName.startsWith("/search")) {
                    return router.setParams({ query })
                }
                else return router.push(`/search/${query}`)
            }}>
                {loadingState ? (
                    <ActivityIndicator color="#ffffff" size='large'></ActivityIndicator>
                ) : (
                    <Image source={icons.search} className="w-6 h-6" resizeMode='contain'></Image>
                )}
            </TouchableOpacity>
        </View >
    )
}

export default SearchField