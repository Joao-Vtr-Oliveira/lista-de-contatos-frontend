'use client';

import { revalidatePathAction } from '@/actions/realidate-path';
import { getContact, putContact } from '@/requests/script';
import { UniqueContact } from '@/types/contact';
import { PageParams } from '@/types/pageParams';
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
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditContact({ params }: PageParams) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [data, setData] = useState<UniqueContact | null>();
	const [changeInfo, setChangeInfo] = useState<Boolean | 'error'>(false);

	const { push } = useRouter();

	const getData = async () => {
		try {
			const contactsData = await getContact(params.id);
			console.log(contactsData);
			setData(contactsData);
			return contactsData;
		} catch (error) {
			console.log('Error: ', error);
			setChangeInfo('error');
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const handleEditBtn = async () => {
		const id = params.id;
		const editedContact = await putContact({ id, name, email, phone });
		revalidatePathAction('/contacts');
		push('/contacts');
		console.log(editedContact);
	};

	if (!data && changeInfo === 'error') {
		return <h1>Internal Error</h1>;
	} else if (!data && changeInfo === false) {
		return <h1>Loading</h1>;
	}

	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24'>
			<Card
				maxW='4xl'
				w='full'
				borderWidth='1px'
				borderRadius='lg'
				boxShadow='lg'
			>
				<CardHeader textAlign='center' bg='teal.500' py={4}>
					<Heading as='h1' size='xl' color='white'>
						{data && <Link href='/contacts'>{data.contact.name}</Link>}
					</Heading>
				</CardHeader>
				<CardBody textAlign='center' p={4}>
					<Input
						flex='1'
						mb={{ base: 10, sm: 10 }}
						mr={{ base: 0, sm: 2 }}
						placeholder={data?.contact.name}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						flex='1'
						type='email'
						mb={{ base: 10, sm: 10 }}
						mr={{ base: 0, sm: 2 }}
						placeholder={data?.contact.email}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						flex='1'
						type='number'
						mb={{ base: 10, sm: 10 }}
						mr={{ base: 0, sm: 2 }}
						placeholder={data?.contact.phone}
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</CardBody>
				<CardFooter justify='center' p={4} bg='teal.500'>
					<Button onClick={handleEditBtn} colorScheme='whiteAlpha'>
						Edit Contact
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
