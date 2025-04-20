import { GetStaticPaths, GetStaticProps} from "next";
import Link from "next/link";
import Image from "next/image";

type User = {
id: number;
firstName: string;
lastName: string;
email: string;
image: string;
};

type Props = {
users: User[];
page: number;
totalPages: number;
};

const PostsPage = ({ users, page, totalPages }: Props) => {
return (
<div className="max-w-2xl mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Users - Page {page}</h1>
    <h1 className="text-2xl font-bold mb-4">📚 Paginated Posts (SSG)</h1>
    <ul className="space-y-3">
        {users.map((user) => (
        <li key={user.id} className="border p-3 rounded flex items-center gap-4">
            <Image
              src={user.image}
              width={50}
              height={50}
              alt={user.image}
              className="w-10 h-10 rounded-full"
            />
            <div>
                <p className="font-semibold">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
            </div>
        </li>
        ))}
    </ul>

    <div style={{ marginTop: "2rem" }}>
        {page > 1 && (
        <Link href={`/users/${page - 1}`}>
        <button style={{ marginRight: "1rem" }}>Previous</button>
        </Link>
        )}

        <span>
            Page {page} of {totalPages}
        </span>

        {page < totalPages && ( <Link href={`/users/${page + 1}`}>
            <button style={{ marginLeft: "1rem" }}>Next</button>
            </Link>
            )}
    </div>
</div>
);
};

export default PostsPage;


export const getStaticProps: GetStaticProps = async (context) => {
const page = parseInt((context.params?.page as string) || '1');
const limit = 5;
const skip = (page - 1) * limit;

const res = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
const data = await res.json();

return {
props: {
users: data.users,
page,
totalPages: Math.ceil((data.total / 2 - 4) / limit),
},
revalidate: 20, // optional: re-generate page every 20 seconds
};
};



export const getStaticPaths: GetStaticPaths = async () => {
const limit = 5;

// Initial fetch to get total number of users
const res = await fetch(`https://dummyjson.com/users?limit=1&skip=0`);
const data = await res.json();
const totalPages = Math.ceil(data.total / limit);

const paths = Array.from({ length: totalPages }, (_, i) => ({
params: { page: (i + 1).toString() },
}));

return {
paths,
fallback: 'blocking', // can also be 'true' or 'false'
};
};