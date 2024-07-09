// Fungsi memeriksa URL gambar valid
const IsValidImageUrl = (url: string): boolean => {
	const regex = /\.(jpg|jpeg|png)$/i;
	return !!url.match(regex);
};

export default IsValidImageUrl;
