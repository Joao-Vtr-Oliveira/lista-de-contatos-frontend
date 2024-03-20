'use client';

import { revalidatePathAction } from '@/actions/realidate-path';
import { AllContacts, deleteContact, getAllContacts } from '@/requests/script';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	Input,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ContactsPage() {
	const [data, setData] = useState<AllContacts | null>();
	const [changeInfo, setChangeInfo] = useState<Boolean | 'error'>(false);
	
	const getData = async () => {
		try {
			const contactsData = await getAllContacts();
			setData(contactsData);
			return contactsData;
		} catch(error) {
			setChangeInfo('error');
		}
	}

	useEffect(() => {
		getData();
	}, [changeInfo])

	if (!data && changeInfo === 'error') {
		return <h1>Internal Error</h1>;
	} else if(!data && changeInfo === false) {
		return <h1>Loading</h1>
	}

	const handleDeleteBtn = async (id: string) => {
		setChangeInfo(true);
		await deleteContact(id);
		revalidatePathAction('/contacts');
		setChangeInfo(false);
	}

	return (
		<Card
			maxW='4xl'
			w='full'
			borderWidth='1px'
			borderRadius='lg'
			boxShadow='lg'
		>
			<CardHeader textAlign='center' bg='teal.500' py={4}>
				<Heading as='h1' size='xl' color='white'>
					Contacts
				</Heading>
			</CardHeader>
			<CardBody textAlign='center' p={4}>
				<ul>
					{data &&
						data.contacts.map((contact) => (
							<li key={contact.id} className='p-4'>
								<p className='text-lg font-semibold'>{contact.name}</p>
								<p className='text-gray-600'>{contact.email}</p>
								<p className='text-gray-600'>{contact.phone}</p>
								<Button size='sm' colorScheme='teal' mr={2}>
									Edit
								</Button>
								<Button size='sm' onClick={() => handleDeleteBtn(String(contact.id))} colorScheme='red'>
									Delete
								</Button>
							</li>
						))}
				</ul>
			</CardBody>
			<CardFooter justify='center' p={4} bg='teal.500'>
				<Button colorScheme='whiteAlpha'>
					<Link href='/contacts/new'>New Contact</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
