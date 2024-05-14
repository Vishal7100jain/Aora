import { useState } from "react"
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native"
import * as Animatable from 'react-native-animatable'
import { icons } from "../constants"

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1.1
    }
}
const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

const TrendingItem = ({ post, activeItem }) => {
    const [play, setPlay] = useState(false)
    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem === post.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
                <Text>Playing</Text>
            ) : (
                <TouchableOpacity activeOpacity={0.7} onPress={() => setPlay(true)} className="justify-center items-center relative">
                    <Image
                        className="w-52 h-72 shadow-black/40 rounded-[35px] my-5 overflow-hidden shadow-lg"
                        source={{
                            uri: post.thumbnail
                        }}
                        resizeMode="cover"
                    />
                    <Image
                        source={icons.play}
                        className="w-10 h-10 absolute"
                    ></Image>
                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

export const Trending = ({ posts }) => {
    const [Active, setActive] = useState(posts[0])

    const ChangeItemView = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActive(viewableItems[0].key)
        }
    }

    return <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
            <TrendingItem post={item} activeItem={Active} />
        )}
        onViewableItemsChanged={ChangeItemView}
        viewabilityConfig={{
            itemVisiblePercentThreshold: 70
        }}
        contentOffset={{ x: 170 }}
        horizontal={true}
    ></FlatList>
}