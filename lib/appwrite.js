import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const Configs = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.vishal.aora",
    projectId: "6622174a1c45b3ec4f46",
    databaseId: "6622193ec45bf8d68a9e",
    userCollectionId: "662219730858a5c09127",
    videosCollectionId: "662219c505fc9286496d"
}

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(Configs.endpoint) // Your Appwrite Endpoint
    .setProject(Configs.projectId) // Your project ID
    .setPlatform(Configs.platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatar = new Avatars(client)
const database = new Databases(client)

export const createUser = async (username, email, password) => {
    try {
        const newAccount = await account.create(
            ID.unique(), email, password, username
        )

        if (!newAccount) throw Error

        const avatarUrl = avatar.getInitials(username)

        await Login(email, password)

        const newUser = database.createDocument(Configs.databaseId, Configs.userCollectionId, ID.unique(), {
            username,
            email,
            avatar: avatarUrl,
            accountId: newAccount.$id
        })

        return newUser

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const Login = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password)
        return session;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const userAccout = await account.get()

        if (!userAccout) throw Error

        const currentUser = await database.listDocuments(
            Configs.databaseId,
            Configs.userCollectionId,
            [Query.endsWith('accountId', userAccout.$id)]
        )

        if (!currentUser) throw Error
        return currentUser.documents[0]
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}