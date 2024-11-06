import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface ICustomButtonProps {
    title: string;
    handlePress: () => void;
    containerStyles: string;
    textStyles?: string;
    isLoading?: boolean;
}

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
}: ICustomButtonProps) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary rounded-xl justify-center items-center min-h-[62px] ${containerStyles} ${isLoading ? 'opacity-50' : 0}`}
            disabled={isLoading}
        >
            <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
