import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

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

let client: Client;
let account: Account;

client = new Client();
client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

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
        const posts = await databases.listDocuments(databaseId, videosCollectionId);

        return posts.documents;
    } catch (error) {
        throw error;
    }
};
