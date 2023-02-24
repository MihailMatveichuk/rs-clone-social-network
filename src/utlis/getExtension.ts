import { MessageType } from "../types";
const videoExtensions = ['mp4', 'm4v', 'webm', 'ogv', 'flv', 'mkv', 'avi'];
const imageExtensions = ['jpg', 'jpeg', 'png']

export const getExtension = (message: string): MessageType => {
    if (!message) {
        return 'text';
    }
    const messageExst =
    message.split('.')[message.split('.').length - 1];
    if (imageExtensions.includes(messageExst)) {
        return 'img'
    }
    if (videoExtensions.includes(messageExst)) {
        return 'video'
    }
    if (message.includes('https://www')) {
        return 'url'
    }
    if (message.includes('voice')) {
        return 'audio'
    }
    return 'text'
}