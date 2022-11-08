import { cookies } from 'next/headers';
import Api from 'xBuilder/helpers/Api/Api';
import UpdateContent from 'xBuilder/store/content/UpdateContent';

export default async function Page({ params }: { params: { document?: [] } }) {
  const nextCookies = cookies();

  const api = new Api(nextCookies);

  const properties = await api.get(`/${params.document?.join('/') || ''}`);

  return (
    <>
      <UpdateContent properties={properties} />
      <div className="container mx-auto">
        <h1 className="font-semibold">View</h1>
        <p className="font-thin">Thin text</p>
        <p className="font-extralight">Extra light</p>
        <p className="font-light">Light</p>
        <p className="font-normal">Normal</p>
        <p className="font-medium">Medium</p>
        <p className="font-semibold">Semibold</p>
        <p className="font-bold">Bold</p>
        <p className="font-extrabold">Extra bold</p>
        <p className="font-black">Black</p>
      </div>
    </>
  );
}
