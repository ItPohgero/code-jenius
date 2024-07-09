export type ContactDataType = {
	id: string;
	firstName: string;
	lastName: string;
	age: number;
	photo: string;
};

export type ContactResultsType = {
	message: "Get contacts";
	data: ContactDataType[];
};

export type GroupedContacts = {
	[key: string]: ContactDataType[];
};
