HOW TO ADD A PROJECT
====================

1. Create a new folder in this "projects" directory. The folder name is just
   for you — prefix it with a number to control the order on the page:

       src/projects/01-my-project/
       src/projects/02-another/

2. Drop your IMAGES into that folder (any of: jpg, jpeg, png, webp, avif, gif, svg).
   - The image named "cover.*" is used as the card thumbnail.
   - If there's no "cover", the first image (alphabetical) is used.
   - CLICKING the card opens the project's own page, showing every image in
     the folder. The page URL comes from the folder name without the number:
     "01-my-project" → /projects/my-project
     Each picture is captioned with its file name (e.g. "dashboard-view.png"
     shows as "Dashboard View"), so name your files how you want them labelled.

3. Add ONE text file named  info.txt  (or info.md) with the details.
   Format — a few "key: value" lines, then a blank line, then the description:

       title: My Project
       category: Web App
       year: 2025
       tags: React, Node, Tailwind
       live: https://myproject.com
       code: https://github.com/me/myproject
       featured: true

       A short description of the project. Everything after the blank
       line becomes the card text — write as much as you like.

   Every field is optional:
     • title     — falls back to the folder name if missing
     • category  — small label above the title (default "Project")
     • year      — badge on the thumbnail
     • tags      — comma-separated chips
     • live      — "live demo" link (omit to hide the button)
     • code      — "source code" link (omit to hide the button)
     • featured  — true/false; shows a "★ Featured" badge
     • accent    — hex colour for the card glow, e.g. accent: #22d3ee

That's it. Save, and the project appears automatically — no code to edit.
(While `npm run dev` is running it hot-reloads; otherwise run `npm run build`.)

You can delete the two "example-*" folders once you've added your own.
