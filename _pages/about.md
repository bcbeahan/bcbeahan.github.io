---
layout: about
title: about
permalink: /
nav: true
nav_order: 1
subtitle: "Bioinformatics · Software Engineering · Computational Biology · IoT"

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false
  more_info: >
    <p>Computational biology</p>
    <p>Bioinformatics</p>
    <p>Embedded systems & automation</p>

selected_papers: false
social: true

announcements:
  enabled: true
  scrollable: true
  limit: 5

latest_posts:
  enabled: false
  scrollable: true
  limit: 3
---

<div class="home-intro">
  <div class="home-intro__content">
    <p class="eyebrow">Computational biology and practical engineering</p>
    <h1>Brendan Christopher Beahan</h1>
    <p class="lead">I work at the intersection of bioinformatics, software engineering, and applied hardware/automation. My current work centers on understanding RNA regulation in cancer using Oxford Nanopore Direct RNA sequencing, while I also build tools and embedded systems that make research workflows more practical and scalable.</p>
    <div class="home-cta">
      <a class="btn btn-primary" href="{{ '/projects/' | relative_url }}">View projects</a>
      <a class="btn btn-secondary" href="{{ '/cv/' | relative_url }}">CV</a>
      <a class="btn btn-secondary" href="https://github.com/bcbeahan" target="_blank" rel="noopener">GitHub</a>
    </div>
  </div>
</div>

<div class="featured-projects">
  <div class="section-header">
    <h2>Featured Projects</h2>
    <a href="{{ '/projects/' | relative_url }}">See all</a>
  </div>

  <div class="project-grid project-grid--featured">
    <article class="project-card project-card--accent">
      <div class="project-card__status">Work in Progress</div>
      <h3>PlantBot</h3>
      <p>An IoT plant-monitoring and automation platform integrating environmental sensors, embedded hardware, data collection, and automated plant care.</p>
      <ul class="tag-list">
        <li>ESP32</li>
        <li>Python</li>
        <li>IoT</li>
        <li>Sensors</li>
        <li>Automation</li>
        <li>Embedded Systems</li>
      </ul>
      <a href="{{ '/projects/plantbot/' | relative_url }}">Read project overview</a>
    </article>

    <article class="project-card project-card--placeholder">
      <div class="project-card__status">Planned</div>
      <h3>Bioinformatics tooling</h3>
      <p>Reusable analysis workflows and tooling for sequence data processing, interpretation, and reproducible research.</p>
      <ul class="tag-list">
        <li>Nanopore</li>
        <li>Python</li>
        <li>Analysis</li>
      </ul>
    </article>

    <article class="project-card project-card--placeholder">
      <div class="project-card__status">Planned</div>
      <h3>Systems & automation</h3>
      <p>Practical hardware experiments, sensor pipelines, and software for data collection, control, and automation.</p>
      <ul class="tag-list">
        <li>Embedded</li>
        <li>Hardware</li>
        <li>Data</li>
      </ul>
    </article>
  </div>
</div>

