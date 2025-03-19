
import React from 'react';
import { PortableText } from '@/lib/sanity';

interface ArticleContentProps {
  content: any;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  return (
    <article className="prose prose-slate max-w-none [&_a]:text-primary [&_a]:no-underline hover:[&_a]:text-primary/80 [&_ol]:pl-5 [&_ul]:pl-5 [&_li]:mb-2">
      {typeof content === 'object' ? (
        <PortableText value={content} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </article>
  );
};

export default ArticleContent;
