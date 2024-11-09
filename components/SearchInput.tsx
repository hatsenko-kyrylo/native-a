import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { router, usePathname } from 'expo-router';

import { icons } from '@/constants';

interface ISearchInputProps {
    initialQuery: string;
}

const SearchInput = ({ initialQuery }: ISearchInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '');

    return (
        <View
            className={`border-2 w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row space-x-4 ${
                isFocused ? 'border-secondary-200' : 'border-black-200'
            }`}
        >
            <TextInput
                className='flex-1 text-base text-white font-pregular mt-0.5'
                value={query}
                placeholder='Search for a video topic'
                placeholderTextColor='#CDCDE0'
                onChangeText={(e) => setQuery(e)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            <TouchableOpacity
                onPress={() => {
                    if (!query) {
                        Alert.alert(
                            'Missing query',
                            'Please input something to search results across database'
                        );
                    }

                    if (pathname.startsWith('/search')) router.setParams({ query });
                    else router.push(`/search/${query}`);
                }}
            >
                <Image
                    source={icons.search}
                    style={{ width: 20, height: 20 }}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;
