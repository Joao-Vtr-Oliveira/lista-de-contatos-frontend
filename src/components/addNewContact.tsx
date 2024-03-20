'use client';

import { postContact } from '@/requests/script';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	Input,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewContact() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	const { push } = useRouter();

	const handleAddBtn = async () => {
		console.log(name, email, phone);
		const newContact = await postContact({ name, email, phone });
    push('/contacts');
		console.log(newContact);
	};

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
						New Contact
					</Heading>
				</CardHeader>
				<CardBody textAlign='center' p={4}>
					<Input
						flex='1'
						mb={{ base: 10, sm: 10 }}
						mr={{ base: 0, sm: 2 }}
						placeholder='Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						flex='1'
						type='email'
						mb={{ base: 10, sm: 10 }}
						mr={{ base: 0, sm: 2 }}
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						flex='1'
						type='number'
						mb={{ base: 10, sm: 10 }}
						mr={{ base: 0, sm: 2 }}
						placeholder='Phone'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</CardBody>
				<CardFooter justify='center' p={4} bg='teal.500'>
					<Button onClick={handleAddBtn} colorScheme='whiteAlpha'>
						Add new contact
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
