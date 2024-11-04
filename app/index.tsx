import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';

const RootLayout = () => {
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className='w-full h-full justify-center items-center'>
                    <Image source={images.logo} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default RootLayout;
