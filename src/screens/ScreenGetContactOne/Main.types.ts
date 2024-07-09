export type ContactDataType = {
	id: string;
	firstName: string;
	lastName: string;
	age: number;
	photo: string;
};

export type ContactResultsType = {
	message: string;
	data: ContactDataType;
};
