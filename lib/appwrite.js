import { Client, Account, Storage, ID, Avatars, Databases, Query } from 'react-native-appwrite';
import { endpoint, platform, projectId, databaseId, userCollectionId, videosCollectionId, bucketId } from '@env'

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.

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

        const result = await account.createEmailSession(email, password)
        if (!result) throw Error

        const newUser = database.createDocument(databaseId, userCollectionId, ID.unique(), {
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
    try {
        const result = await account.createEmailSession(email, password)
        if (!result) throw Error

        const user = await database.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal("email", [email])]
        )

        return user.documents[0]
    }
    catch (error) {
        throw new Error(error)
    }
}


export const Logout = async () => {
    try {
        const userLogout = await account.deleteSession("current")
    } catch (error) {
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const userAccout = await account.get()

        if (!userAccout) throw Error

        const currentUser = await database.listDocuments(
            databaseId,
            userCollectionId,
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
        const AllPost = await database.listDocuments(databaseId, videosCollectionId)
        return AllPost.documents;
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const getLatestPosts = async () => {
    try {
        const AllPost = await database.listDocuments(databaseId, videosCollectionId, [Query.orderDesc('$createdAt'), Query.limit(7)])
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
            fileUrl = storage.getFileView(bucketId, id)
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(bucketId, id, 2000, 2000, 'top', 100)
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
        const result = await storage.createFile(bucketId, ID.unique(), assest)

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

        const newPost = await database.createDocument(databaseId, videosCollectionId, ID.unique(),
            { title, thumbnail, prompt, video, users })

        return newPost
    } catch (error) {
        throw new Error(error)
    }
}

export const SearchPosts = async (query) => {
    try {
        console.log(query)
        const AllPost = await database.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.search('title', query)]
        )
        return AllPost.documents;
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}


export const MyPosts = async (userId) => {
    try {
        const posts = await database.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.equal("users", userId)]
        )
        if (!posts) throw Error
        return posts.documents
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

