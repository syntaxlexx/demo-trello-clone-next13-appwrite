import { storage } from "@/appwrite";
import { Image } from "@/types";

const getUrl = async (image: Image) => {
    const url = storage.getFilePreview(image.bucketId, image.fileId)
    return url;
}

export default getUrl
