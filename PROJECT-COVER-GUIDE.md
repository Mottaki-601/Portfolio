# Project cover: designer লাগবে না

এই portfolio-তে কোনো banner বাধ্যতামূলক নয়। প্রতিটি project-এর preview HTML/CSS দিয়ে তৈরি হয়, তাই নতুন project যোগ করলেও cover design না বানিয়েও সুন্দর card দেখাবে।

## নিজের app-এর screenshot দেখাতে চাইলে

1. আপনার web app-এর একটি পরিষ্কার screenshot নিন—browser toolbar বাদ দিলে ভালো দেখায়। 1200px বা তার বেশি width ভালো।
2. `assets/project-images/` folder-এ রাখুন।
3. existing project-এর জন্য নাম দিন:
   - `nexora-suite.jpg`
   - `tour-management.jpg`
   - `restaurant-management.jpg`
4. একই screenshot-এর জন্য আলাদা banner/Photoshop design দরকার নেই। site নিজে screenshot-টিকে একই 16:9 frame-এ crop করবে, তাই সব card-এর width, height, rounded corner ও border এক থাকবে।
5. PNG/WebP-ও ব্যবহার করতে পারবেন। extension বদলালে `index.html`-এর ওই project-এর `data-cover-src` path-টিও বদলাতে হবে।

Screenshot না থাকলে project-এর generated preview-ই থাকবে; broken image দেখা যাবে না।

## নতুন project যোগ করতে

`index.html`-এ `.projects-grid`-এর মধ্যে একটি `<article class="project-card reveal">...</article>` copy করুন। এরপর project title, category, description, technology tags, Live Demo URL এবং নিজের verified GitHub repository URL পরিবর্তন করুন। ছবির জন্য `data-cover-src="assets/project-images/job-portal.jpg"` ব্যবহার করুন। ছবি না থাকলেও card থাকবে, তবে generated artwork-এর style class আলাদা করে সেট করতে চাইলে `style.css`-এ `.visual-job-portal` যোগ করুন।

## Color palette পরিবর্তন

Navbar-এর **Theme** বাটন থেকে Midnight Mint, Ocean Blue, Electric Violet অথবা Light Studio বেছে দেখা যাবে। নির্বাচিত theme সেই browser-এ মনে রাখা হয়। সবার জন্য default theme পাল্টাতে `index.html`-এর শুরুতে `<html lang="en" data-theme="midnight">`-এর `midnight` বদলে `ocean`, `violet` বা `studio` লিখুন।
