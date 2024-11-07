import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';

interface ISearchInputProps {
    title: string;
    value: string;
    handleChangeText: (e: string) => void;
    otherStyles: string;
    keyboardType?: string;
    placeholder: string;
}

const SearchInput = ({
    title,
    value,
    handleChangeText,
    otherStyles,
    placeholder,
    ...props
}: ISearchInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View
            className={`border-2 w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row space-x-4 ${
                isFocused ? 'border-secondary-200' : 'border-black-200'
            }`}
        >
            <TextInput
                className='flex-1 text-base text-white font-pregular mt-0.5'
                value={value}
                placeholder='Search for a video topic'
                placeholderTextColor='#7b7b8b'
                onChangeText={handleChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            <TouchableOpacity>
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
