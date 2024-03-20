import { Contact } from '@/types/contact';
import axios from 'axios';

type AllContacts = {
	contacts: Contact[];
};

export const getAllContacts = async () => {
	try {
		const data = await axios.get('http://localhost:80/contacts/');
		return data.data as AllContacts;
	} catch (error) {
		console.log(`Error: `, error);
		return null;
	}
};

export const getContact = async (id: string) => {
	try {
		const data = await axios.get(`http://localhost:80/contacts/${id}`);
		return data.data as Contact;
	} catch (error) {
		console.log(`Error: `, error);
		return null;
	}
};

export const postContact = async ({
	name,
	email,
	phone,
}: {
	name: string;
	email: string;
	phone: string;
}): Promise<Contact | null> => {
	console.log(name, email, phone);
	try {
		const data = await axios.post(
			`http://localhost:80/contacts/`,
			{
				name: name,
				email: email,
				phone: phone,
			},
			{
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			}
		);
		return data.data as Contact;
	} catch (error) {
		console.log(`Error: `, error);
		return null;
	}
};

export const deleteContact = async (id: string) => {
	try {
		const data = await axios.delete(`http://localhost:80/contacts/${id}`);
		return data.data as Contact;
	} catch (error) {
		console.log(`Error: `, error);
		return null;
	}
};
