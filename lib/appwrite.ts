import {
    Client,
    Account,
    ID,
    Avatars,
    Databases,
    Query,
    Storage,
    Models,
    ImageGravity,
} from 'react-native-appwrite';
import { ImagePickerAsset } from 'expo-image-picker';

import { IForm } from '@/types/types';

interface IFormWithUserId extends IForm {
    userId: string;
}

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.sora.aora',
    projectId: '672bafce00010819043e',
    databaseId: '672bb1ea00057e2d3b12',
    userCollectionId: '672bb21500116dccf189',
    videosCollectionId: '672bb24f0013379b9349',
    storageId: '672bb43b0022e9cb4708',
};

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videosCollectionId,
    storageId,
} = config;

const client: Client = new Client();
client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account: Account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email: string, password: string, username: string) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);

        if (!newAccount) throw new Error();

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(databaseId, userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw error;
    }
};
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw new Error();

        const currentUser = await databases.listDocuments(databaseId, userCollectionId, [
            Query.equal('accountId', currentAccount.$id),
        ]);

        if (!currentUser) throw new Error();
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(databaseId, videosCollectionId, [
            Query.orderDesc('$createdAt'),
        ]);

        return posts.documents;
    } catch (error) {
        throw error;
    }
};
export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(databaseId, videosCollectionId, [
            Query.orderDesc('$createdAt'),
            Query.limit(7),
        ]);

        return posts.documents;
    } catch (error) {
        throw error;
    }
};
export const searchPosts = async (query: string) => {
    try {
        const posts = await databases.listDocuments(databaseId, videosCollectionId, [
            Query.search('title', query),
        ]);

        return posts.documents;
    } catch (error) {
        console.error('Error searching posts:', error);
        return [];
    }
};
export const getUserPosts = async (userId: string | undefined) => {
    try {
        if (typeof userId === 'string') {
            const posts = await databases.listDocuments(databaseId, videosCollectionId, [
                Query.equal('creator', userId),
                Query.orderDesc('$createdAt'),
            ]);

            return posts.documents;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error searching posts:', error);
        return [];
    }
};
export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        throw error;
    }
};
export const getFilePreview = async (fileId: string, type: string) => {
    let fileUrl;

    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId);
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(
                storageId,
                fileId,
                2000,
                2000,
                'top' as ImageGravity,
                100
            );
        } else {
            throw new Error('Invalid file type');
        }

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        throw error;
    }
};
export const uploadFile = async (file: ImagePickerAsset, type: string) => {
    if (!file) return;

    if (!file.mimeType) {
        throw new Error('The file type could not be determined');
    }

    if (!file.fileSize) {
        throw new Error('File size not specified');
    }

    const asset = {
        name: file.fileName || `file-${Date.now()}`,
        size: file.fileSize || 0,
        uri: file.uri,
        type: file.mimeType,
    };

    try {
        const uploadedFile = await storage.createFile(storageId, ID.unique(), asset);
        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw error;
    }
};
export const createVideo = async (form: IFormWithUserId) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            form.thumbnail ? uploadFile(form.thumbnail, 'image') : null,
            form.video ? uploadFile(form.video, 'video') : null,
        ]);

        const newPost = await databases.createDocument(
            databaseId,
            videosCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl || '',
                video: videoUrl || '',
                prompt: form.prompt,
                creator: form.userId,
            }
        );

        return newPost;
    } catch (error) {
        throw error;
    }
};
