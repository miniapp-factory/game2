# ALWAYS FOLLOW THE FOLLOWING INSTRUCTIONS

- You will be editing this [nextjs](./nextjs.md) [farcaster](./farcaster.md) mini app template that uses [shadcn](./shadcn.md) components with [tailwind](./tailwind.md).
- Create and reuse components as much as possible.
- Use existing components such as [Share](../mini-app/components/share.tsx) and those in the [UI folder](../mini-app/components/ui) when possible, never alter their functionality.
- The shadcn components in [this folder](../mini-app/components/ui) should only be edited when asked to change the design of the entire app.
- Use shadcn component, such as [Button](../mini-app/components/ui/button.tsx), over their html counterparts.
- Do not use client hooks such as useState and useEffect in page files, move this functionality into a "use client" component.
- Every page should export [generateMetadata](../mini-app/lib/farcaster-embed).
- To change color (theme) globally for the website, use the [Tailwind configuration file](../mini-app/app/globals.css).
- There is no need add any files to the chat that currently do not exist (will be created by you).
- You can generate images to include in the website, to do so create a file in the [public folder](../mini-app/public/) with a `.png.todo` containing the size (`${width}x${height}`) on the first line and a precise description of the image to generate on the second line, which an artist can use without knowing anything about the app. Describe the image extensively in terms of commonly understood terms, do not assume any knowledge of famous entities. Always describe what the background should look like, a transparent background is not possible. Include this in the app with src `/${file name}.png`. You can read the image information of any .png file in the [public folder](../mini-app/public/) by reading `/${file name}.png.done`.

# EXTRA IMPORTANT INSTRUCTIONS

- ALWAYS include the [url](../mini-app/lib/metadata.ts) into the string for the share components `text` property.
- ALWAYS add the new functionality to the [home page](../mini-app/app/page.tsx).
- ALWAYS ensure that the [title and description](../mini-app/lib/metadata.ts) represent the current functionality of the app.
- ALWAYS use the [app metadata](../mini-app/lib/metadata.ts) to generate an app icon by writing to the [icon image generation file](../mini-app/public/icon.png.todo).
- ALWAYS perform the request to the best of your abilities and commit something, do not wait for answers to follow up questions.

## Image generation example

You are asked to generate an image of Donald Trump.
Write to file `../mini-app/public/donald-trump.png.todo` using the provided edit format:

mini-app/public/donald-trump.png.todo

```
<<<<<<< SEARCH
=======
512x512
A confident older man with a distinctive swept-back blond hairstyle, wearing a dark blue suit, white dress shirt, and a bright red tie. He has a tanned complexion, a stern expression, and is standing at a podium with American flags in the background. The setting is dramatic, with strong lighting emphasizing his face and posture, evoking a sense of authority and political presence.
>>>>>>> REPLACE
```

In the app import this image as

```
<img className="size-[512px]" src="/donald-trump.png" alt="icon" width={512} height={512} />
```

If you need to know what an image represents, you can read `../mini-app/public/donald-trump.png.done`, which contains the original todo instructions used to generate the image.
