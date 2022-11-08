import 'xBuilder/styles/globals.css';
import 'xBuilder/config';

import { cookies } from 'next/headers';
import Footer from 'xBuilder/components/theme/Footer/Footer';
import Header from 'xBuilder/components/theme/Header/Header';
import RefreshToken from 'xBuilder/components/theme/RefreshToken/RefreshToken';
import Registry from 'xBuilder/components/theme/Registry/Registry';
import Api from 'xBuilder/helpers/Api/Api';
import { StoreProvider } from 'xBuilder/store/StoreProvider';

// import { getProfile } from 'xBuilder/store/user';

export default async function RootLayout({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  let profile = null;
  const nextCookies = cookies();
  const auth_token = nextCookies.get('auth_token')?.value;

  const api = new Api(nextCookies);

  // if (auth_token) {
  //   try {
  //     profile = await getProfile(nextCookies);
  //   } catch {}
  // }

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>xBuilder</title>
        <meta name="description" content="xBuilder CMS" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </head>
      <body className="flex flex-col flex-1 h-full">
        <Registry />
        <StoreProvider
          {...props}
          initialState={{
            user: { profile, auth_token },
          }}
        >
          <RefreshToken />
          <Header />
          <div className="main flex-1">{children}</div>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
