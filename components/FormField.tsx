import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';

interface IFormFieldProps {
    title: string;
    value: string;
    handleChangeText: (e: string) => void;
    otherStyles: string;
    keyboardType?: string;
    placeholder: string;
}

const FormField = ({
    title,
    value,
    handleChangeText,
    otherStyles,
    placeholder,
    ...props
}: IFormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-100 font-pmedium mb-4'>{title}</Text>
            <View
                className={`border-2 w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row ${
                    isFocused ? 'border-secondary-200' : 'border-black-200'
                }`}
            >
                <TextInput
                    className='flex-1 w-full text-white font-psemibold text-base'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor='#7b7b8b'
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            style={{ width: 24, height: 24 }}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
