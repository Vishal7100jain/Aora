import { Alert, FlatList, Image, RefreshControl, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchField from '../../components/SearchInput.jsx'
import { Trending } from '../../components/Trending.jsx'
import Empty from '../../components/Empty.jsx'
import { getAllPost, getLatestPosts } from '../../lib/appwrite.js'
import { useAppwrite } from '../../lib/useAppwrite.js'
import VideosCard from '../../components/VideosCard.jsx'
import CustomButtons from '../../components/customButtons.jsx'

const Item = ({ id }) => {
    return <View><Text className="text-3xl text-white">{id}</Text></View>
}
const home = () => {
    const [search, setSearch] = useState()
    const [refreshing, setRefreshing] = useState(false)

    const { Data: posts } = useAppwrite(getAllPost);
    const { Data: latestPosts, reFetch } = useAppwrite(getLatestPosts);

    const onRefresh = async () => {
        setRefreshing(true)
        await reFetch()
        setRefreshing(false)
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            {/* {posts.map(item => console.log(item))} */}
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <>
                        <VideosCard video={item}></VideosCard>
                    </>
                )
                }
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 ">
                        <View className="justify-between flex-row items-start mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-white">Wellcome Back</Text>
                                <Text className="text-2xl font-psemibold text-white">vishal jain</Text>
                            </View>
                            <View >
                                <Image source={images.logoSmall} className="w-9 h-10" resizeMode='contain' />
                            </View>
                        </View>
                        <SearchField
                            handleChangeText={(e) => setSearch(e)}
                            value={search}
                            placeholder="Search for a video topic"
                        />
                        <View className="w-full flex-1 pt-10 pb-8">
                            <Text className="text-gray-100 text-lg font-pregular mb-3">
                                Trending Videos
                            </Text>
                            <Trending posts={latestPosts ?? []} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => {
                    return <Empty title="No Video Found" subTitle="Be the first one to upload a video">
                        <CustomButtons
                            title="Create Video"
                            handlePress={() => router.push("/create")}
                            containerStyle="w-full mt-5"
                        ></CustomButtons>
                    </Empty>
                }}
                refreshControl={
                    < RefreshControl refreshing={refreshing} onRefresh={onRefresh} ></RefreshControl >
                }
            />
        </SafeAreaView >
    )
}

export default home
