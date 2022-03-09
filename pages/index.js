import 'react-notion-x/src/styles.css';
import { NotionAPI } from 'notion-client';
import { NotionRenderer } from 'react-notion-x';

/**
 * Component with function to redirect to discord server https://discord.gg/X4YcTCNJFU
 * @param {Object} props
 * @return {JSX}
 */
export default function Home({ recordMap }) {
  return (
    <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
  );
}

/**
 * Get the data from Notion
 * @return {Object}
 */
export async function getStaticProps() {
  const notion = new NotionAPI();

  const recordMap = await notion.getPage('Larven-Hackathon-4ebb468c7ca44a6c815ca77ab4979d7c');

  return {
    props: {
      recordMap,
    },
  };
}
