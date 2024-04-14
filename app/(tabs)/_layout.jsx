import { Tabs, Redirect } from "expo-router"
import { Image, Text, View } from "react-native"
import icons from '../../constants/icons'

const TabIcon = ({ color, icon, focused, name }) => {
    return <>
        <View className={`items-center justify-evenly gap-4 ${focused ? 'border-t-8' : ''} w-full`} style={{ borderTopColor: "#ffa001" }}>
            <Image source={icon} resizeMode='contain' className='w-6 h-6' tintColor={color}></Image>
        </View >
        <Text className={`${focused ? 'font-psemibold' : "font-pregular"}`} style={{ color: color }}>{name}</Text>
    </>
}


const TabsLayout = () => {
    return <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ffa001",
        tabBarInactiveTintColor: "#cdcde0",
        tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
        },
    }}>
        <Tabs.Screen
            name="home"
            options={{
                title: "Home", headerShown: false, tabBarIcon: ({ color, focused }) => (
                    <TabIcon icon={icons.home} color={color} focused={focused} name="Home" />
                )
            }}
        />
        <Tabs.Screen
            name="booksmark"
            options={{
                title: "booksmark", headerShown: false, tabBarIcon: ({ color, focused }) => (
                    <TabIcon icon={icons.bookmark} color={color} focused={focused} name="Bookmark" />
                )
            }}
        />
        <Tabs.Screen
            name="create"
            options={{
                title: "create", headerShown: false, tabBarIcon: ({ color, focused }) => (
                    <TabIcon icon={icons.plus} color={color} focused={focused} name="Create" />
                )
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: "profile", headerShown: false, tabBarIcon: ({ color, focused }) => (
                    <TabIcon icon={icons.profile} color={color} focused={focused} name="Profile" />
                )
            }}
        />
    </Tabs>
}

export default TabsLayout
