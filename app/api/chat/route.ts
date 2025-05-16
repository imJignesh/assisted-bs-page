import { google } from "@ai-sdk/google";
import { jsonSchema, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export const runtime = "edge";

export async function POST(req: Request) {
  // Parse the request body
  const { messages } = await req.json();

  const system = `You are my bootstrap UI generator. You will use bootstrap 5 and fontawesome icons to make me a ui that i want.
I'll ask you to create html sections as needed. You will make adjustment only using bootstrap classes.
I'll provide you content with UI instruction and you will provide me only section HTML as HTML response.

you will use bootstrap standard practice to generate me sections. section will have outer section with id = name of the section. then a container to center align the content. and then use rows and columns or flexboxes to generate the design.

css node will create CSS that will use non bootstrap elements with custom class. class naming should be in bem method. and custom CSS should follow the same rule and provide CSS output in CSS node of the response. use bootstrap classes to generate the HTML structure first then add custom classes to add CSS to it.

js node will use js from bootstrap CSS to trigger any specific UI triggers. use elements from the section itself to generate the UI script in this node of the response.

give me standard html boutput with cdn bootstrap links, css in the head and js in the body. when needed images can be used from https://picsum.photos/


The output must be 2 parts first part a json string and second non json plain text string :
- json: containing the complete HTML code with Bootstrap and FontAwesome, including <html>, <head> with styles, and <body> with script tags if needed. Must be properly escaped to be valid JSON.
- string: A plain string message that describes what has been created in friendly, helpful language.

example:
user: Create 3 card alayout.
Assistant:
json: {html:{"<html>...</html>"}}
Created a responsive card layout.

user: Create a hero slider.
Assistant:
json: {html:{"<html>...</html>"}}
Created a hero slider.
`;

  // Create a message ID for tracking (you may want to use a more robust ID generation)
  const messageId = Date.now().toString();

  // Create the streamText response with the Gemini model
  const result = streamText({
    model: google("gemini-2.0-flash-lite"),
    messages,
    system,

    onFinish: (message) => {
      // Log the completed message

      try {
        // Log the message to your endpoint
        fetch(process.env.PHP_URL, {
          // fetch("http://localhost:808/ai/logs/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages, response: message.text }),
        }).catch((err) => {
          console.error("Failed to log messages:", err);
        });
      } catch (err) {
        console.error("Error processing message:", err);
      }
    },
  });

  return result.toDataStreamResponse();
}
