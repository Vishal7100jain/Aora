import { Alert, Button, FlatList, Image, SafeAreaView, Text, View } from 'react-native'
import SearchField from '../../components/SearchInput'
import Empty from '../../components/Empty'
import VideosCard from '../../components/VideosCard'
import { useEffect, useState } from 'react'
import { MyPosts } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/Globalprovider'
import { icons } from '../../constants'

const profile = () => {
    const { user } = useGlobalContext()
    const [posts, setPosts] = useState()
    const [isloading, setisloading] = useState(false)

    useEffect(() => {
        const getMyPosts = async () => {
            try {
                setisloading(true)
                const result = await MyPosts(user.$id)
                setPosts(result)
            } catch (err) {
                return Alert.alert("Error", err.message)
            } finally {
                setisloading(false)
            }
        }
        getMyPosts()
    }, [])

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                className="mt-10"
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <>
                        <VideosCard video={item}></VideosCard>
                    </>
                )
                }
                ListHeaderComponent={() => (
                    <View className="my-6 px-2 h-48 mb-24 w-full">
                        <View className="justify-center h-full items-center relative">
                            <Image source={icons.logout} className='w-5 h-5 absolute right-0 top-0' resizeMode='contain'></Image>
                            <Image source={{ uri: user.avatar }} className=" border border-secondary w-20 h-20 rounded-2xl"></Image>
                            <Text className="text-white font-pextrabold text-3xl mt-2">{user.username}</Text>
                        </View>

                        <View className="flex-row justify-center gap-5 items-center">
                            <View className="justify-center items-center">
                                <Text className="font-psemibold text-xl text-white">10</Text>
                                <Text className="font-psemibold text-xl text-white">Posts</Text>
                            </View>
                            <View className="justify-center items-center">
                                <Text className="font-psemibold text-xl text-white">1.2k</Text>
                                <Text className="font-psemibold text-xl text-white">Views</Text>
                            </View>
                        </View>
                    </View >
                )}
                ListEmptyComponent={() => {
                    return <Empty title="No Video Found" subTitle="No Result Found" />
                }}
            />
        </SafeAreaView >
    )
}

export default profile
