import Head from "next/head";

export default function HeadTag(){
    return (
      <Head>
        <title>Nextjs App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Next.js and Mantine App with Typescript"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
    );
}
