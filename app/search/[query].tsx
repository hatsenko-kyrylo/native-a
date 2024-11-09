import { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import { searchPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';

const Search = () => {
    const { query } = useLocalSearchParams();
    const searchQuery = Array.isArray(query) ? query[0] : query || '';
    const { data: posts, refetch } = useAppwrite(() => searchPosts(searchQuery));

    useEffect(() => {
        if (query) {
            refetch();
        }
    }, [query]);

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => <VideoCard video={item} />}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4'>
                        <Text className='font-pmedium text-sm text-gray-100'>Search results</Text>
                        <Text className='font-semibold text-2xl text-white'>{query}</Text>

                        <View className=' mt-6 mb-8'>
                            <SearchInput initialQuery={searchQuery} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Videos Found'
                        subtitle='No videos found for this search query'
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Search;
