import { TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useState } from 'react';
import { Video, ResizeMode } from 'expo-av';
import { Models } from 'react-native-appwrite';
import * as Animatable from 'react-native-animatable';

import { icons } from '@/constants';

interface ITrendingItemProps {
    activeItem: string;
    item: Models.Document;
}

const zoomIn: Animatable.CustomAnimation = {
    0: {
        transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    },
    1: {
        transform: [{ scaleX: 1 }, { scaleY: 1 }],
    },
};
const zoomOut: Animatable.CustomAnimation = {
    0: {
        transform: [{ scaleX: 1 }, { scaleY: 1 }],
    },
    1: {
        transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    },
};

const TrendingItem = ({ activeItem, item }: ITrendingItemProps) => {
    const [play, setPlay] = useState(false);

    return (
        <Animatable.View
            className='mr-5'
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
                <Video
                    source={{
                        uri: item.video,
                    }}
                    className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
                    style={{
                        width: 208,
                        height: 288,
                        borderRadius: 35,
                        marginTop: 12,
                        backgroundColor: 'rgb(255 255 255 / 0.1)',
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
                    className='relative justify-center items-center'
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        source={{ uri: item.thumbnail }}
                        className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                        resizeMode='cover'
                    />

                    <Image
                        source={icons.play}
                        className='absolute w-12 h-12'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
};

export default TrendingItem;
