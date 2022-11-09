import { useEffect } from 'react';
import { useStore } from 'xBuilder/store';

export default function UpdateStore(props: { content: any }) {
  const setContentData = useStore((state) => state.content.setContentData);
  const _content = useStore((state) => state.content.data);
  const { content } = props;

  useEffect(() => {
    if (_content?.['@id'] !== content?.['@id']) {
      setContentData(content);
    }
  }, [_content, content, setContentData]);

  return null;
}
