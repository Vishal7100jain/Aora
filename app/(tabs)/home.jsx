import { FlatList, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Item = ({ id }) => {
    return <View><Text className="text-3xl">{id}</Text></View>
}
const home = () => {
    return (
        <SafeAreaView className="bg-primary">
            <FlatList
                data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Item id={item.id} />
                )}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 space-y-6">
                        <View className="justify-between items-start mb-6">
                            <Text className="font-pmedium text-sm text-gray-100">Wellcome Back</Text>
                            <Text className="font-semibold text-white">vishal jain</Text>
                        </View>
                    </View>
                )}
            >
            </FlatList>
        </SafeAreaView >
    )
}

export default home
