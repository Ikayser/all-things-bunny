'use client';

import { useState, useEffect, useRef } from 'react';

// ==================== DATA ====================
const bunnyJokes = [
  { setup: "What do you call a bunny with a large brain?", punchline: "An egghead!" },
  { setup: "Why did the bunny cross the road?", punchline: "Because the chicken had his Easter eggs!" },
  { setup: "What do you call a rabbit that tells jokes?", punchline: "A funny bunny!" },
  { setup: "How do rabbits travel?", punchline: "By hare-plane!" },
  { setup: "What do you get when you cross a rabbit with a spider?", punchline: "A hare net!" },
  { setup: "Why are rabbits so lucky?", punchline: "They have four rabbit's feet!" },
  { setup: "What do you call a line of rabbits walking backwards?", punchline: "A receding hare-line!" },
  { setup: "What's a rabbit's favorite dance?", punchline: "The bunny hop!" },
  { setup: "How do you catch a unique rabbit?", punchline: "Unique up on it!" },
  { setup: "What do rabbits say before they eat?", punchline: "Lettuce pray!" },
  { setup: "Why did the rabbit go to the salon?", punchline: "It was having a bad hare day!" },
  { setup: "What do you call a rabbit who is angry over getting burnt?", punchline: "A hot cross bunny!" },
  { setup: "What do you call a transformer bunny?", punchline: "Hop-timus Prime!" },
  { setup: "Why don't rabbits get hot in summer?", punchline: "They have hare conditioning!" },
];

const famousBunnies = [
  {
    name: "Peter Rabbit",
    origin: "The Tale of Peter Rabbit (1893)",
    creator: "Beatrix Potter",
    story: "Peter Rabbit is the mischievous young rabbit who disobeys his mother and sneaks into Mr. McGregor's garden. Despite losing his blue jacket and shoes, Peter became one of literature's most beloved characters, appearing in numerous books and adaptations.",
    legacy: "Peter Rabbit has been featured in books, films, TV shows, and merchandise for over 120 years, making him one of the most recognizable fictional rabbits in history.",
    image: "🐰"
  },
  {
    name: "Bugs Bunny",
    origin: "A Wild Hare (1940)",
    creator: "Tex Avery / Warner Bros.",
    story: "The wise-cracking, carrot-munching rabbit from Brooklyn became the mascot of Warner Bros. Known for his catchphrase 'What's up, Doc?' and his clever ways of outsmarting hunters like Elmer Fudd.",
    legacy: "Bugs Bunny is considered one of the most important cartoon characters in animation history, appearing in over 160 theatrical shorts and numerous films.",
    image: "🥕"
  },
  {
    name: "The Velveteen Rabbit",
    origin: "The Velveteen Rabbit (1922)",
    creator: "Margery Williams",
    story: "A stuffed rabbit who becomes real through the love of a young boy. The story explores themes of love, loss, and what it truly means to be 'real.' The rabbit's transformation comes after being discarded but saved by the Nursery Magic Fairy.",
    legacy: "This beloved children's classic has been adapted into numerous plays, films, and television specials, touching hearts with its message about love making things real.",
    image: "💕"
  },
  {
    name: "Thumper",
    origin: "Bambi (1942)",
    creator: "Walt Disney",
    story: "Thumper is Bambi's rabbit friend known for his habit of thumping his left hind foot and his memorable advice: 'If you can't say something nice, don't say nothing at all.' He helps teach Bambi about the forest.",
    legacy: "Thumper became so popular that he almost had his own spin-off film. He remains one of Disney's most beloved animal sidekicks.",
    image: "🦶"
  },
  {
    name: "The White Rabbit",
    origin: "Alice's Adventures in Wonderland (1865)",
    creator: "Lewis Carroll",
    story: "The perpetually late White Rabbit leads Alice down the rabbit hole into Wonderland. Always checking his pocket watch and muttering 'I'm late!', he serves as the catalyst for Alice's entire adventure.",
    legacy: "The White Rabbit has become a cultural symbol representing the entrance to fantastical worlds and the passage into the unknown.",
    image: "⏰"
  },
  {
    name: "Br'er Rabbit",
    origin: "African-American Folklore",
    creator: "Traditional / Joel Chandler Harris",
    story: "A trickster rabbit from African-American folklore who uses his wits to outsmart larger and more powerful animals. His most famous tale involves tricking Br'er Fox with a tar baby and escaping to the briar patch.",
    legacy: "Br'er Rabbit stories have roots in African folklore and became part of American storytelling tradition, influencing many subsequent trickster characters.",
    image: "🎭"
  },
  {
    name: "Rabbit (Winnie the Pooh)",
    origin: "Winnie-the-Pooh (1926)",
    creator: "A.A. Milne",
    story: "The practical and sometimes bossy rabbit who lives in the Hundred Acre Wood. Known for his garden and his attempts to organize his less organized friends, Rabbit often finds himself exasperated but always loyal.",
    legacy: "Rabbit has appeared in countless Disney adaptations and remains a beloved character teaching children about friendship and patience.",
    image: "🌻"
  },
];

const literatureStories = [
  {
    title: "The Tortoise and the Hare",
    author: "Aesop",
    text: `Once upon a time, a Hare was making fun of the Tortoise for being so slow. "Do you ever get anywhere?" he asked with a mocking laugh.

"Yes," replied the Tortoise, "and I get there sooner than you think. I'll run you a race and prove it."

The Hare was much amused at the idea of running a race with the Tortoise, but for the fun of the thing he agreed. So the Fox, who had consented to act as judge, marked the distance and started the runners off.

The Hare was soon far out of sight, and to make the Tortoise feel very deeply how ridiculous it was for him to try a race with a Hare, he lay down beside the course to take a nap until the Tortoise should catch up.

The Tortoise meanwhile kept going slowly but steadily, and, after a time, passed the place where the Hare was sleeping. But the Hare slept on very peacefully; and when at last he did wake up, the Tortoise was near the goal.

The Hare now ran his swiftest, but he could not overtake the Tortoise in time.

The moral of the story: Slow and steady wins the race.`
  },
  {
    title: "The Rabbit's Bride",
    author: "Brothers Grimm",
    text: `There was once a woman who lived with her daughter in a beautiful cabbage-garden; and a rabbit came and ate up all the cabbages. So the woman said to her daughter, "Go into the garden and chase that rabbit away."

The girl said to the rabbit, "Shoo! shoo! rabbit, you are eating all our cabbages."

Said the rabbit, "Come, maiden, and sit on my tail and come with me to my hutch."

But the girl would not.

Next day the rabbit came again and ate the cabbages. Then the woman said to her daughter, "Go into the garden and chase away the rabbit."

"Shoo! shoo! rabbit," said the maiden, "you are eating all our cabbages."

The rabbit said, "Maiden, sit on my tail and come with me to my hutch."

But the maiden would not.

Again on the third day the rabbit came, and ate the cabbages. The woman said to her daughter, "Go into the garden and chase that rabbit away."

"Shoo! shoo! rabbit," said the maiden, "you are eating all our cabbages."

The rabbit said, "Maiden, sit on my tail and come to my hutch."

And then the girl seated herself on the rabbit's tail, and the rabbit took her to his hutch.

And they lived quite contentedly together.`
  },
  {
    title: "The Wonderful Tar Baby",
    author: "Joel Chandler Harris",
    text: `Brer Fox was always trying to catch Brer Rabbit, but the clever rabbit always managed to escape. One day, Brer Fox had a brilliant idea.

He mixed up some tar and turpentine, and made a shape that looked like a little baby. He set the Tar Baby in the middle of the road and hid in the bushes nearby.

By and by, along came Brer Rabbit, hippity-hoppity, as sassy as a jaybird.

"Good morning!" said Brer Rabbit to the Tar Baby. "Nice weather this morning."

The Tar Baby said nothing, and Brer Fox lay low.

"Are you deaf?" asked Brer Rabbit. "Because if you are, I can holler louder!"

The Tar Baby stayed still, and Brer Fox lay low.

"You're stuck up, that's what you are!" said Brer Rabbit. "I'll teach you manners!"

And with that, Brer Rabbit hauled off and hit the Tar Baby on the side of the head. His fist stuck fast.

"Let me go or I'll knock you again!" cried Brer Rabbit.

He swung with his other hand, and that stuck too. Then his feet got stuck, and finally his head!

Brer Fox sauntered out of the bushes, laughing fit to burst.

"I expect I got you this time, Brer Rabbit," he said.

But Brer Rabbit, even stuck in tar, was thinking fast...`
  },
];

const bunnyHabitats = [
  { name: "European Meadows", lat: 51.5, lng: -0.1, region: "Europe", species: "European Rabbit", description: "Rolling grasslands with scattered shrubs provide ideal cover and grazing.", likelihood: "Very High" },
  { name: "Australian Outback", lat: -25.3, lng: 133.8, region: "Australia", species: "European Rabbit (Introduced)", description: "Despite being introduced, rabbits thrive in Australia's diverse landscapes.", likelihood: "High" },
  { name: "North American Prairies", lat: 41.5, lng: -99.8, region: "North America", species: "Cottontail Rabbit", description: "Grasslands and brush areas across the central United States.", likelihood: "High" },
  { name: "Japanese Gardens", lat: 35.7, lng: 139.7, region: "Asia", species: "Japanese Hare", description: "Forest edges and mountain meadows across Japan.", likelihood: "Moderate" },
  { name: "South American Pampas", lat: -34.6, lng: -58.4, region: "South America", species: "Tapeti", description: "Forest rabbits in tropical and subtropical regions.", likelihood: "Moderate" },
  { name: "African Savannas", lat: -1.3, lng: 36.8, region: "Africa", species: "African Savanna Hare", description: "Open grasslands and semi-arid regions of eastern Africa.", likelihood: "Moderate" },
  { name: "Mediterranean Coast", lat: 41.4, lng: 2.2, region: "Europe", species: "European Rabbit", description: "Coastal scrublands and Mediterranean ecosystems.", likelihood: "Very High" },
  { name: "New Zealand Countryside", lat: -41.3, lng: 174.8, region: "Oceania", species: "European Rabbit (Introduced)", description: "Farmlands and grasslands throughout New Zealand.", likelihood: "High" },
];

const bunnyImages = [
  { id: 1, url: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400", caption: "Fluffy white bunny in a meadow" },
  { id: 2, url: "https://images.unsplash.com/photo-1535241749838-299c4d91d5fc?w=400", caption: "Brown rabbit with long ears" },
  { id: 3, url: "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400", caption: "Baby bunny in the grass" },
  { id: 4, url: "https://images.unsplash.com/photo-1559214369-a6b1d7919865?w=400", caption: "Curious bunny close-up" },
  { id: 5, url: "https://images.unsplash.com/photo-1612505851341-e4c3b3a7c3fc?w=400", caption: "Gray rabbit resting" },
  { id: 6, url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=bunny", caption: "Lop-eared bunny" },
  { id: 7, url: "https://images.unsplash.com/photo-1591382696684-38c427c7547a?w=400", caption: "Wild rabbit in nature" },
  { id: 8, url: "https://images.unsplash.com/photo-1573316364756-33b34fad4fcb?w=400", caption: "Adorable pet bunny" },
];

const youtubeVideos = [
  { id: "qM9YWm6T_hc", title: "Cute Baby Bunnies" },
  { id: "wE5v4PgQBk4", title: "Rabbit Care Guide" },
  { id: "D3ImvMVSskg", title: "Funny Bunny Compilation" },
  { id: "OdQDXs75Ulo", title: "Wild Rabbits Documentary" },
  { id: "t54xKDQXlb8", title: "Bunny Grooming Tips" },
  { id: "qLH7w9u_E0k", title: "Baby Bunnies Growing Up" },
  { id: "3z4QrH-K8dI", title: "Rabbit Behavior Explained" },
];

// ==================== CRAFT GENERATORS ====================
const generateColoringPage = (seed) => {
  const random = (min, max) => {
    const x = Math.sin(seed++) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
  };

  const bunnyStyle = random(0, 2);

  return `
    <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
      <style>
        .outline { fill: none; stroke: #333; stroke-width: 2; }
        .thin { fill: none; stroke: #333; stroke-width: 1; }
        text { font-family: Comic Sans MS, cursive; font-size: 14px; }
      </style>

      <text x="200" y="30" text-anchor="middle" font-size="20" font-weight="bold">Color the Bunny!</text>

      <path class="thin" d="M 20 420 Q 50 410 80 420 Q 110 410 140 420 Q 170 410 200 420 Q 230 410 260 420 Q 290 410 320 420 Q 350 410 380 420" />

      <ellipse class="outline" cx="200" cy="350" rx="80" ry="60" />
      <circle class="outline" cx="200" cy="220" r="70" />

      <ellipse class="outline" cx="150" cy="100" rx="25" ry="70" transform="rotate(-15 150 100)" />
      <ellipse class="thin" cx="150" cy="100" rx="12" ry="50" transform="rotate(-15 150 100)" />

      <ellipse class="outline" cx="250" cy="100" rx="25" ry="70" transform="rotate(15 250 100)" />
      <ellipse class="thin" cx="250" cy="100" rx="12" ry="50" transform="rotate(15 250 100)" />

      <circle class="outline" cx="170" cy="200" r="15" />
      <circle class="thin" cx="173" cy="197" r="5" />
      <circle class="outline" cx="230" cy="200" r="15" />
      <circle class="thin" cx="233" cy="197" r="5" />

      <ellipse class="outline" cx="200" cy="250" rx="12" ry="8" />
      <path class="thin" d="M 200 258 L 200 275 M 185 270 Q 200 285 215 270" />

      <line class="thin" x1="140" y1="250" x2="175" y2="255" />
      <line class="thin" x1="140" y1="260" x2="175" y2="260" />
      <line class="thin" x1="140" y1="270" x2="175" y2="265" />
      <line class="thin" x1="260" y1="250" x2="225" y2="255" />
      <line class="thin" x1="260" y1="260" x2="225" y2="260" />
      <line class="thin" x1="260" y1="270" x2="225" y2="265" />

      <ellipse class="outline" cx="160" cy="400" rx="25" ry="15" />
      <ellipse class="outline" cx="240" cy="400" rx="25" ry="15" />

      <circle class="outline" cx="280" cy="350" r="20" />

      ${bunnyStyle === 0 ? `
        <circle class="outline" cx="60" cy="380" r="8" />
        <circle class="thin" cx="60" cy="380" r="3" />
        <line class="thin" x1="60" y1="388" x2="60" y2="420" />
        <circle class="outline" cx="340" cy="370" r="10" />
        <circle class="thin" cx="340" cy="370" r="4" />
        <line class="thin" x1="340" y1="380" x2="340" y2="420" />
      ` : bunnyStyle === 1 ? `
        <path class="outline" d="M 50 400 Q 60 380 70 400 Q 80 380 90 400" />
        <path class="outline" d="M 310 390 Q 320 370 330 390 Q 340 370 350 390" />
      ` : `
        <ellipse class="outline" cx="70" cy="390" rx="15" ry="10" />
        <ellipse class="outline" cx="330" cy="385" rx="12" ry="8" />
      `}

      <path class="outline" d="M 320 440 L 360 480 L 340 450 Z" />
      <path class="thin" d="M 330 430 Q 320 420 330 410 M 340 430 Q 350 415 340 405" />

      <text x="200" y="480" text-anchor="middle" font-size="12">Print this page and color your bunny!</text>
    </svg>
  `;
};

const generateConnectDots = (seed) => {
  const points = [
    { x: 200, y: 50, n: 1 },
    { x: 180, y: 80, n: 2 },
    { x: 170, y: 120, n: 3 },
    { x: 160, y: 150, n: 4 },
    { x: 140, y: 170, n: 5 },
    { x: 130, y: 200, n: 6 },
    { x: 130, y: 240, n: 7 },
    { x: 140, y: 280, n: 8 },
    { x: 160, y: 310, n: 9 },
    { x: 200, y: 330, n: 10 },
    { x: 240, y: 310, n: 11 },
    { x: 260, y: 280, n: 12 },
    { x: 270, y: 240, n: 13 },
    { x: 270, y: 200, n: 14 },
    { x: 260, y: 170, n: 15 },
    { x: 240, y: 150, n: 16 },
    { x: 230, y: 120, n: 17 },
    { x: 220, y: 80, n: 18 },
    { x: 200, y: 50, n: 19 },
  ];

  return `
    <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
      <style>
        .dot { fill: #333; }
        .number { font-family: Arial, sans-serif; font-size: 12px; fill: #666; }
        .title { font-family: Comic Sans MS, cursive; font-size: 20px; font-weight: bold; }
        .hint { fill: none; stroke: #ddd; stroke-width: 1; stroke-dasharray: 2,2; }
      </style>

      <text x="200" y="30" text-anchor="middle" class="title">Connect the Dots - Bunny!</text>

      <path class="hint" d="M ${points.map(p => `${p.x} ${p.y + 100}`).join(' L ')}" />

      ${points.map(p => `
        <circle class="dot" cx="${p.x}" cy="${p.y + 100}" r="5" />
        <text class="number" x="${p.x + 8}" y="${p.y + 104}">${p.n}</text>
      `).join('')}

      <circle cx="170" cy="280" r="8" fill="none" stroke="#999" stroke-width="1" />
      <circle cx="230" cy="280" r="8" fill="none" stroke="#999" stroke-width="1" />
      <ellipse cx="200" cy="310" rx="8" ry="5" fill="none" stroke="#999" stroke-width="1" />

      <text x="200" y="480" text-anchor="middle" font-size="12" fill="#666">
        Connect dots 1 to 19 to reveal the bunny!
      </text>
    </svg>
  `;
};

const generateColorByNumber = (seed) => {
  return `
    <svg viewBox="0 0 400 550" xmlns="http://www.w3.org/2000/svg">
      <style>
        .outline { fill: none; stroke: #333; stroke-width: 1.5; }
        .thin { fill: none; stroke: #333; stroke-width: 1; }
        .number { font-family: Arial, sans-serif; font-size: 10px; fill: #333; }
        .title { font-family: Comic Sans MS, cursive; font-size: 18px; font-weight: bold; }
        .legend { font-family: Arial, sans-serif; font-size: 11px; }
      </style>

      <text x="200" y="25" text-anchor="middle" class="title">Color by Number - Bunny!</text>

      <rect x="20" y="40" width="15" height="15" fill="none" stroke="#333" />
      <text x="40" y="52" class="legend">1 = White</text>

      <rect x="100" y="40" width="15" height="15" fill="none" stroke="#333" />
      <text x="120" y="52" class="legend">2 = Pink</text>

      <rect x="180" y="40" width="15" height="15" fill="none" stroke="#333" />
      <text x="200" y="52" class="legend">3 = Brown</text>

      <rect x="260" y="40" width="15" height="15" fill="none" stroke="#333" />
      <text x="280" y="52" class="legend">4 = Green</text>

      <rect x="340" y="40" width="15" height="15" fill="none" stroke="#333" />
      <text x="360" y="52" class="legend">5 = Orange</text>

      <rect class="outline" x="20" y="430" width="360" height="40" />
      <text x="200" y="455" text-anchor="middle" class="number">4</text>

      <ellipse class="outline" cx="200" cy="350" rx="80" ry="55" />
      <text x="200" y="355" text-anchor="middle" class="number">1</text>

      <circle class="outline" cx="200" cy="230" r="65" />
      <text x="200" y="235" text-anchor="middle" class="number">1</text>

      <ellipse class="outline" cx="145" cy="115" rx="22" ry="60" transform="rotate(-15 145 115)" />
      <text x="145" y="100" text-anchor="middle" class="number">1</text>

      <ellipse class="outline" cx="145" cy="115" rx="10" ry="40" transform="rotate(-15 145 115)" />
      <text x="145" y="130" text-anchor="middle" class="number">2</text>

      <ellipse class="outline" cx="255" cy="115" rx="22" ry="60" transform="rotate(15 255 115)" />
      <text x="255" y="100" text-anchor="middle" class="number">1</text>

      <ellipse class="outline" cx="255" cy="115" rx="10" ry="40" transform="rotate(15 255 115)" />
      <text x="255" y="130" text-anchor="middle" class="number">2</text>

      <ellipse class="outline" cx="200" cy="260" rx="10" ry="7" />
      <text x="200" y="263" text-anchor="middle" class="number">2</text>

      <circle class="outline" cx="160" cy="250" r="15" />
      <text x="160" y="253" text-anchor="middle" class="number">2</text>
      <circle class="outline" cx="240" cy="250" r="15" />
      <text x="240" y="253" text-anchor="middle" class="number">2</text>

      <circle class="outline" cx="280" cy="350" r="18" />
      <text x="280" y="353" text-anchor="middle" class="number">1</text>

      <ellipse class="outline" cx="155" cy="395" rx="22" ry="12" />
      <text x="155" y="398" text-anchor="middle" class="number">1</text>
      <ellipse class="outline" cx="245" cy="395" rx="22" ry="12" />
      <text x="245" y="398" text-anchor="middle" class="number">1</text>

      <path class="outline" d="M 50 400 L 90 450 L 70 420 Z" />
      <text x="70" y="430" text-anchor="middle" class="number">5</text>
      <path class="outline" d="M 55 390 Q 45 380 55 370 M 65 390 Q 75 375 65 365" />
      <text x="60" y="380" text-anchor="middle" class="number">4</text>

      <text x="200" y="500" text-anchor="middle" font-size="11" fill="#666">
        Color each section using the number guide above!
      </text>
    </svg>
  `;
};

const generateOrigami = (seed) => {
  return `
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <style>
        .outline { fill: none; stroke: #333; stroke-width: 1.5; }
        .fold { fill: none; stroke: #333; stroke-width: 1; stroke-dasharray: 5,3; }
        .arrow { fill: #666; stroke: #666; stroke-width: 1; }
        .number { font-family: Arial, sans-serif; font-size: 14px; fill: #333; font-weight: bold; }
        .text { font-family: Arial, sans-serif; font-size: 11px; fill: #555; }
        .title { font-family: Comic Sans MS, cursive; font-size: 20px; font-weight: bold; }
        .step-box { fill: #f9f9f9; stroke: #ddd; stroke-width: 1; }
      </style>

      <text x="400" y="30" text-anchor="middle" class="title">🐰 Origami Bunny Instructions 🐰</text>

      <rect class="step-box" x="20" y="50" width="170" height="160" rx="5" />
      <text x="105" y="70" text-anchor="middle" class="number">1</text>
      <rect class="outline" x="50" y="85" width="80" height="80" />
      <line class="fold" x1="50" y1="85" x2="130" y2="165" />
      <path class="arrow" d="M 140 100 L 150 90 L 145 100 Z" />
      <text x="105" y="185" text-anchor="middle" class="text">Start with square.</text>
      <text x="105" y="198" text-anchor="middle" class="text">Fold diagonally.</text>

      <rect class="step-box" x="210" y="50" width="170" height="160" rx="5" />
      <text x="295" y="70" text-anchor="middle" class="number">2</text>
      <polygon class="outline" points="240,165 295,85 350,165" />
      <line class="fold" x1="267" y1="125" x2="323" y2="125" />
      <path class="arrow" d="M 295 140 L 295 110" />
      <text x="295" y="185" text-anchor="middle" class="text">Fold bottom</text>
      <text x="295" y="198" text-anchor="middle" class="text">corners up.</text>

      <rect class="step-box" x="400" y="50" width="170" height="160" rx="5" />
      <text x="485" y="70" text-anchor="middle" class="number">3</text>
      <polygon class="outline" points="425,165 485,85 545,165 485,130" />
      <line class="fold" x1="455" y1="140" x2="485" y2="100" />
      <line class="fold" x1="515" y1="140" x2="485" y2="100" />
      <text x="485" y="185" text-anchor="middle" class="text">Fold sides to</text>
      <text x="485" y="198" text-anchor="middle" class="text">center point.</text>

      <rect class="step-box" x="590" y="50" width="170" height="160" rx="5" />
      <text x="675" y="70" text-anchor="middle" class="number">4</text>
      <polygon class="outline" points="635,165 675,85 715,165" />
      <polygon class="outline" points="655,165 675,130 695,165" fill="#eee" />
      <text x="675" y="185" text-anchor="middle" class="text">Fold bottom</text>
      <text x="675" y="198" text-anchor="middle" class="text">triangle up.</text>

      <rect class="step-box" x="20" y="230" width="170" height="160" rx="5" />
      <text x="105" y="250" text-anchor="middle" class="number">5</text>
      <polygon class="outline" points="65,345 105,265 145,345" />
      <line class="fold" x1="85" y1="285" x2="85" y2="345" />
      <line class="fold" x1="125" y1="285" x2="125" y2="345" />
      <text x="105" y="365" text-anchor="middle" class="text">Create ear folds</text>
      <text x="105" y="378" text-anchor="middle" class="text">on each side.</text>

      <rect class="step-box" x="210" y="230" width="170" height="160" rx="5" />
      <text x="295" y="250" text-anchor="middle" class="number">6</text>
      <path class="outline" d="M 260,345 L 270,290 L 280,265 L 295,255 L 310,265 L 320,290 L 330,345 L 295,330 Z" />
      <ellipse class="outline" cx="280" cy="305" rx="5" ry="7" />
      <ellipse class="outline" cx="310" cy="305" rx="5" ry="7" />
      <circle class="outline" cx="295" cy="320" r="3" />
      <text x="295" y="365" text-anchor="middle" class="text">Pull ears apart</text>
      <text x="295" y="378" text-anchor="middle" class="text">and shape face.</text>

      <rect class="step-box" x="400" y="230" width="170" height="160" rx="5" />
      <text x="485" y="250" text-anchor="middle" class="number">7</text>
      <ellipse class="outline" cx="485" cy="340" rx="30" ry="20" />
      <circle class="outline" cx="485" cy="305" r="20" />
      <ellipse class="outline" cx="470" cy="275" rx="8" ry="20" />
      <ellipse class="outline" cx="500" cy="275" rx="8" ry="20" />
      <circle cx="478" cy="300" r="2" fill="#333" />
      <circle cx="492" cy="300" r="2" fill="#333" />
      <ellipse cx="485" cy="310" rx="3" ry="2" fill="#ffaaaa" />
      <circle class="outline" cx="515" cy="335" r="8" />
      <text x="485" y="375" text-anchor="middle" class="text">Your bunny</text>
      <text x="485" y="388" text-anchor="middle" class="text">is complete! 🐰</text>

      <rect class="step-box" x="590" y="230" width="170" height="160" rx="5" />
      <text x="675" y="255" text-anchor="middle" class="number">Tips</text>
      <text x="600" y="280" class="text">• Use 6" square paper</text>
      <text x="600" y="300" class="text">• Crease folds firmly</text>
      <text x="600" y="320" class="text">• Pink paper = pink</text>
      <text x="615" y="335" class="text">inner ears!</text>
      <text x="600" y="360" class="text">• Draw eyes &amp; nose</text>
      <text x="615" y="375" class="text">at the end</text>

      <text x="400" y="430" text-anchor="middle" font-size="12" fill="#666">
        Print this page and follow the steps to create your own origami bunny!
      </text>
    </svg>
  `;
};

// ==================== COMPONENTS ====================
const Navigation = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: 'joke', label: '😄 Daily Joke' },
    { id: 'famous', label: '⭐ Famous Bunnies' },
    { id: 'story', label: '📖 Stories' },
    { id: 'map', label: '🗺️ Habitat Map' },
    { id: 'gallery', label: '📸 Gallery' },
    { id: 'video', label: '🎬 Daily Video' },
    { id: 'adopt', label: '🏠 Adopt' },
    { id: 'craft', label: '✂️ Daily Craft' },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      background: 'linear-gradient(135deg, #87CEEB 0%, #FFB6C1 100%)',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      flexWrap: 'wrap',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      zIndex: 1000,
    }}>
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => {
            setActiveSection(section.id);
            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            padding: '10px 16px',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.3s ease',
            background: activeSection === section.id ? '#FFD700' : 'white',
            color: activeSection === section.id ? '#333' : '#666',
            boxShadow: activeSection === section.id
              ? '0 4px 12px rgba(255,215,0,0.4)'
              : '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
};

const Header = () => (
  <header style={{
    background: 'linear-gradient(135deg, #87CEEB 0%, #FFB6C1 50%, #FFD700 100%)',
    padding: '60px 20px',
    textAlign: 'center',
  }}>
    <h1 style={{
      fontSize: '4rem',
      margin: 0,
      color: 'white',
      textShadow: '3px 3px 6px rgba(0,0,0,0.2)',
      fontFamily: 'Comic Sans MS, cursive',
    }}>
      🐰 All Things Bunnies 🐰
    </h1>
    <p style={{
      fontSize: '1.4rem',
      color: 'white',
      marginTop: '15px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
    }}>
      Your daily dose of bunny joy, facts, and fun!
    </p>
  </header>
);

const SectionTitle = ({ children, emoji }) => (
  <h2 style={{
    fontSize: '2.2rem',
    color: '#333',
    marginBottom: '25px',
    textAlign: 'center',
    fontFamily: 'Comic Sans MS, cursive',
  }}>
    {emoji} {children} {emoji}
  </h2>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    ...style,
  }}>
    {children}
  </div>
);

const JokeSection = () => {
  const [revealed, setRevealed] = useState(false);
  const [dayOfYear, setDayOfYear] = useState(0);

  useEffect(() => {
    setDayOfYear(Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000));
  }, []);

  const joke = bunnyJokes[dayOfYear % bunnyJokes.length];

  return (
    <section id="joke" style={{ padding: '60px 20px', background: '#FFF9E6' }}>
      <SectionTitle emoji="😄">Daily Bunny Joke</SectionTitle>
      <Card style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '1.5rem', color: '#333', marginBottom: '25px' }}>
          {joke.setup}
        </p>
        {revealed ? (
          <p style={{
            fontSize: '1.8rem',
            color: '#FFB6C1',
            fontWeight: 'bold',
            animation: 'fadeIn 0.5s ease',
          }}>
            {joke.punchline}
          </p>
        ) : (
          <button
            onClick={() => setRevealed(true)}
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              border: 'none',
              padding: '15px 40px',
              borderRadius: '30px',
              fontSize: '1.2rem',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(255,215,0,0.4)',
              transition: 'transform 0.2s ease',
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            🥁 Reveal Punchline!
          </button>
        )}
        <p style={{ marginTop: '20px', color: '#888', fontSize: '0.9rem' }}>
          Come back tomorrow for a new joke!
        </p>
      </Card>
    </section>
  );
};

const FamousBunnySection = () => {
  const [weekOfYear, setWeekOfYear] = useState(0);

  useEffect(() => {
    setWeekOfYear(Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / (7 * 86400000)));
  }, []);

  const bunny = famousBunnies[weekOfYear % famousBunnies.length];

  return (
    <section id="famous" style={{ padding: '60px 20px', background: '#E6F3FF' }}>
      <SectionTitle emoji="⭐">Famous Bunny of the Week</SectionTitle>
      <Card style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '5rem' }}>{bunny.image}</span>
          <h3 style={{ fontSize: '2rem', color: '#87CEEB', margin: '15px 0 5px' }}>
            {bunny.name}
          </h3>
          <p style={{ color: '#888', fontStyle: 'italic' }}>
            {bunny.origin} • Created by {bunny.creator}
          </p>
        </div>
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '20px'
        }}>
          <h4 style={{ color: '#333', marginBottom: '10px' }}>📜 The Story</h4>
          <p style={{ color: '#555', lineHeight: '1.7' }}>{bunny.story}</p>
        </div>
        <div style={{
          background: '#FFE4E1',
          padding: '20px',
          borderRadius: '15px'
        }}>
          <h4 style={{ color: '#333', marginBottom: '10px' }}>🌟 Legacy</h4>
          <p style={{ color: '#555', lineHeight: '1.7' }}>{bunny.legacy}</p>
        </div>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '0.9rem' }}>
          New famous bunny every week!
        </p>
      </Card>
    </section>
  );
};

const StorySection = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const utteranceRef = useRef(null);

  const story = literatureStories[currentStory];

  const toggleNarration = () => {
    if (typeof window === 'undefined') return;

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      utteranceRef.current = new SpeechSynthesisUtterance(story.text);
      utteranceRef.current.rate = 0.9;
      utteranceRef.current.onend = () => setIsReading(false);
      window.speechSynthesis.speak(utteranceRef.current);
      setIsReading(true);
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentStory]);

  return (
    <section id="story" style={{ padding: '60px 20px', background: '#FFF0F5' }}>
      <SectionTitle emoji="📖">Classic Bunny Tales</SectionTitle>
      <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '25px',
          flexWrap: 'wrap'
        }}>
          {literatureStories.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentStory(i);
                if (typeof window !== 'undefined') {
                  window.speechSynthesis.cancel();
                }
                setIsReading(false);
              }}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '20px',
                background: currentStory === i ? '#FFB6C1' : '#f0f0f0',
                color: currentStory === i ? 'white' : '#666',
                cursor: 'pointer',
                fontWeight: currentStory === i ? 'bold' : 'normal',
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#333' }}>{story.title}</h3>
          <p style={{ color: '#888', fontStyle: 'italic' }}>by {story.author}</p>
          <button
            onClick={toggleNarration}
            style={{
              marginTop: '15px',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '25px',
              background: isReading
                ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)'
                : 'linear-gradient(135deg, #87CEEB 0%, #5BA3C0 100%)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            }}
          >
            {isReading ? '⏹️ Stop Narration' : '🔊 Listen to Story'}
          </button>
        </div>

        <div style={{
          background: '#fafafa',
          padding: '30px',
          borderRadius: '15px',
          maxHeight: '400px',
          overflowY: 'auto',
        }}>
          <p style={{
            color: '#444',
            lineHeight: '2',
            fontSize: '1.1rem',
            whiteSpace: 'pre-wrap'
          }}>
            {story.text}
          </p>
        </div>
      </Card>
    </section>
  );
};

const MapSection = () => {
  const [selectedHabitat, setSelectedHabitat] = useState(null);

  return (
    <section id="map" style={{ padding: '60px 20px', background: '#E8F5E9' }}>
      <SectionTitle emoji="🗺️">Global Bunny Habitats</SectionTitle>
      <Card style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '25px' }}>
          Click on a region to learn about bunny habitats around the world!
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px',
          marginBottom: '25px'
        }}>
          {bunnyHabitats.map((habitat, i) => (
            <div
              key={i}
              onClick={() => setSelectedHabitat(habitat)}
              style={{
                padding: '20px',
                background: selectedHabitat === habitat
                  ? 'linear-gradient(135deg, #87CEEB 0%, #5BA3C0 100%)'
                  : '#f8f9fa',
                borderRadius: '15px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: selectedHabitat === habitat ? 'none' : '2px solid transparent',
              }}
              onMouseOver={(e) => {
                if (selectedHabitat !== habitat) {
                  e.currentTarget.style.border = '2px solid #87CEEB';
                }
              }}
              onMouseOut={(e) => {
                if (selectedHabitat !== habitat) {
                  e.currentTarget.style.border = '2px solid transparent';
                }
              }}
            >
              <h4 style={{
                color: selectedHabitat === habitat ? 'white' : '#333',
                marginBottom: '5px'
              }}>
                📍 {habitat.name}
              </h4>
              <p style={{
                color: selectedHabitat === habitat ? 'rgba(255,255,255,0.9)' : '#666',
                fontSize: '0.9rem',
                margin: 0
              }}>
                {habitat.region} • {habitat.species}
              </p>
              <span style={{
                display: 'inline-block',
                marginTop: '8px',
                padding: '4px 12px',
                borderRadius: '15px',
                fontSize: '0.8rem',
                background: selectedHabitat === habitat ? 'rgba(255,255,255,0.2)' : '#FFD700',
                color: selectedHabitat === habitat ? 'white' : '#333',
              }}>
                {habitat.likelihood} chance
              </span>
            </div>
          ))}
        </div>

        {selectedHabitat && (
          <div style={{
            background: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
            padding: '25px',
            borderRadius: '15px',
            color: 'white',
            animation: 'fadeIn 0.3s ease',
          }}>
            <h3 style={{ marginBottom: '15px' }}>🐰 {selectedHabitat.name}</h3>
            <p style={{ marginBottom: '10px' }}>
              <strong>Species:</strong> {selectedHabitat.species}
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Description:</strong> {selectedHabitat.description}
            </p>
            <p>
              <strong>Likelihood of spotting:</strong> {selectedHabitat.likelihood}
            </p>
          </div>
        )}
      </Card>
    </section>
  );
};

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" style={{ padding: '60px 20px', background: '#FFF9E6' }}>
      <SectionTitle emoji="📸">Bunny Picture Gallery</SectionTitle>
      <Card style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '15px',
        }}>
          {bunnyImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              style={{
                borderRadius: '15px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={img.url}
                alt={img.caption}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #FFB6C1 0%, #87CEEB 100%)';
                  e.target.style.display = 'flex';
                  e.target.alt = '🐰';
                }}
              />
              <p style={{
                padding: '10px',
                margin: 0,
                background: '#f8f9fa',
                fontSize: '0.85rem',
                color: '#666',
                textAlign: 'center',
              }}>
                {img.caption}
              </p>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              zIndex: 2000,
              cursor: 'pointer',
            }}
          >
            <img
              src={selectedImage.url.replace('w=400', 'w=800')}
              alt={selectedImage.caption}
              style={{
                maxWidth: '90%',
                maxHeight: '80vh',
                borderRadius: '15px',
              }}
            />
            <p style={{ color: 'white', marginTop: '20px', fontSize: '1.2rem' }}>
              {selectedImage.caption}
            </p>
            <p style={{ color: '#888', marginTop: '10px' }}>
              Click anywhere to close
            </p>
          </div>
        )}
      </Card>
    </section>
  );
};

const VideoSection = () => {
  const [dayOfYear, setDayOfYear] = useState(0);

  useEffect(() => {
    setDayOfYear(Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000));
  }, []);

  const video = youtubeVideos[dayOfYear % youtubeVideos.length];

  return (
    <section id="video" style={{ padding: '60px 20px', background: '#E6F3FF' }}>
      <SectionTitle emoji="🎬">Daily Bunny Video</SectionTitle>
      <Card style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{ color: '#333', marginBottom: '20px' }}>{video.title}</h3>
        <div style={{
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        </div>
        <p style={{ marginTop: '20px', color: '#888', fontSize: '0.9rem' }}>
          New video every day! Come back tomorrow for more bunny content! 🐰
        </p>
      </Card>
    </section>
  );
};

const AdoptSection = () => {
  const [zipCode, setZipCode] = useState('');

  const searchAdoption = () => {
    if (zipCode.length >= 5 && typeof window !== 'undefined') {
      window.open(`https://www.petfinder.com/search/rabbits-for-adoption/us/?location=${zipCode}`, '_blank');
    }
  };

  return (
    <section id="adopt" style={{ padding: '60px 20px', background: '#FFF0F5' }}>
      <SectionTitle emoji="🏠">Find a Bunny to Adopt</SectionTitle>
      <Card style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ color: '#666', marginBottom: '25px', fontSize: '1.1rem' }}>
          Give a bunny a loving home! Enter your zip code to find adoptable rabbits near you.
        </p>

        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '25px'
        }}>
          <input
            type="text"
            placeholder="Enter your ZIP code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
            style={{
              padding: '15px 25px',
              fontSize: '1.1rem',
              border: '2px solid #FFB6C1',
              borderRadius: '30px',
              outline: 'none',
              width: '200px',
              textAlign: 'center',
            }}
            onKeyPress={(e) => e.key === 'Enter' && searchAdoption()}
          />
          <button
            onClick={searchAdoption}
            disabled={zipCode.length < 5}
            style={{
              padding: '15px 35px',
              background: zipCode.length >= 5
                ? 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)'
                : '#ddd',
              border: 'none',
              borderRadius: '30px',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: zipCode.length >= 5 ? 'pointer' : 'not-allowed',
              boxShadow: zipCode.length >= 5 ? '0 4px 15px rgba(255,105,180,0.4)' : 'none',
            }}
          >
            🔍 Search
          </button>
        </div>

        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '15px',
        }}>
          <h4 style={{ color: '#333', marginBottom: '15px' }}>🐰 Before You Adopt</h4>
          <ul style={{
            textAlign: 'left',
            color: '#666',
            lineHeight: '1.8',
            paddingLeft: '20px'
          }}>
            <li>Rabbits can live 8-12 years - they&apos;re a long-term commitment!</li>
            <li>They need at least 4 hours of exercise outside their enclosure daily</li>
            <li>A proper diet is 80% hay, plus fresh vegetables and limited pellets</li>
            <li>Regular vet check-ups with a rabbit-savvy veterinarian are essential</li>
            <li>Consider adopting in pairs - bunnies are social animals!</li>
          </ul>
        </div>

        <div style={{ marginTop: '25px' }}>
          <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '15px' }}>
            Other resources for bunny adoption:
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://rabbit.org/adoption-listings/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 20px',
                background: '#87CEEB',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '20px',
                fontSize: '0.9rem',
              }}
            >
              House Rabbit Society
            </a>
            <a
              href="https://www.adoptapet.com/rabbit-adoption"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 20px',
                background: '#FFD700',
                color: '#333',
                textDecoration: 'none',
                borderRadius: '20px',
                fontSize: '0.9rem',
              }}
            >
              Adopt-a-Pet
            </a>
          </div>
        </div>
      </Card>
    </section>
  );
};

const CraftSection = () => {
  const [dayOfYear, setDayOfYear] = useState(0);
  const craftTypes = ['coloring', 'connect', 'colorByNumber', 'origami'];
  const [craftType, setCraftType] = useState('coloring');

  useEffect(() => {
    const day = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    setDayOfYear(day);
    setCraftType(craftTypes[day % craftTypes.length]);
  }, []);

  const crafts = {
    coloring: {
      name: 'Coloring Page',
      emoji: '🎨',
      svg: generateColoringPage(dayOfYear)
    },
    connect: {
      name: 'Connect the Dots',
      emoji: '✏️',
      svg: generateConnectDots(dayOfYear)
    },
    colorByNumber: {
      name: 'Color by Number',
      emoji: '🔢',
      svg: generateColorByNumber(dayOfYear)
    },
    origami: {
      name: 'Origami Pattern',
      emoji: '📄',
      svg: generateOrigami(dayOfYear)
    },
  };

  const printCraft = () => {
    if (typeof window === 'undefined') return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bunny ${crafts[craftType].name}</title>
          <style>
            body { margin: 0; padding: 20px; display: flex; justify-content: center; }
            svg { max-width: 100%; height: auto; }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${crafts[craftType].svg}
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const currentCraftType = craftTypes[dayOfYear % craftTypes.length];

  return (
    <section id="craft" style={{ padding: '60px 20px', background: '#E8F5E9' }}>
      <SectionTitle emoji="✂️">Daily Bunny Craft</SectionTitle>
      <Card style={{ maxWidth: '850px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '25px',
          flexWrap: 'wrap'
        }}>
          {Object.entries(crafts).map(([key, craft]) => (
            <button
              key={key}
              onClick={() => setCraftType(key)}
              style={{
                padding: '12px 20px',
                border: 'none',
                borderRadius: '25px',
                background: craftType === key
                  ? 'linear-gradient(135deg, #87CEEB 0%, #5BA3C0 100%)'
                  : '#f0f0f0',
                color: craftType === key ? 'white' : '#666',
                cursor: 'pointer',
                fontWeight: craftType === key ? 'bold' : 'normal',
                fontSize: '1rem',
              }}
            >
              {craft.emoji} {craft.name}
            </button>
          ))}
        </div>

        <div style={{
          background: 'white',
          border: '2px dashed #ddd',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '25px',
        }}>
          <div
            dangerouslySetInnerHTML={{ __html: crafts[craftType].svg }}
            style={{
              maxWidth: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={printCraft}
            style={{
              padding: '15px 40px',
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              border: 'none',
              borderRadius: '30px',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(255,215,0,0.4)',
            }}
          >
            🖨️ Print This Craft!
          </button>
          <p style={{ marginTop: '15px', color: '#888', fontSize: '0.9rem' }}>
            Today&apos;s featured craft: {crafts[currentCraftType]?.emoji} {crafts[currentCraftType]?.name}
          </p>
        </div>
      </Card>
    </section>
  );
};

const Footer = () => (
  <footer style={{
    background: 'linear-gradient(135deg, #333 0%, #555 100%)',
    padding: '40px 20px',
    textAlign: 'center',
    color: 'white',
  }}>
    <p style={{ fontSize: '2rem', marginBottom: '15px' }}>🐰</p>
    <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
      Made with 💕 for bunny lovers everywhere
    </p>
    <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
      © {new Date().getFullYear()} All Things Bunnies
    </p>
  </footer>
);

// ==================== MAIN APP ====================
export default function Home() {
  const [activeSection, setActiveSection] = useState('joke');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['joke', 'famous', 'story', 'map', 'gallery', 'video', 'adopt', 'craft'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <JokeSection />
      <FamousBunnySection />
      <StorySection />
      <MapSection />
      <GallerySection />
      <VideoSection />
      <AdoptSection />
      <CraftSection />
      <Footer />
    </>
  );
}
