import { FlatList, ViewToken } from 'react-native';
import { useState } from 'react';
import { Models } from 'react-native-appwrite';

import TrendingItem from './TrendingItem';

interface ITrendingProps {
    posts: Models.Document[] | [];
}
interface IViewableItems {
    viewableItems: ViewToken[];
}

const Trending = ({ posts }: ITrendingProps) => {
    const [activeItem, setActiveItem] = useState(posts[0]?.$id || '');

    const viewableItemsChanged = ({ viewableItems }: IViewableItems) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key as string);
        }
    };

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
            contentOffset={{ x: 170, y: 0 }}
            horizontal
        />
    );
};

export default Trending;
