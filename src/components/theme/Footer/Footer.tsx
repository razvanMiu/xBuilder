'use client';
import config from 'xBuilder/registry';

export default function Footer(props: any) {
  const FooterComponent = config.getComponent('footer')?.component || null;

  return <FooterComponent {...props} />;
}
