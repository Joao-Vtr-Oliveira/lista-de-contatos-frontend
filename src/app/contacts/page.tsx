import ContactsPage from '@/components/contactsPage';

export default async function Home() {
	
	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24'>
			<ContactsPage />
		</main>
	);
}
