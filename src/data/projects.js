// ============================================================================
//  PROJECTS — folder based. You don't edit this file.
//
//  To add a project, create a folder in:   src/projects/<your-project>/
//  and drop into it:
//    • any images        →  cover.jpg, shot-1.png, shot-2.png ...
//    • one details file   →  info.txt   (or info.md)
//
//  Everything in that folder is picked up automatically. The first image
//  (or one named "cover.*") becomes the card thumbnail; the rest are kept
//  in `images` for a gallery. See src/projects/README.txt for the format.
//
//  Tip: prefix folders with a number to control order — 01-nimbus, 02-lumen…
// ============================================================================

// Eagerly pull every details file and image out of every project folder.
const detailFiles = import.meta.glob("../projects/*/*.{txt,md}", {
  query: "?raw",
  import: "default",
  eager: true,
});
const imageFiles = import.meta.glob(
  "../projects/*/*.{png,jpg,jpeg,webp,avif,gif,svg}",
  {
    import: "default",
    eager: true,
  },
);

const META_KEYS = new Set([
  "title",
  "category",
  "year",
  "tags",
  "live",
  "code",
  "featured",
  "accent",
]);

// Pull "/projects/<folder>/file" → "<folder>"
const folderOf = (path) => (path.match(/\/projects\/([^/]+)\//) || [])[1] || "";

// Strip an optional leading "01-" ordering prefix and prettify for a fallback title.
const prettyTitle = (folder) =>
  folder
    .replace(/^\d+[-_.\s]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

// URL name for the project page: the folder without its ordering prefix,
// "01-kavo-store" → "kavo-store"  →  /projects/kavo-store
const slugOf = (folder) =>
  folder
    .replace(/^\d+[-_.\s]*/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || folder;

const isTruthy = (v) => /^(true|yes|1|on)$/i.test((v || "").trim());

// "/projects/foo/home-page.png" → "Home Page" (filename, no extension, prettified)
const imageName = (path) =>
  (path.split("/").pop() || "")
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

// Parse a details file: leading `key: value` lines are metadata, everything
// after the metadata block is the description (blurb).
function parseDetails(raw) {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const meta = {};
  let i = 0;
  for (; i < lines.length; i++) {
    const m = lines[i].match(/^\s*([a-zA-Z]+)\s*:\s*(.*)$/);
    if (m && META_KEYS.has(m[1].toLowerCase())) {
      meta[m[1].toLowerCase()] = m[2].trim();
    } else if (lines[i].trim() === "") {
      // a blank line ends the metadata block; description follows
      i++;
      break;
    } else {
      // first non-metadata, non-blank line starts the description
      break;
    }
  }
  const blurb = lines.slice(i).join("\n").trim();
  return { meta, blurb };
}

// Group images by their folder, cover first.
const imagesByFolder = {};
for (const path of Object.keys(imageFiles).sort()) {
  const folder = folderOf(path);
  if (!folder) continue;
  (imagesByFolder[folder] ||= []).push({ path, url: imageFiles[path] });
}
for (const folder of Object.keys(imagesByFolder)) {
  imagesByFolder[folder].sort((a, b) => {
    const ac = /(^|\/)cover\./i.test(a.path) ? 0 : 1;
    const bc = /(^|\/)cover\./i.test(b.path) ? 0 : 1;
    return ac - bc || a.path.localeCompare(b.path);
  });
}

// Build one project per folder, ordered by folder name.
const folders = [...new Set(Object.keys(detailFiles).map(folderOf))].sort();

export const projects = folders.map((folder, idx) => {
  const detailPath = Object.keys(detailFiles).find(
    (p) => folderOf(p) === folder,
  );
  const { meta, blurb } =
    detailPath ?
      parseDetails(detailFiles[detailPath])
    : { meta: {}, blurb: "" };

  const images = (imagesByFolder[folder] || []).map((img) => ({
    url: img.url,
    name: imageName(img.path),
  }));

  return {
    id: folder,
    slug: slugOf(folder),
    title: meta.title || prettyTitle(folder),
    category: meta.category || "Project",
    year: meta.year || "",
    blurb,
    tags:
      meta.tags ?
        meta.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
    accent: meta.accent || "#a3e635",
    live: meta.live || "",
    code: meta.code || "",
    featured: isTruthy(meta.featured) || idx === 0,
    images,
    cover: images[0]?.url || "",
  };
});

export const categories = ["All", ...new Set(projects.map((p) => p.category))];
