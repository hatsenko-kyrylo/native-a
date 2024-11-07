import { Text, FlatList } from 'react-native';
import React from 'react';
import { Models } from 'react-native-appwrite';

interface ITrendingProps {
    posts: Models.Document[];
}

const Trending = ({ posts }: ITrendingProps) => {
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <Text className='text-white'>{item.id}</Text>}
            horizontal
        />
    );
};

export default Trending;
