import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '@/context/GlobalProvider';

const RootLayout = () => {
    const { isLoading, isLoggedIn } = useGlobalContext();

    if (!isLoading && isLoggedIn) return <Redirect href='/home' />;

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className='w-full h-full justify-center items-center p-4'>
                    <Image
                        source={images.logo}
                        style={{ resizeMode: 'contain', width: 130, height: 84 }}
                    />
                    <Image
                        source={images.cards}
                        style={{ resizeMode: 'contain', maxWidth: 380, width: '100%', height: 300 }}
                    />
                    <View className='relative mt-5'>
                        <Text className='text-3xl text-white font-bold text-center'>
                            Discover Endless Possibilities with{' '}
                            <Text className='text-secondary-200'>Aora</Text>
                        </Text>

                        <Image
                            source={images.path}
                            style={{
                                resizeMode: 'contain',
                                position: 'absolute',
                                width: 136,
                                height: 15,
                                right: 8,
                                bottom: -9,
                            }}
                        />
                    </View>

                    <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
                        Where creativity meets innovation: embark on a journey of limitless
                        exploration with Aora
                    </Text>
                    <CustomButton
                        title='Continue with Email'
                        handlePress={() => router.push('/sign-in')}
                        containerStyles='w-full mt-7'
                    />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
    );
};
export default RootLayout;
