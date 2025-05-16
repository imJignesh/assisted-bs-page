import { makeAssistantToolUI } from "@assistant-ui/react";

type WebSearchArgs = {
  query: string;
};

type WebSearchResult = {
  title: string;
  description: string;
  url: string;
};

const web_search = async (args: WebSearchArgs): Promise<WebSearchResult[]> => {
  const response = await fetch(
    `https://api.example.com/search?q=${encodeURIComponent(args.query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  const data = await response.json();
  return data.results.map((result: any) => ({
    title: result.title,
    description: result.description,
    url: result.url,
  }));
};

export const WebSearchToolUI = makeAssistantToolUI<
  WebSearchArgs,
  WebSearchResult
>({
  toolName: "web_search",
  render: ({ args, status }) => {
    return <p>web_search({args.query})</p>;
  },
});
