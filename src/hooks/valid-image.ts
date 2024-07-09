// Fungsi memeriksa URL gambar valid
const IsValidImageUrl = (url: string): boolean => {
	return url?.startsWith("http");
};

export default IsValidImageUrl;
