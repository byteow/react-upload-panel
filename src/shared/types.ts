export interface Image {
    id: number;
    file: File;
    source?: string | null | ArrayBuffer;
    isUploading?: boolean;
    bytesTransferredPercentage?: number;
    fileLink?: string;
}