# Mottaki Billah — Full Stack Developer Portfolio

A responsive, static portfolio built with HTML, CSS and vanilla JavaScript. No npm install, build tool, or framework is required.

## Run locally
1. Extract the ZIP.
2. (Optional) Put your portrait at `assets/profile.jpg`.
3. Open `index.html` in a browser, or open the folder in VS Code and use Live Server.

## Edit content
- `index.html`: name, intro, skills, projects, links and contact details.
- `style.css`: layout, font sizes, spacing and color themes.
- `script.js`: theme switching, mobile navigation, typing text and reveal animations.

## Change colors without editing code
Use the **Theme** control in the navigation and choose Midnight Mint, Ocean Blue, Electric Violet, or Light Studio. The selected palette is saved in the current browser using localStorage. It only changes this visitor's browser; the site's default palette is `midnight` in the `<html data-theme="midnight">` attribute in `index.html`.

## Project previews — no graphic designer needed
The default previews are created with HTML and CSS, so each project has a polished matching visual without requiring a banner or cover image.

To show a real project screenshot, save it in `assets/project-images/` using these paths:
- `nexora-suite.jpg`
- `tour-management.jpg`
- `restaurant-management.jpg`

The site detects these files automatically. They can be screenshots of different sizes; each is framed in the same 16:9 slot and cropped consistently. For other file extensions, update the matching `data-cover-src` attribute in `index.html`. Screenshots are optional; without one, the generated visual stays in place.

## Add a new project
1. Copy one `<article class="project-card reveal">...</article>` inside `.projects-grid` in `index.html`.
2. Change the project number, category, name, subtitle, description, tags, demo URL and repository URL.
3. Change the cover wrapper to use a new identifier, for example `data-cover-src="assets/project-images/job-portal.jpg"` and `data-project="job-portal"`.
4. To keep generated artwork while no image exists, add a matching background class such as `.visual-job-portal` in `style.css` and use the existing visual markup as a base. If you prefer not to write a new visual, use a screenshot and the same CSS frame.
5. Never add a repository URL unless it actually points to your own repository. Use your GitHub profile until the project repository is public or ready to share.

## Publish on GitHub Pages
Upload the files and `assets/` folder to the root of your repository. In GitHub, open Settings → Pages and select the branch and root folder where these files live. Wait until GitHub Pages finishes deployment, then open the published URL.

## Notes
- The selected theme is persisted in the browser that selected it; the HTML default controls the initial theme for new visitors.
- The actual project repositories and demo links are retained where available. The Restaurant project's GitHub button currently links to the profile because its dedicated repository URL has not been provided/confirmed.
- `assets/profile.jpg` is optional; initials show automatically if the file is absent.
