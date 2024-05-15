export function bytesToSize(bytes: number) {
    const sizes = ['Байты', 'КБ', 'МБ', 'ГБ', 'ТБ'];
    if (!bytes) return '0 Байт'

    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ` ${sizes[i]}`;
}