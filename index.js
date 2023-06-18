import fs from "node:fs";
import { faker } from "@faker-js/faker";

function html(texts) {
  const css = `
        main {
            margin: auto;
            max-width: 960px;
        }

        section {
            content-visibility: auto;
            contain-intrinsic-size: 1000px;
        }
    `;

  const markup = texts.map(
    ({ paragraphs, title, images }) => `
  <section>
    <h1>${title}</h1>
    <div>
        ${images.map(
          (image) => `<img height="400" width="400" src="${image}" />`
        )}
    </div>
    <p>${paragraphs}</p>
  </section>`
  );

  return `    
        <!DOCTYPE html>
        <html>
        <head>
            <title>My HTML Template</title>
        </head>
        <body>
            <style>
                ${css}
            </style>
            <main>
                ${markup}
            </main>
        </body>
        </html>
    `;
}

const sectionsCount = 20;

const texts = Array.from({ length: sectionsCount }).map((_) => ({
  paragraphs: faker.lorem.paragraphs(faker.number.int(200, 300)),
  title: faker.lorem.words({ min: 3, max: 5 }),
  images: Array.from({ length: faker.number.int({ min: 3, max: 5 }) }).map(
    (_) => "https://picsum.photos/400"
  ),
}));

fs.writeFileSync("./index.html", html(texts));
