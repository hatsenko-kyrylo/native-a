import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';

import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { createUser } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const SignUp = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { setUser, setIsLoggedIn } = useGlobalContext();

    const submit = async () => {
        if (!form.email || !form.password || !form.username) {
            Alert.alert('Error', 'Please fill in all the fields');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await createUser(form.email, form.password, form.username);
            setUser(result);
            setIsLoggedIn(true);

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
                        Sign up to Aora
                    </Text>
                    <FormField
                        title='Username'
                        value={form.username}
                        handleChangeText={(e: string) => setForm({ ...form, username: e })}
                        otherStyles='mt-10'
                        keyboardType='email-address'
                        placeholder=''
                    />
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
                        title='Sign Up'
                        handlePress={submit}
                        containerStyles='mt-7'
                        isLoading={isSubmitting}
                    />
                    <View className='justify-center pt-5 flex-row gap-2 '>
                        <Text className='text-lg text-gray-100 font-pregular'>
                            Have an account already?
                        </Text>
                        <Link href='/sign-in' className='text-lg font-psemibold text-secondary'>
                            Sign In
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
