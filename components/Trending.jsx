import { FlatList, Text, View } from "react-native"

const Item = ({ id }) => {
    return <View><Text className="text-3xl text-white">{id}</Text></View>
}

export const Trending = ({ posts }) => {
    return <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
            return <Item id={item.id} />
        }}
        horizontal={true}
    ></FlatList>
}