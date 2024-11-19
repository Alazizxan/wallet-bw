import axios from "axios";

export default async function getFileLink(fileId) {
    const response = await axios.get(`https://api.telegram.org/bot${import.meta.env.VITE_API_BOT_TOKEN}/getFile?file_id=${fileId}`);
    return `https://api.telegram.org/file/bot${import.meta.env.VITE_API_BOT_TOKEN}/${response.data.result.file_path}`;
}
