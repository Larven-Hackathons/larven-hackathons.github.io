import 'react-notion-x/src/styles.css';
import Image from 'next/image';
import { getPageTitle, getAllPagesInSpace } from 'notion-utils'
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
export async function getStaticProps(context) {
  const pageId = context.params.pageId;
  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
  };
}


export async function getStaticPaths() {
  // if (isDev) {
  //   return {
  //     paths: [],
  //     fallback: true
  //   }
  // }

  const rootNotionPageId = 'Larven-Hackathon-4ebb468c7ca44a6c815ca77ab4979d7c'
  const rootNotionSpaceId = 'larven'

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const pages = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage.bind(notion),
    {
      traverseCollections: false
    }
  )

  const paths = Object.keys(pages).map((pageId) => `/${pageId}`)

  return {
    paths,
    fallback: true
  }
}