import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Models } from 'react-native-appwrite';
import { Video, ResizeMode } from 'expo-av';

import { icons } from '@/constants';

interface IVideoCardProps {
    video: Models.Document;
}

const VideoCard = ({
    video: {
        title,
        thumbnail,
        video,
        creator: { username, avatar },
    },
}: IVideoCardProps) => {
    const [play, setPlay] = useState(false);

    return (
        <View className='flex-col items-center px-4 mb-14'>
            <View className='flex-row gap-3 items-start'>
                <View className='justify-center items-center flex-row flex-1'>
                    <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
                        <Image
                            source={{ uri: avatar }}
                            className='w-full h-full rounded-lg'
                            resizeMode='contain'
                        />
                    </View>
                    <View className='justify-center flex-1 ml-3 gap-y-1'>
                        <Text className='text-white text-sm font-psemibold' numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className='text-xs text-gray-100 font-pregular'>{username}</Text>
                    </View>
                </View>
                <View className='pt-2'>
                    <Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
                </View>
            </View>
            {play ? (
                <Video
                    source={{
                        uri: 'https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4',
                    }}
                    style={{
                        width: '100%',
                        height: 240,
                        borderRadius: 12,
                        marginTop: 12,
                    }}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <Image
                        source={{ uri: thumbnail }}
                        className='w-full h-full rounded-xl mt-3'
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className='absolute w-12 h-12'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default VideoCard;
