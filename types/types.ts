import { ImagePickerAsset } from 'expo-image-picker';

export interface IForm {
    title: string;
    video: ImagePickerAsset | null;
    thumbnail: ImagePickerAsset | null;
    prompt: string;
}
