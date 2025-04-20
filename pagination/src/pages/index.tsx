import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HomePagination() {
const router = useRouter();
useEffect(() => {
router.replace('/users/1');
}, [router]);
return null;
}