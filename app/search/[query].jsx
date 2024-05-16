import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, Button, FlatList, Image, SafeAreaView, Text, View } from 'react-native'
import { SearchPosts } from '../../lib/appwrite'
import SearchField from '../../components/SearchInput'
import Empty from '../../components/Empty'
import VideosCard from '../../components/VideosCard'

const Search = () => {
    const { query } = useLocalSearchParams()
    const [posts, setPosts] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getPostThrowQuery = async () => {
            setIsLoading(true)
            try {
                const posts = await SearchPosts(query)
                setPosts(posts)
            } catch (error) {
                console.log(error)
                Alert.alert("Error", error.message)
            } finally {
                setIsLoading(false)
            }
        }

        getPostThrowQuery()
    }, [query])

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                className="mt-10"
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideosCard video={item}></VideosCard>
                )
                }
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 ">
                        <View className="justify-between flex-row items-start mb-6">
                            <View>
                                <Text className="font-pmedium text-gray-100 text-sm">Search Results</Text>
                                <Text className="text-2xl font-psemibold text-white mt-1">{query}</Text>
                            </View>
                        </View>
                        <View>
                            <SearchField
                                value={query}
                                placeholder="Search with the title..."
                                loadingState={isLoading}
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => {
                    return <Empty title="No Video Found" subTitle="No Result Found" />
                }}
            />
        </SafeAreaView >
    )
}

export default Search
