import 'react-notion-x/src/styles.css';
import Image from 'next/image';
import { NotionAPI } from 'notion-client';
import { Collection, CollectionRow, NotionRenderer } from 'react-notion-x';

const notion = new NotionAPI();

/**
 * Component with function to redirect to discord server https://discord.gg/X4YcTCNJFU
 * @param {Object} props
 * @return {JSX}
 */
export default function Home({ recordMap }) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      components={{
        image: ({
          src,
          alt,

          height,
          width,

          className,
          style,
          loading,
          decoding,
          
          ref,
          onLoad
        }) => (
          <Image
            className={className}
            style={style}
            src={src}
            ref={ref}
            width={width}
            height={height}
            loading='lazy'
            alt={alt}
            decoding='async'
          />
        ),
        collection: Collection,
        collectionRow: CollectionRow
      }}
    />
  );
}

/**
 * Get the data from Notion
 * @return {Object}
 */
export async function getStaticProps() {
  const pageId = 'Larven-Hackathon-4ebb468c7ca44a6c815ca77ab4979d7c';
  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
  };
}
