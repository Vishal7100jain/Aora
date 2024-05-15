import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='[query]'
                options={{ headerShown: false }}
            >
            </Stack.Screen>
        </Stack >
    )
}

export default _layout
