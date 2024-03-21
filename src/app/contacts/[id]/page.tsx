import EditContact from '@/components/editContact';
import { PageParams } from '@/types/pageParams';

const EditContactPage = ({ params }: PageParams) => {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center'>
			<EditContact params={params} />
		</main>
	);
};

export default EditContactPage;
