
import React from 'react';
import { PortableText } from '@/lib/sanity';

interface ArticleContentProps {
  content: any;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  return (
    <article className="prose prose-slate max-w-none [&_a]:text-[#0EA5E9] [&_a]:no-underline hover:[&_a]:text-[#0EA5E9]/80">
      {typeof content === 'object' ? (
        <PortableText value={content} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </article>
  );
};

export default ArticleContent;
