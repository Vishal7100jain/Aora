import { Client, Account, Storage, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const Configs = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.vishal.aora",
    projectId: "6622174a1c45b3ec4f46",
    databaseId: "6622193ec45bf8d68a9e",
    userCollectionId: "662219730858a5c09127",
    videosCollectionId: "662219c505fc9286496d",
    bucketId: '6642e856000b422ec5ff'
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
const storage = new Storage(client)

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
        throw new Error(error.message)
    }
}

export const Login = async (email, password) => {
    await account.createEmailSession(email, password)
        .then((res) => {
            return res
        }).catch((err) => {
            throw new Error(err.message)
        })

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

export const getAllPost = async () => {
    try {
        const AllPost = await database.listDocuments(Configs.databaseId, Configs.videosCollectionId)
        return AllPost.documents;
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const getLatestPosts = async () => {
    try {
        const AllPost = await database.listDocuments(Configs.databaseId, Configs.videosCollectionId, [Query.orderDesc('$createdAt'), Query.limit(7)])
        return AllPost.documents;
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}


export const getFilePriview = (id, type) => {
    let fileUrl;

    try {
        if (type === "video") {
            fileUrl = storage.getFileView(Configs.bucketId, id)
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(Configs.bucketId, id, 2000, 2000, 'top', 100)
        }

        if (!fileUrl) throw new Error
        return fileUrl

    } catch (error) {
        throw new Error(error)
    }
}

export const upLoadFile = async (file, type) => {
    const { mimeType, ...rest } = file
    const assest = { type: mimeType, ...rest }

    try {
        const result = await storage.createFile(Configs.bucketId, ID.unique(), assest)

        const fileUrl = getFilePriview(result.$id, type)

        return fileUrl

    } catch (error) {
        throw new Error(error)
    }
}


export const createVideo = async (formData) => {
    try {
        const { Title: title, AiPrompt: prompt, user } = formData
        const users = user.$id
        const [thumbnail, video] = await Promise.all([
            upLoadFile(formData.thumbnail, 'image'),
            upLoadFile(formData.video, 'video'),
        ])

        const newPost = await database.createDocument(Configs.databaseId, Configs.videosCollectionId, ID.unique(),
            { title, thumbnail, prompt, video, users })

        return newPost
    } catch (error) {
        throw new Error(error)
    }
}
