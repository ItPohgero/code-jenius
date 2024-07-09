// Fungsi mendapatkan avatar berupa inisial
const GetInitialAvatar = (firstName: string, lastName: string): string => {
	const initials = (firstName[0] || "") + (lastName[0] || "");
	return initials?.toUpperCase();
};

export default GetInitialAvatar;
