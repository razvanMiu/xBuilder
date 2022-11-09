import { NextPageContext } from 'next';

export declare type ErrorProps = {
  statusCode: number | undefined;
  title?: string;
};

function Error({ statusCode, title }: ErrorProps) {
  return (
    <>
      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">
        <b>{statusCode}</b> | {title}
      </h1>
    </>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
