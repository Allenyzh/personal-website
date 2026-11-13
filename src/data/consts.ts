// Site-wide and personal constants. Components import from here instead of
// hard-coding names, links or copy. Work history lives in src/content/experience.

export const SITE_TITLE = "Zhenhao Yang's portfolio";
export const SITE_DESCRIPTION =
  "Welcome to my portfolio website! I'm Zhenhao Yang, a passionate full-stack developer dedicated to crafting seamless web experiences. Explore my projects, skills, and journey in the world of web development.";

export const MY_NAME = "Zhenhao Yang";

// Hero positioning line. Keep the exact phrase "full-stack engineer" out of it:
// the job title is rendered next to it and e2e expects that text once per page.
export const MY_TAGLINE =
  "I build full-stack web products and AI-powered tools.";

export const MY_ABOUT = [
  "I work across the stack — React, Vue and Astro on the front, Node.js, Java and Cloudflare Workers behind it — and more of what I ship now has a model in the loop: an MCP server, a Gemini chat app, a browser agent that files taxes.",
  "I came to engineering from graphic and UI/UX design, so I care about how software looks and reads as much as how it runs.",
];

export const MY_BACKGROUND = {
  from: "Design",
  to: "Engineering",
  note: "graphic & UI/UX design first",
};

export const MY_AI_TOOLKIT = {
  items: ["MCP", "Gemini API", "browser agents"],
  note: "used in CLI MCP, AI Chat, TaxAgentServer",
};

export const MY_TIMEZONE = "Eastern Time";

export const MY_EMAIL = "work@mail.allenyzh.com";
export const MY_GITHUB = "https://github.com/Allenyzh";
export const MY_LINKEDIN = "https://www.linkedin.com/in/allenyzh/";
