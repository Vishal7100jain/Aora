import React, { useRef, useState } from 'react'
import { Audio, ResizeMode, Video } from 'expo-av';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../constants';


const VideosCard = ({ video: { title, video, thumbnail, users: { username, avatar } } }) => {
    const [play, setPlay] = useState(false)

    // console.log(thumbnail)

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="flex-1 flex-row justify-center items-center">
                    <View className="w-[46px]  h-[46px] rounded-full border-secondary border justify-center items-center p-0.5">
                        <Image source={{ uri: avatar }} className="w-full h-full rounded-full" resizeMode='contain'></Image>
                    </View>
                    <View className="flex-1 justify-center ml-3 gap-y-1">
                        <Text className="text-sm font-psemibold text-white" numberOfLines={1}>{title}</Text>
                        <Text className="font-pregular text-gray-100">{username}</Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode='contain'></Image>
                </View>
            </View>

            {play ? (
                <Video
                    source={{ uri: video }}
                    className="w-full h-60 justify-center items-center mt-3 rounded-xl"
                    useNativeControls
                    isLooping
                    resizeMode={ResizeMode.CONTAIN}
                ></Video>
            ) : (
                <TouchableOpacity onPress={() => setPlay(true)} activeOpacity={0.7} className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'>
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-full mt-3 rounded-lg"
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className="w-10 h-10 absolute"
                        resizeMode='contain'
                    ></Image>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default VideosCard
