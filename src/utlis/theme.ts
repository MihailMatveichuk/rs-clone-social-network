export enum Themes {
    LIGHT = 'light',
    DARK = 'dark',
    NORTHERN_SHINING = 'northern'
}

export const changeTheme = (theme: Themes) => {
    document.documentElement.className = "";
    document.documentElement.className = theme;
}

export const getTheme = () => {
    return document.documentElement.className
}