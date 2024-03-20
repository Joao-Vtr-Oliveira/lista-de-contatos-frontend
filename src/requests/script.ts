import { Contact } from '@/types/contact';

export type AllContacts = {
	contacts: Contact[];
};

export const getAllContacts = async () => {
	try {
		const response = await fetch('http://localhost:80/contacts/', {
			next: {
				revalidate: 5,
			}
		});
		const data = await response.json();
		return data as AllContacts;
	} catch (error) {
		console.log(`Error: `, error);
		return null;
	}
};

export const getContact = async (id: string) => {
	try {
		const response = await fetch(`http://localhost:80/contacts/${id}`);
		const data = await response.json();
		return data as Contact;
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
	try {
		const formData = new URLSearchParams();
		formData.append('name', name);
		formData.append('email', email);
		formData.append('phone', phone);

		const response = await fetch('http://localhost:80/contacts/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: formData,
		});

		const data = await response.json();
		return data as Contact;
	} catch (error) {
		console.log(`Error: `, error);
		return null;
	}
};


export const deleteContact = async (id: string) => {
	try {
		const response = await fetch(`http://localhost:80/contacts/${id}`, {
			method: 'DELETE',
		});
		const data = await response.json();
		return data as Contact;
	} catch (error) {
		console.log(`Error: `, error);
		return null;
	}
};
