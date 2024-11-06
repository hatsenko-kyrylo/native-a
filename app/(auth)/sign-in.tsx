import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';

const SighIn = () => {
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView>
                <View className='w-full h-full justify-center px-4 my-6'>
                    <Image
                        source={images.logo}
                        style={{ resizeMode: 'contain', width: 115, height: 35 }}
                    />
                    <Text className='text-2xl text-white text-semibold font-psemibold mt-10'>
                        Log in to Aora
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SighIn;
