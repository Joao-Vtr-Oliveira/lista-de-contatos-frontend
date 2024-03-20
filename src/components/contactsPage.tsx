import { getAllContacts } from '@/requests/script';
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

export default async function ContactsPage() {
	const data = await getAllContacts();
	console.log(data);

	if (!data) {
		return <h1>Internal Error</h1>;
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
								<Button size='sm' colorScheme='red'>
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
