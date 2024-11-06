import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';

import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { getCurrentUser, signIn } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const SignIn = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { setUser, setIsLoggedIn } = useGlobalContext();

    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all the fields');
            return;
        }

        setIsSubmitting(true);

        try {
            await signIn(form.email, form.password);
            const result = await getCurrentUser();
            setUser(result);
            setIsLoggedIn(true);

            Alert.alert('Success', 'User signed in successfully');
            router.replace('/home');
        } catch (error) {
            Alert.alert('Error', (error as Error).message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView>
                <View className='w-full min-h-[83vh] justify-center px-4 my-6'>
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        style={{ width: 115, height: 35 }}
                    />
                    <Text className='text-2xl text-white text-semibold font-psemibold mt-10'>
                        Log in to Aora
                    </Text>
                    <FormField
                        title='Email'
                        value={form.email}
                        handleChangeText={(e: string) => setForm({ ...form, email: e })}
                        otherStyles='mt-7'
                        keyboardType='email-address'
                        placeholder=''
                    />
                    <FormField
                        title='Password'
                        value={form.password}
                        handleChangeText={(e: string) => setForm({ ...form, password: e })}
                        otherStyles='mt-7'
                        placeholder=''
                    />
                    <CustomButton
                        title='Sign In'
                        handlePress={submit}
                        containerStyles='mt-7'
                        isLoading={isSubmitting}
                    />
                    <View className='justify-center pt-5 flex-row gap-2 '>
                        <Text className='text-lg text-gray-100 font-pregular'>
                            Don't have an account?
                        </Text>
                        <Link href='/sign-up' className='text-lg font-psemibold text-secondary'>
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
