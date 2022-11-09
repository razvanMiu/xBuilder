import config from 'xBuilder/registry';

export default function Header(props: any) {
  const HeaderComponent = config.getComponent('header')?.component || null;

  return <HeaderComponent {...props} />;
}
