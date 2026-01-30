'use client';

import { useState, useEffect, useRef } from 'react';

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
  { name: "Peter Rabbit", origin: "The Tale of Peter Rabbit (1893)", creator: "Beatrix Potter", story: "Peter Rabbit is the mischievous young rabbit who disobeys his mother and sneaks into Mr. McGregor's garden. Despite losing his blue jacket and shoes, Peter became one of literature's most beloved characters.", legacy: "Peter Rabbit has been featured in books, films, TV shows, and merchandise for over 120 years.", image: "🐰" },
  { name: "Bugs Bunny", origin: "A Wild Hare (1940)", creator: "Tex Avery / Warner Bros.", story: "The wise-cracking, carrot-munching rabbit from Brooklyn became the mascot of Warner Bros. Known for his catchphrase 'What's up, Doc?' and his clever ways of outsmarting hunters.", legacy: "Bugs Bunny is considered one of the most important cartoon characters in animation history.", image: "🥕" },
  { name: "The Velveteen Rabbit", origin: "The Velveteen Rabbit (1922)", creator: "Margery Williams", story: "A stuffed rabbit who becomes real through the love of a young boy. The story explores themes of love, loss, and what it truly means to be 'real.'", legacy: "This beloved children's classic has touched hearts with its message about love making things real.", image: "💕" },
  { name: "Thumper", origin: "Bambi (1942)", creator: "Walt Disney", story: "Thumper is Bambi's rabbit friend known for his habit of thumping his left hind foot and his memorable advice about saying nice things.", legacy: "Thumper remains one of Disney's most beloved animal sidekicks.", image: "🦶" },
  { name: "The White Rabbit", origin: "Alice's Adventures in Wonderland (1865)", creator: "Lewis Carroll", story: "The perpetually late White Rabbit leads Alice down the rabbit hole into Wonderland. Always checking his pocket watch and muttering 'I'm late!'", legacy: "The White Rabbit has become a cultural symbol representing the entrance to fantastical worlds.", image: "⏰" },
];

const literatureStories = [
  { title: "The Tortoise and the Hare", author: "Aesop", text: `Once upon a time, a Hare was making fun of the Tortoise for being so slow. "Do you ever get anywhere?" he asked with a mocking laugh.\n\n"Yes," replied the Tortoise, "and I get there sooner than you think. I'll run you a race and prove it."\n\nThe Hare was much amused at the idea of running a race with the Tortoise, but for the fun of the thing he agreed. So the Fox, who had consented to act as judge, marked the distance and started the runners off.\n\nThe Hare was soon far out of sight, and to make the Tortoise feel very deeply how ridiculous it was for him to try a race with a Hare, he lay down beside the course to take a nap until the Tortoise should catch up.\n\nThe Tortoise meanwhile kept going slowly but steadily, and, after a time, passed the place where the Hare was sleeping. But the Hare slept on very peacefully; and when at last he did wake up, the Tortoise was near the goal.\n\nThe Hare now ran his swiftest, but he could not overtake the Tortoise in time.\n\nThe moral of the story: Slow and steady wins the race.` },
  { title: "The Rabbit's Bride", author: "Brothers Grimm", text: `There was once a woman who lived with her daughter in a beautiful cabbage-garden; and a rabbit came and ate up all the cabbages. So the woman said to her daughter, "Go into the garden and chase that rabbit away."\n\nThe girl said to the rabbit, "Shoo! shoo! rabbit, you are eating all our cabbages."\n\nSaid the rabbit, "Come, maiden, and sit on my tail and come with me to my hutch."\n\nBut the girl would not.\n\nNext day the rabbit came again and ate the cabbages. Then the woman said to her daughter, "Go into the garden and chase away the rabbit."\n\n"Shoo! shoo! rabbit," said the maiden, "you are eating all our cabbages."\n\nThe rabbit said, "Maiden, sit on my tail and come with me to my hutch."\n\nBut the maiden would not.\n\nAgain on the third day the rabbit came, and ate the cabbages. The woman said to her daughter, "Go into the garden and chase that rabbit away."\n\n"Shoo! shoo! rabbit," said the maiden, "you are eating all our cabbages."\n\nThe rabbit said, "Maiden, sit on my tail and come to my hutch."\n\nAnd then the girl seated herself on the rabbit's tail, and the rabbit took her to his hutch.\n\nAnd they lived quite contentedly together.` },
];

const bunnyHabitats = [
  { name: "European Meadows", region: "Europe", species: "European Rabbit", description: "Rolling grasslands with scattered shrubs provide ideal cover and grazing.", likelihood: "Very High" },
  { name: "Australian Outback", region: "Australia", species: "European Rabbit (Introduced)", description: "Despite being introduced, rabbits thrive in Australia's diverse landscapes.", likelihood: "High" },
  { name: "North American Prairies", region: "North America", species: "Cottontail Rabbit", description: "Grasslands and brush areas across the central United States.", likelihood: "High" },
  { name: "Japanese Gardens", region: "Asia", species: "Japanese Hare", description: "Forest edges and mountain meadows across Japan.", likelihood: "Moderate" },
  { name: "Mediterranean Coast", region: "Europe", species: "European Rabbit", description: "Coastal scrublands and Mediterranean ecosystems.", likelihood: "Very High" },
  { name: "New Zealand Countryside", region: "Oceania", species: "European Rabbit (Introduced)", description: "Farmlands and grasslands throughout New Zealand.", likelihood: "High" },
];

const bunnyImages = [
  { id: 1, url: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400", caption: "Fluffy white bunny" },
  { id: 2, url: "https://images.unsplash.com/photo-1535241749838-299c4d91d5fc?w=400", caption: "Brown rabbit" },
  { id: 3, url: "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400", caption: "Baby bunny" },
  { id: 4, url: "https://images.unsplash.com/photo-1559214369-a6b1d7919865?w=400", caption: "Curious bunny" },
  { id: 5, url: "https://images.unsplash.com/photo-1612505851341-e4c3b3a7c3fc?w=400", caption: "Gray rabbit" },
  { id: 6, url: "https://images.unsplash.com/photo-1591382696684-38c427c7547a?w=400", caption: "Wild rabbit" },
];

const youtubeVideos = [
  { id: "qM9YWm6T_hc", title: "Cute Baby Bunnies" },
  { id: "wE5v4PgQBk4", title: "Rabbit Care Guide" },
  { id: "D3ImvMVSskg", title: "Funny Bunny Compilation" },
  { id: "OdQDXs75Ulo", title: "Wild Rabbits Documentary" },
  { id: "t54xKDQXlb8", title: "Bunny Grooming Tips" },
];

const generateColoringPage = (seed) => {
  return `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
    <style>.outline{fill:none;stroke:#333;stroke-width:2}.thin{fill:none;stroke:#333;stroke-width:1}</style>
    <text x="200" y="30" text-anchor="middle" font-size="20" font-weight="bold" font-family="Comic Sans MS">Color the Bunny!</text>
    <path class="thin" d="M20 420Q50 410 80 420Q110 410 140 420Q170 410 200 420Q230 410 260 420Q290 410 320 420Q350 410 380 420"/>
    <ellipse class="outline" cx="200" cy="350" rx="80" ry="60"/>
    <circle class="outline" cx="200" cy="220" r="70"/>
    <ellipse class="outline" cx="150" cy="100" rx="25" ry="70" transform="rotate(-15 150 100)"/>
    <ellipse class="thin" cx="150" cy="100" rx="12" ry="50" transform="rotate(-15 150 100)"/>
    <ellipse class="outline" cx="250" cy="100" rx="25" ry="70" transform="rotate(15 250 100)"/>
    <ellipse class="thin" cx="250" cy="100" rx="12" ry="50" transform="rotate(15 250 100)"/>
    <circle class="outline" cx="170" cy="200" r="15"/>
    <circle class="thin" cx="173" cy="197" r="5"/>
    <circle class="outline" cx="230" cy="200" r="15"/>
    <circle class="thin" cx="233" cy="197" r="5"/>
    <ellipse class="outline" cx="200" cy="250" rx="12" ry="8"/>
    <path class="thin" d="M200 258L200 275M185 270Q200 285 215 270"/>
    <line class="thin" x1="140" y1="250" x2="175" y2="255"/>
    <line class="thin" x1="140" y1="260" x2="175" y2="260"/>
    <line class="thin" x1="260" y1="250" x2="225" y2="255"/>
    <line class="thin" x1="260" y1="260" x2="225" y2="260"/>
    <ellipse class="outline" cx="160" cy="400" rx="25" ry="15"/>
    <ellipse class="outline" cx="240" cy="400" rx="25" ry="15"/>
    <circle class="outline" cx="280" cy="350" r="20"/>
    <path class="outline" d="M320 440L360 480L340 450Z"/>
    <text x="200" y="480" text-anchor="middle" font-size="12">Print and color your bunny!</text>
  </svg>`;
};

const generateConnectDots = () => {
  const points = [
    {x:200,y:150,n:1},{x:180,y:180,n:2},{x:170,y:220,n:3},{x:160,y:250,n:4},{x:140,y:270,n:5},
    {x:130,y:300,n:6},{x:130,y:340,n:7},{x:140,y:380,n:8},{x:160,y:410,n:9},{x:200,y:430,n:10},
    {x:240,y:410,n:11},{x:260,y:380,n:12},{x:270,y:340,n:13},{x:270,y:300,n:14},{x:260,y:270,n:15},
    {x:240,y:250,n:16},{x:230,y:220,n:17},{x:220,y:180,n:18},{x:200,y:150,n:19}
  ];
  return `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
    <text x="200" y="30" text-anchor="middle" font-size="20" font-weight="bold" font-family="Comic Sans MS">Connect the Dots!</text>
    <path d="M${points.map(p=>`${p.x} ${p.y}`).join(' L ')}" fill="none" stroke="#ddd" stroke-width="1" stroke-dasharray="2,2"/>
    ${points.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="5" fill="#333"/><text x="${p.x+8}" y="${p.y+4}" font-size="12" fill="#666">${p.n}</text>`).join('')}
    <circle cx="170" cy="280" r="8" fill="none" stroke="#999"/>
    <circle cx="230" cy="280" r="8" fill="none" stroke="#999"/>
    <text x="200" y="480" text-anchor="middle" font-size="12" fill="#666">Connect 1-19 to reveal the bunny!</text>
  </svg>`;
};

const generateColorByNumber = () => {
  return `<svg viewBox="0 0 400 550" xmlns="http://www.w3.org/2000/svg">
    <style>.o{fill:none;stroke:#333;stroke-width:1.5}.n{font-family:Arial;font-size:10px;fill:#333}</style>
    <text x="200" y="25" text-anchor="middle" font-size="18" font-weight="bold" font-family="Comic Sans MS">Color by Number!</text>
    <rect x="20" y="40" width="15" height="15" fill="none" stroke="#333"/><text x="40" y="52" font-size="11">1=White</text>
    <rect x="110" y="40" width="15" height="15" fill="none" stroke="#333"/><text x="130" y="52" font-size="11">2=Pink</text>
    <rect x="200" y="40" width="15" height="15" fill="none" stroke="#333"/><text x="220" y="52" font-size="11">3=Green</text>
    <rect x="290" y="40" width="15" height="15" fill="none" stroke="#333"/><text x="310" y="52" font-size="11">4=Orange</text>
    <rect class="o" x="20" y="430" width="360" height="40"/><text x="200" y="455" text-anchor="middle" class="n">3</text>
    <ellipse class="o" cx="200" cy="350" rx="80" ry="55"/><text x="200" y="355" text-anchor="middle" class="n">1</text>
    <circle class="o" cx="200" cy="230" r="65"/><text x="200" y="235" text-anchor="middle" class="n">1</text>
    <ellipse class="o" cx="145" cy="115" rx="22" ry="60" transform="rotate(-15 145 115)"/><text x="145" y="100" text-anchor="middle" class="n">1</text>
    <ellipse class="o" cx="145" cy="115" rx="10" ry="40" transform="rotate(-15 145 115)"/><text x="145" y="130" text-anchor="middle" class="n">2</text>
    <ellipse class="o" cx="255" cy="115" rx="22" ry="60" transform="rotate(15 255 115)"/><text x="255" y="100" text-anchor="middle" class="n">1</text>
    <ellipse class="o" cx="255" cy="115" rx="10" ry="40" transform="rotate(15 255 115)"/><text x="255" y="130" text-anchor="middle" class="n">2</text>
    <ellipse class="o" cx="200" cy="260" rx="10" ry="7"/><text x="200" y="263" text-anchor="middle" class="n">2</text>
    <circle class="o" cx="280" cy="350" r="18"/><text x="280" y="353" text-anchor="middle" class="n">1</text>
    <path class="o" d="M50 400L90 450L70 420Z"/><text x="70" y="430" text-anchor="middle" class="n">4</text>
    <text x="200" y="500" text-anchor="middle" font-size="11" fill="#666">Color each section using the number guide!</text>
  </svg>`;
};

const generateOrigami = () => {
  return `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
    <style>.o{fill:none;stroke:#333;stroke-width:1.5}.f{fill:none;stroke:#333;stroke-width:1;stroke-dasharray:5,3}.b{fill:#f9f9f9;stroke:#ddd}</style>
    <text x="400" y="30" text-anchor="middle" font-size="20" font-weight="bold" font-family="Comic Sans MS">Origami Bunny Instructions</text>
    <rect class="b" x="20" y="50" width="170" height="140" rx="5"/><text x="105" y="70" text-anchor="middle" font-weight="bold">1</text>
    <rect class="o" x="50" y="85" width="70" height="70"/><line class="f" x1="50" y1="85" x2="120" y2="155"/>
    <text x="105" y="175" text-anchor="middle" font-size="11">Fold square diagonally</text>
    <rect class="b" x="210" y="50" width="170" height="140" rx="5"/><text x="295" y="70" text-anchor="middle" font-weight="bold">2</text>
    <polygon class="o" points="240,155 295,85 350,155"/>
    <text x="295" y="175" text-anchor="middle" font-size="11">Fold corners up</text>
    <rect class="b" x="400" y="50" width="170" height="140" rx="5"/><text x="485" y="70" text-anchor="middle" font-weight="bold">3</text>
    <polygon class="o" points="425,155 485,85 545,155 485,120"/>
    <text x="485" y="175" text-anchor="middle" font-size="11">Fold sides to center</text>
    <rect class="b" x="590" y="50" width="170" height="140" rx="5"/><text x="675" y="70" text-anchor="middle" font-weight="bold">4</text>
    <polygon class="o" points="635,155 675,85 715,155"/><polygon class="o" points="655,155 675,125 695,155" fill="#eee"/>
    <text x="675" y="175" text-anchor="middle" font-size="11">Fold bottom up</text>
    <rect class="b" x="20" y="210" width="170" height="140" rx="5"/><text x="105" y="230" text-anchor="middle" font-weight="bold">5</text>
    <polygon class="o" points="65,315 105,235 145,315"/><line class="f" x1="85" y1="255" x2="85" y2="315"/><line class="f" x1="125" y1="255" x2="125" y2="315"/>
    <text x="105" y="335" text-anchor="middle" font-size="11">Create ear folds</text>
    <rect class="b" x="210" y="210" width="170" height="140" rx="5"/><text x="295" y="230" text-anchor="middle" font-weight="bold">6</text>
    <path class="o" d="M260,315L270,270L280,250L295,240L310,250L320,270L330,315L295,300Z"/>
    <text x="295" y="335" text-anchor="middle" font-size="11">Shape the face</text>
    <rect class="b" x="400" y="210" width="170" height="140" rx="5"/><text x="485" y="230" text-anchor="middle" font-weight="bold">7</text>
    <ellipse class="o" cx="485" cy="310" rx="30" ry="20"/><circle class="o" cx="485" cy="275" r="20"/>
    <ellipse class="o" cx="470" cy="250" rx="8" ry="18"/><ellipse class="o" cx="500" cy="250" rx="8" ry="18"/>
    <circle cx="478" cy="270" r="2" fill="#333"/><circle cx="492" cy="270" r="2" fill="#333"/>
    <text x="485" y="345" text-anchor="middle" font-size="11">Done! Add eyes</text>
    <rect class="b" x="590" y="210" width="170" height="140" rx="5"/><text x="675" y="235" text-anchor="middle" font-weight="bold">Tips</text>
    <text x="600" y="260" font-size="10">• Use 6" square paper</text>
    <text x="600" y="280" font-size="10">• Crease folds firmly</text>
    <text x="600" y="300" font-size="10">• Pink paper = pink ears!</text>
    <text x="600" y="320" font-size="10">• Draw face at the end</text>
    <text x="400" y="400" text-anchor="middle" font-size="12" fill="#666">Print and follow the steps to make your origami bunny!</text>
  </svg>`;
};

const Navigation = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: 'joke', label: '😄 Joke' },
    { id: 'famous', label: '⭐ Famous' },
    { id: 'story', label: '📖 Stories' },
    { id: 'map', label: '🗺️ Habitats' },
    { id: 'gallery', label: '📸 Gallery' },
    { id: 'video', label: '🎬 Video' },
    { id: 'adopt', label: '🏠 Adopt' },
    { id: 'craft', label: '✂️ Crafts' },
  ];

  return (
    <nav style={{ position:'sticky',top:0,background:'linear-gradient(135deg,#87CEEB 0%,#FFB6C1 100%)',padding:'15px 20px',display:'flex',justifyContent:'center',gap:'8px',flexWrap:'wrap',boxShadow:'0 4px 15px rgba(0,0,0,0.1)',zIndex:1000 }}>
      {sections.map(s => (
        <button key={s.id} onClick={() => { setActiveSection(s.id); document.getElementById(s.id)?.scrollIntoView({behavior:'smooth'}); }}
          style={{ padding:'10px 16px',border:'none',borderRadius:'25px',cursor:'pointer',fontWeight:'600',fontSize:'14px',transition:'all 0.3s',background:activeSection===s.id?'#FFD700':'white',color:activeSection===s.id?'#333':'#666',boxShadow:activeSection===s.id?'0 4px 12px rgba(255,215,0,0.4)':'0 2px 6px rgba(0,0,0,0.1)' }}>
          {s.label}
        </button>
      ))}
    </nav>
  );
};

const Header = () => (
  <header style={{ background:'linear-gradient(135deg,#87CEEB 0%,#FFB6C1 50%,#FFD700 100%)',padding:'60px 20px',textAlign:'center' }}>
    <h1 style={{ fontSize:'3.5rem',margin:0,color:'white',textShadow:'3px 3px 6px rgba(0,0,0,0.2)',fontFamily:'Comic Sans MS,cursive' }}>🐰 All Things Bunnies 🐰</h1>
    <p style={{ fontSize:'1.3rem',color:'white',marginTop:'15px',textShadow:'2px 2px 4px rgba(0,0,0,0.2)' }}>Your daily dose of bunny joy, facts, and fun!</p>
  </header>
);

const Card = ({ children, style = {} }) => (
  <div style={{ background:'white',borderRadius:'20px',padding:'30px',boxShadow:'0 8px 25px rgba(0,0,0,0.1)',...style }}>{children}</div>
);

const SectionTitle = ({ children, emoji }) => (
  <h2 style={{ fontSize:'2rem',color:'#333',marginBottom:'25px',textAlign:'center',fontFamily:'Comic Sans MS,cursive' }}>{emoji} {children} {emoji}</h2>
);

const JokeSection = () => {
  const [revealed, setRevealed] = useState(false);
  const [day, setDay] = useState(0);
  useEffect(() => { setDay(Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0)) / 86400000)); }, []);
  const joke = bunnyJokes[day % bunnyJokes.length];

  return (
    <section id="joke" style={{ padding:'60px 20px',background:'#FFF9E6' }}>
      <SectionTitle emoji="😄">Daily Bunny Joke</SectionTitle>
      <Card style={{ maxWidth:'600px',margin:'0 auto',textAlign:'center' }}>
        <p style={{ fontSize:'1.4rem',color:'#333',marginBottom:'25px' }}>{joke.setup}</p>
        {revealed ? (
          <p style={{ fontSize:'1.6rem',color:'#FFB6C1',fontWeight:'bold' }}>{joke.punchline}</p>
        ) : (
          <button onClick={() => setRevealed(true)} style={{ background:'linear-gradient(135deg,#FFD700 0%,#FFA500 100%)',border:'none',padding:'15px 40px',borderRadius:'30px',fontSize:'1.1rem',color:'white',cursor:'pointer',fontWeight:'bold',boxShadow:'0 4px 15px rgba(255,215,0,0.4)' }}>
            🥁 Reveal Punchline!
          </button>
        )}
        <p style={{ marginTop:'20px',color:'#888',fontSize:'0.9rem' }}>Come back tomorrow for a new joke!</p>
      </Card>
    </section>
  );
};

const FamousBunnySection = () => {
  const [week, setWeek] = useState(0);
  useEffect(() => { setWeek(Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0)) / (7*86400000))); }, []);
  const bunny = famousBunnies[week % famousBunnies.length];

  return (
    <section id="famous" style={{ padding:'60px 20px',background:'#E6F3FF' }}>
      <SectionTitle emoji="⭐">Famous Bunny of the Week</SectionTitle>
      <Card style={{ maxWidth:'700px',margin:'0 auto' }}>
        <div style={{ textAlign:'center',marginBottom:'20px' }}>
          <span style={{ fontSize:'4rem' }}>{bunny.image}</span>
          <h3 style={{ fontSize:'1.8rem',color:'#87CEEB',margin:'15px 0 5px' }}>{bunny.name}</h3>
          <p style={{ color:'#888',fontStyle:'italic' }}>{bunny.origin} • {bunny.creator}</p>
        </div>
        <div style={{ background:'#f8f9fa',padding:'20px',borderRadius:'15px',marginBottom:'15px' }}>
          <h4 style={{ color:'#333',marginBottom:'10px' }}>📜 The Story</h4>
          <p style={{ color:'#555',lineHeight:'1.7' }}>{bunny.story}</p>
        </div>
        <div style={{ background:'#FFE4E1',padding:'20px',borderRadius:'15px' }}>
          <h4 style={{ color:'#333',marginBottom:'10px' }}>🌟 Legacy</h4>
          <p style={{ color:'#555',lineHeight:'1.7' }}>{bunny.legacy}</p>
        </div>
      </Card>
    </section>
  );
};

const StorySection = () => {
  const [current, setCurrent] = useState(0);
  const [reading, setReading] = useState(false);
  const story = literatureStories[current];

  const toggleNarration = () => {
    if (typeof window === 'undefined') return;
    if (reading) { window.speechSynthesis.cancel(); setReading(false); }
    else {
      const u = new SpeechSynthesisUtterance(story.text);
      u.rate = 0.9;
      u.onend = () => setReading(false);
      window.speechSynthesis.speak(u);
      setReading(true);
    }
  };

  useEffect(() => { return () => { if (typeof window !== 'undefined') window.speechSynthesis.cancel(); }; }, [current]);

  return (
    <section id="story" style={{ padding:'60px 20px',background:'#FFF0F5' }}>
      <SectionTitle emoji="📖">Classic Bunny Tales</SectionTitle>
      <Card style={{ maxWidth:'800px',margin:'0 auto' }}>
        <div style={{ display:'flex',justifyContent:'center',gap:'10px',marginBottom:'25px',flexWrap:'wrap' }}>
          {literatureStories.map((s, i) => (
            <button key={i} onClick={() => { setCurrent(i); if (typeof window !== 'undefined') window.speechSynthesis.cancel(); setReading(false); }}
              style={{ padding:'10px 20px',border:'none',borderRadius:'20px',background:current===i?'#FFB6C1':'#f0f0f0',color:current===i?'white':'#666',cursor:'pointer',fontWeight:current===i?'bold':'normal' }}>
              {s.title}
            </button>
          ))}
        </div>
        <div style={{ textAlign:'center',marginBottom:'20px' }}>
          <h3 style={{ fontSize:'1.6rem',color:'#333' }}>{story.title}</h3>
          <p style={{ color:'#888',fontStyle:'italic' }}>by {story.author}</p>
          <button onClick={toggleNarration} style={{ marginTop:'15px',padding:'12px 30px',border:'none',borderRadius:'25px',background:reading?'linear-gradient(135deg,#ff6b6b,#ee5a5a)':'linear-gradient(135deg,#87CEEB,#5BA3C0)',color:'white',cursor:'pointer',fontWeight:'bold' }}>
            {reading ? '⏹️ Stop' : '🔊 Listen'}
          </button>
        </div>
        <div style={{ background:'#fafafa',padding:'25px',borderRadius:'15px',maxHeight:'350px',overflowY:'auto' }}>
          <p style={{ color:'#444',lineHeight:'2',whiteSpace:'pre-wrap' }}>{story.text}</p>
        </div>
      </Card>
    </section>
  );
};

const MapSection = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="map" style={{ padding:'60px 20px',background:'#E8F5E9' }}>
      <SectionTitle emoji="🗺️">Global Bunny Habitats</SectionTitle>
      <Card style={{ maxWidth:'900px',margin:'0 auto' }}>
        <p style={{ textAlign:'center',color:'#666',marginBottom:'25px' }}>Click a region to learn about bunny habitats!</p>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'15px',marginBottom:'25px' }}>
          {bunnyHabitats.map((h, i) => (
            <div key={i} onClick={() => setSelected(h)} style={{ padding:'20px',background:selected===h?'linear-gradient(135deg,#87CEEB,#5BA3C0)':'#f8f9fa',borderRadius:'15px',cursor:'pointer',transition:'all 0.3s' }}>
              <h4 style={{ color:selected===h?'white':'#333',marginBottom:'5px' }}>📍 {h.name}</h4>
              <p style={{ color:selected===h?'rgba(255,255,255,0.9)':'#666',fontSize:'0.9rem',margin:0 }}>{h.region} • {h.species}</p>
              <span style={{ display:'inline-block',marginTop:'8px',padding:'4px 12px',borderRadius:'15px',fontSize:'0.8rem',background:selected===h?'rgba(255,255,255,0.2)':'#FFD700',color:selected===h?'white':'#333' }}>{h.likelihood}</span>
            </div>
          ))}
        </div>
        {selected && (
          <div style={{ background:'linear-gradient(135deg,#FFB6C1,#FF69B4)',padding:'25px',borderRadius:'15px',color:'white' }}>
            <h3 style={{ marginBottom:'15px' }}>🐰 {selected.name}</h3>
            <p><strong>Species:</strong> {selected.species}</p>
            <p style={{ marginTop:'10px' }}><strong>Description:</strong> {selected.description}</p>
          </div>
        )}
      </Card>
    </section>
  );
};

const GallerySection = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="gallery" style={{ padding:'60px 20px',background:'#FFF9E6' }}>
      <SectionTitle emoji="📸">Bunny Gallery</SectionTitle>
      <Card style={{ maxWidth:'900px',margin:'0 auto' }}>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'15px' }}>
          {bunnyImages.map(img => (
            <div key={img.id} onClick={() => setSelected(img)} style={{ borderRadius:'15px',overflow:'hidden',cursor:'pointer',boxShadow:'0 4px 15px rgba(0,0,0,0.1)' }}>
              <img src={img.url} alt={img.caption} style={{ width:'100%',height:'150px',objectFit:'cover' }} />
              <p style={{ padding:'10px',margin:0,background:'#f8f9fa',fontSize:'0.85rem',color:'#666',textAlign:'center' }}>{img.caption}</p>
            </div>
          ))}
        </div>
        {selected && (
          <div onClick={() => setSelected(null)} style={{ position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.9)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',zIndex:2000,cursor:'pointer' }}>
            <img src={selected.url.replace('w=400','w=800')} alt={selected.caption} style={{ maxWidth:'90%',maxHeight:'80vh',borderRadius:'15px' }} />
            <p style={{ color:'white',marginTop:'20px' }}>{selected.caption}</p>
            <p style={{ color:'#888',marginTop:'10px' }}>Click to close</p>
          </div>
        )}
      </Card>
    </section>
  );
};

const VideoSection = () => {
  const [day, setDay] = useState(0);
  useEffect(() => { setDay(Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0)) / 86400000)); }, []);
  const video = youtubeVideos[day % youtubeVideos.length];

  return (
    <section id="video" style={{ padding:'60px 20px',background:'#E6F3FF' }}>
      <SectionTitle emoji="🎬">Daily Bunny Video</SectionTitle>
      <Card style={{ maxWidth:'800px',margin:'0 auto',textAlign:'center' }}>
        <h3 style={{ color:'#333',marginBottom:'20px' }}>{video.title}</h3>
        <div style={{ position:'relative',paddingBottom:'56.25%',borderRadius:'15px',overflow:'hidden',boxShadow:'0 8px 25px rgba(0,0,0,0.2)' }}>
          <iframe src={`https://www.youtube.com/embed/${video.id}`} style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none' }} allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowFullScreen title={video.title} />
        </div>
        <p style={{ marginTop:'20px',color:'#888' }}>New video every day!</p>
      </Card>
    </section>
  );
};

const AdoptSection = () => {
  const [zip, setZip] = useState('');
  const search = () => { if (zip.length >= 5 && typeof window !== 'undefined') window.open(`https://www.petfinder.com/search/rabbits-for-adoption/us/?location=${zip}`, '_blank'); };

  return (
    <section id="adopt" style={{ padding:'60px 20px',background:'#FFF0F5' }}>
      <SectionTitle emoji="🏠">Find a Bunny to Adopt</SectionTitle>
      <Card style={{ maxWidth:'600px',margin:'0 auto',textAlign:'center' }}>
        <p style={{ color:'#666',marginBottom:'25px' }}>Enter your zip code to find adoptable rabbits near you!</p>
        <div style={{ display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap',marginBottom:'25px' }}>
          <input type="text" placeholder="ZIP code" value={zip} onChange={e => setZip(e.target.value.replace(/\D/g,'').slice(0,5))} onKeyPress={e => e.key === 'Enter' && search()}
            style={{ padding:'15px 25px',fontSize:'1.1rem',border:'2px solid #FFB6C1',borderRadius:'30px',outline:'none',width:'180px',textAlign:'center' }} />
          <button onClick={search} disabled={zip.length < 5} style={{ padding:'15px 35px',background:zip.length>=5?'linear-gradient(135deg,#FFB6C1,#FF69B4)':'#ddd',border:'none',borderRadius:'30px',color:'white',fontSize:'1.1rem',fontWeight:'bold',cursor:zip.length>=5?'pointer':'not-allowed' }}>
            🔍 Search
          </button>
        </div>
        <div style={{ background:'#f8f9fa',padding:'20px',borderRadius:'15px',textAlign:'left' }}>
          <h4 style={{ color:'#333',marginBottom:'15px' }}>🐰 Before You Adopt</h4>
          <ul style={{ color:'#666',lineHeight:'1.8',paddingLeft:'20px' }}>
            <li>Rabbits live 8-12 years</li>
            <li>They need 4+ hours of exercise daily</li>
            <li>Diet: 80% hay + fresh vegetables</li>
            <li>Consider adopting in pairs!</li>
          </ul>
        </div>
      </Card>
    </section>
  );
};

const CraftSection = () => {
  const [day, setDay] = useState(0);
  const types = ['coloring', 'connect', 'colorByNumber', 'origami'];
  const [type, setType] = useState('coloring');

  useEffect(() => {
    const d = Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0)) / 86400000);
    setDay(d);
    setType(types[d % types.length]);
  }, []);

  const crafts = {
    coloring: { name: 'Coloring Page', emoji: '🎨', svg: generateColoringPage(day) },
    connect: { name: 'Connect the Dots', emoji: '✏️', svg: generateConnectDots() },
    colorByNumber: { name: 'Color by Number', emoji: '🔢', svg: generateColorByNumber() },
    origami: { name: 'Origami', emoji: '📄', svg: generateOrigami() },
  };

  const print = () => {
    if (typeof window === 'undefined') return;
    const w = window.open('', '_blank');
    w.document.write(`<!DOCTYPE html><html><head><title>Bunny Craft</title><style>body{margin:0;padding:20px;display:flex;justify-content:center}svg{max-width:100%;height:auto}</style></head><body>${crafts[type].svg}<script>window.print();</script></body></html>`);
    w.document.close();
  };

  return (
    <section id="craft" style={{ padding:'60px 20px',background:'#E8F5E9' }}>
      <SectionTitle emoji="✂️">Daily Bunny Craft</SectionTitle>
      <Card style={{ maxWidth:'850px',margin:'0 auto' }}>
        <div style={{ display:'flex',justifyContent:'center',gap:'10px',marginBottom:'25px',flexWrap:'wrap' }}>
          {Object.entries(crafts).map(([k, c]) => (
            <button key={k} onClick={() => setType(k)} style={{ padding:'12px 20px',border:'none',borderRadius:'25px',background:type===k?'linear-gradient(135deg,#87CEEB,#5BA3C0)':'#f0f0f0',color:type===k?'white':'#666',cursor:'pointer',fontWeight:type===k?'bold':'normal' }}>
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
        <div style={{ background:'white',border:'2px dashed #ddd',borderRadius:'15px',padding:'20px',marginBottom:'25px' }}>
          <div dangerouslySetInnerHTML={{ __html: crafts[type].svg }} style={{ display:'flex',justifyContent:'center' }} />
        </div>
        <div style={{ textAlign:'center' }}>
          <button onClick={print} style={{ padding:'15px 40px',background:'linear-gradient(135deg,#FFD700,#FFA500)',border:'none',borderRadius:'30px',color:'white',fontSize:'1.1rem',fontWeight:'bold',cursor:'pointer',boxShadow:'0 4px 15px rgba(255,215,0,0.4)' }}>
            🖨️ Print This Craft!
          </button>
        </div>
      </Card>
    </section>
  );
};

const Footer = () => (
  <footer style={{ background:'linear-gradient(135deg,#333,#555)',padding:'40px 20px',textAlign:'center',color:'white' }}>
    <p style={{ fontSize:'2rem',marginBottom:'15px' }}>🐰</p>
    <p style={{ marginBottom:'10px' }}>Made with 💕 for bunny lovers</p>
    <p style={{ color:'#aaa',fontSize:'0.9rem' }}>© {new Date().getFullYear()} All Things Bunnies</p>
  </footer>
);

export default function Home() {
  const [active, setActive] = useState('joke');

  useEffect(() => {
    const onScroll = () => {
      const sections = ['joke','famous','story','map','gallery','video','adopt','craft'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 150 && r.bottom >= 150) { setActive(s); break; }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Header />
      <Navigation activeSection={active} setActiveSection={setActive} />
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
