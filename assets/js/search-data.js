// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-phd",
          title: "phd",
          description: "m6A dysregulation in breast cancer, studied with Oxford Nanopore Direct RNA sequencing",
          section: "Navigation",
          handler: () => {
            window.location.href = "/phd/";
          },
        },{id: "nav-omscs",
          title: "omscs",
          description: "Georgia Tech Online Master of Science in Computer Science",
          section: "Navigation",
          handler: () => {
            window.location.href = "/omscs/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Curriculum vitae and background.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-books",
          title: "books",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/books/";
          },
        },{id: "dropdown-projects",
              title: "projects",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/projects/";
              },
            },{id: "dropdown-guitar",
              title: "guitar",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/guitar/";
              },
            },{id: "dropdown-cooking",
              title: "cooking",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/cooking/";
              },
            },{id: "dropdown-french",
              title: "french",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/french/";
              },
            },{id: "post-plantbot-v0-1-planning-hardware-amp-learning",
        
          title: "PlantBot v0.1 — Planning, Hardware &amp; Learning",
        
        description: "Planning, procurement, architecture, and the learning path for the first PlantBot embedded-systems prototype.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/projects/plantbot/development-log/v0-1/";
          
        },
      },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "books-the-biology-of-cancer-3rd-edition",
          title: 'The Biology of Cancer (3rd edition)',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/biology_of_cancer/";
            },},{id: "books-breakneck-china-39-s-quest-to-engineer-the-future",
          title: 'Breakneck: China&amp;#39;s Quest to Engineer the Future',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/breakneck/";
            },},{id: "books-fitzpatrick-39-s-war",
          title: 'Fitzpatrick&amp;#39;s War',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/fitzpatricks_war/";
            },},{id: "books-the-passion-of-the-western-mind",
          title: 'The Passion of the Western Mind',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/passion_of_the_western_mind/";
            },},{id: "books-war-in-human-civilization",
          title: 'War in Human Civilization',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/war_in_human_civilization/";
            },},{id: "news-presented-flashtalk-and-poster-at-flemish-nanopore-day-2026",
          title: 'Presented flashtalk and poster at Flemish Nanopore Day 2026!',
          description: "",
          section: "News",},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/cv/", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/bcbeahan", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=qc6CJjYAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
