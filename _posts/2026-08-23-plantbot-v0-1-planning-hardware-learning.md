---
layout: post
title: "PlantBot v0.1 — Planning, Hardware & Learning"
date: 2026-08-23 08:00:00+02:00
description: "Planning, procurement, architecture, and the learning path for the first PlantBot embedded-systems prototype."
permalink: /projects/plantbot/development-log/v0-1/
tags: plantbot embedded iot development-log
categories: project-log
related_posts: false
toc:
  beginning: true
---

<div class="pb-entry-meta"><span class="pb-pill pb-pill--accent">v0.1</span><span class="pb-pill">Planning</span><span class="pb-pill">Procurement</span><span class="pb-pill">Learning</span></div>

PlantBot is still at the beginning: I have a plan, an initial hardware order, and a lot to learn. This entry records that starting point as an engineering notebook—not as a finished-product announcement.

## Why PlantBot?

I wanted a project that would force me to work across several layers of engineering instead of staying entirely in software. PlantBot gives me a physical system where I need to think about electronics, sensors, embedded programming, data collection, communications, control logic, power, physical actuation, and eventually automation.

Plant care is a useful test system because software decisions ultimately have observable physical consequences. That makes it a grounded place to learn, without pretending the project needs to be bigger than it is.

## Design philosophy

The first version is deliberately small: approximately **one plant, one soil-moisture sensor, one ESP32, one pump, simple wiring, basic sensor logging, and eventually simple on/off pump control**. The guiding principle is to **learn each layer individually before adding complexity**.

For now I am avoiding many sensors, multiple plants, complicated networking, machine learning, large dashboards, and sophisticated control algorithms. The chain I want to understand is:

<div class="pb-chain" aria-label="Learning chain"><span>Physical measurement</span><b>→</b><span>Embedded system</span><b>→</b><span>Data</span><b>→</b><span>Software decision</span><b>→</b><span>Physical actuation</span></div>

## Hardware ordered

This is the verified v0.1 procurement record. “Ordered” means exactly that; none of these components is being presented as assembled or tested.

<div class="pb-hardware-grid">
<section class="pb-hardware"><header><span>▣</span><h3>Compute</h3></header><div class="pb-item"><div><strong>NodeMCU ESP32-S, 4 MB WROOM, 38-pin</strong><p>Main microcontroller; Wi-Fi + Bluetooth capable; intended to read sensors and ultimately control the system.</p></div><i>Ordered</i></div><div class="pb-item"><div><strong>USB-A → Micro-USB data cable</strong><p>ESP32 power and firmware/program upload connection.</p></div><i>Ordered</i></div></section>
<section class="pb-hardware"><header><span>◉</span><h3>Sensing</h3></header><div class="pb-item"><div><strong>Capacitive soil-moisture sensor</strong><p>Approximate soil-moisture measurement; analog output intended for ESP32 input.</p></div><i>Ordered</i></div></section>
<section class="pb-hardware"><header><span>⌁</span><h3>Prototyping</h3></header><div class="pb-item"><div><strong>830-point solderless breadboard</strong><p>Prototype construction without soldering.</p></div><i>Ordered</i></div><div class="pb-item"><div><strong>Male-to-male Dupont jumper wires</strong><p>Breadboard connections.</p></div><i>Ordered</i></div><div class="pb-item"><div><strong>Male-to-female Dupont jumper wires — 10 cm</strong><p>Connecting modules or boards with exposed pins.</p></div><i>Ordered</i></div><div class="pb-item"><div><strong>Male-to-female Dupont jumper wires — 30 cm</strong><p>Longer connections when the sensor and plant are separated from the breadboard.</p></div><i>Ordered</i></div></section>
<section class="pb-hardware"><header><span>⏻</span><h3>Control</h3></header><div class="pb-item"><div><strong>F5305S MOSFET electronic switch module</strong><p>Lets a low-power ESP32 signal switch the pump circuit on and off.</p></div><i>Ordered</i></div><div class="pb-item"><div><strong>1N4007 flyback diode</strong><p>Protection against inductive voltage spikes when the pump motor is switched off.</p></div><i>Ordered</i></div></section>
<section class="pb-hardware"><header><span>≈</span><h3>Water delivery</h3></header><div class="pb-item"><div><strong>3–6 V mini submersible water pump</strong><p>Intended to move water from a reservoir toward the plant.</p></div><i>Ordered</i></div><div class="pb-item"><div><strong>2 metres transparent 8 × 6 mm hose</strong><p>Water-delivery tubing: 8 mm outer diameter and 6 mm inner diameter.</p></div><i>Ordered</i></div></section>
<section class="pb-hardware"><header><span>⚡</span><h3>Power</h3></header><div class="pb-item"><div><strong>5 V / 2 A USB power adapter</strong><p>Separate power source for the pump circuit.</p></div><i>Ordered</i></div><div class="pb-item"><div><strong>USB-A → 5.5 × 2.1 mm DC barrel cable</strong><p>Converts USB power to a standard DC barrel connection.</p></div><i>Ordered</i></div><div class="pb-item"><div><strong>5.5 × 2.1 mm female DC jack → screw-terminal adapter</strong><p>Convenient +5 V and GND terminals without cutting the USB cable.</p></div><i>Ordered</i></div></section>
</div>

### Procurement cost

<div class="pb-costs"><div><span>Otronic</span><strong>€36.68</strong></div><div><span>TinyTronics</span><strong>€24.75</strong></div><div class="pb-costs__total"><span>Total hardware so far</span><strong>€61.43</strong><small>Shipping and VAT included</small></div></div>

This is simply a record of what the prototype has cost so far, not a claim about cost efficiency.

## Planned v0.1 architecture

The diagram below is the current working idea, not a tested or finalized circuit.

<div class="pb-architecture">
<section><h3>Sensing &amp; data path</h3><div class="pb-flow"><span>Plant / soil</span><b>↓</b><span>Capacitive soil-moisture sensor</span><b>↓</b><span>ESP32</span><b>↓</b><span>Data collection</span><b>↓</b><span>Python / software</span><b>↓</b><span>Monitoring / decision logic</span></div></section>
<section><h3>Eventual watering path</h3><div class="pb-flow"><span>ESP32</span><b>↓</b><span>MOSFET switch</span><b>↓</b><span>Water pump</span><b>↓</b><span>Hose</span><b>↓</b><span>Plant</span></div><div class="pb-power"><strong>5 V / 2 A pump supply</strong><small>feeds the pump circuit ↗</small></div></section>
</div>

## Intentionally deferred purchases

<div class="pb-deferred"><strong>Not purchased yet</strong><p>Plant · pot with drainage · saucer · potting soil · water reservoir/container</p><p>I am deliberately waiting for the electronics to arrive and work before buying the final physical plant setup. This lets me focus first on powering and programming the ESP32, reading a sensor, understanding the wiring, and controlling the pump circuit before settling the exact plant and container setup.</p></div>

## Learning the Stack

<p class="pb-sequence"><strong>Reading sequence</strong><span>Make: Electronics</span> → <span>Botany for Gardeners</span> → <span>Arduino Cookbook</span> → <span>Making Embedded Systems</span></p>

<div class="pb-books">
<article class="pb-book"><div class="pb-cover"><span>01</span><small>Electronics foundation</small></div><div><div class="pb-book__top"><span class="pb-pill pb-pill--accent">Next</span><span>Reading order 1</span></div><h3>Make: Electronics, 3rd Edition</h3><p class="pb-author">Charles Platt</p><p><strong>Why I chose it:</strong> To understand what I am actually wiring rather than merely copying circuit diagrams.</p><p><strong>PlantBot relevance:</strong> Breadboards, voltage/current, resistors, diodes, transistors, motors, and basic circuits.</p></div></article>
<article class="pb-book"><div class="pb-cover"><span>02</span><small>Plant biology</small></div><div><div class="pb-book__top"><span class="pb-pill">Planned</span><span>Reading order 2</span></div><h3>Botany for Gardeners, 4th Edition</h3><p class="pb-author">Brian Capon</p><p><strong>Why I chose it:</strong> PlantBot should not just be an electronics project; understanding the biological system being monitored matters too.</p><p><strong>PlantBot relevance:</strong> Roots, water transport, photosynthesis, growth, and plant structure.</p></div></article>
<article class="pb-book"><div class="pb-cover"><span>03</span><small>Practical reference</small></div><div><div class="pb-book__top"><span class="pb-pill">Later reference</span><span>Reading order 3</span></div><h3>Arduino Cookbook, 3rd Edition</h3><p class="pb-author">Michael Margolis, Brian Jepson &amp; Nicholas Robert Weldin</p><p><strong>Why I chose it:</strong> A practical reference rather than necessarily a linear read.</p><p><strong>PlantBot relevance:</strong> Sensors, motors, ADC, communications, networking, and timing. Although PlantBot uses an ESP32, much of the interface material is conceptually useful.</p></div></article>
<article class="pb-book"><div class="pb-cover"><span>04</span><small>System design</small></div><div><div class="pb-book__top"><span class="pb-pill">Later reference</span><span>Reading order 4</span></div><h3>Making Embedded Systems, 2nd Edition</h3><p class="pb-author">Elecia White</p><p><strong>Why I chose it:</strong> More advanced reading for after I already have a basic prototype running.</p><p><strong>PlantBot relevance:</strong> Embedded architecture, debugging, interfaces, sensors, motors, resource constraints, and IoT/system design.</p></div></article>
</div>

The cover areas are deliberately styled placeholders. Verified cover images can later be placed in `assets/img/plantbot/v0.1/books/` without changing the card structure.

## Order records & future hardware photos

<div class="pb-media-grid"><section><div class="pb-media-placeholder">Receipt</div><h3>Otronic order</h3><p>Future redacted order screenshot, vendor caption, purchase date, and subtotal.</p></section><section><div class="pb-media-placeholder">Receipt</div><h3>TinyTronics order</h3><p>Future redacted order screenshot, vendor caption, purchase date, and subtotal.</p></section><section><div class="pb-media-placeholder">Photo</div><h3>Hardware gallery</h3><p>Components, first wiring attempt, and first complete prototype after they exist.</p></section></div>

Order screenshots will live in `assets/img/plantbot/v0.1/orders/`; later photographs will live in `assets/img/plantbot/v0.1/hardware/`. Any order screenshot added here will need payment and address details removed first.

## What I want to learn

<div class="pb-goals"><span>Read analog sensors with a microcontroller</span><span>Build basic embedded electronics</span><span>Program the ESP32</span><span>Understand ADC behavior</span><span>Connect hardware to higher-level software</span><span>Collect and store measurements</span><span>Visualize measurements</span><span>Separate logic and load power</span><span>Switch motors and pumps safely</span><span>Design reliable control logic</span><span>Build a modular system</span></div>

These are learning goals, not completed skills.

## Next milestone

<div class="pb-milestone"><div><span class="pb-pill pb-pill--accent">Future milestone · v0.2</span><h3>First Sensor Prototype</h3><p>The next entry begins only after the first components arrive and the work can be documented honestly.</p></div><ul class="pb-checklist"><li>Receive and inventory components</li><li>Identify the ESP32 pinout</li><li>Power and program the ESP32</li><li>Wire the capacitive soil-moisture sensor</li><li>Obtain stable raw sensor readings</li><li>Record initial sensor data</li><li>Photograph the prototype</li><li>Establish a dedicated PlantBot code repository</li></ul></div>

<style>
.pb-entry-meta{display:flex;flex-wrap:wrap;gap:.45rem;margin-bottom:1.5rem}.pb-pill,.pb-item i{display:inline-flex;border-radius:999px;padding:.28rem .65rem;background:color-mix(in srgb,var(--global-text-color) 8%,transparent);font-size:.7rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;font-style:normal}.pb-pill--accent,.pb-item i{background:color-mix(in srgb,var(--global-theme-color) 14%,transparent);color:var(--global-theme-color)}
.pb-chain{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:.6rem;margin:1.4rem 0;padding:1.1rem;border:1px solid var(--global-divider-color);border-radius:1rem}.pb-chain span{padding:.65rem .8rem;border-radius:.65rem;background:color-mix(in srgb,var(--global-theme-color) 10%,var(--global-bg-color));font-weight:600}.pb-chain b{color:var(--global-theme-color)}
.pb-hardware-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,310px),1fr));gap:1rem;margin:1.4rem 0}.pb-hardware{padding:1.1rem;border:1px solid var(--global-divider-color);border-radius:1rem;background:var(--global-card-bg-color)}.pb-hardware header{display:flex;align-items:center;gap:.6rem;padding-bottom:.75rem;border-bottom:1px solid var(--global-divider-color)}.pb-hardware header span{color:var(--global-theme-color);font-size:1.3rem}.pb-hardware h3{margin:0}.pb-item{display:flex;align-items:flex-start;justify-content:space-between;gap:.75rem;padding:.9rem 0;border-bottom:1px solid var(--global-divider-color)}.pb-item:last-child{border:0;padding-bottom:0}.pb-item p{margin:.25rem 0 0;font-size:.88rem;color:var(--global-text-color-light)}.pb-item i{flex:0 0 auto;font-size:.62rem}
.pb-costs{display:grid;grid-template-columns:repeat(2,1fr);gap:.75rem;margin:1rem 0}.pb-costs>div{display:flex;justify-content:space-between;padding:1rem;border:1px solid var(--global-divider-color);border-radius:.8rem}.pb-costs__total{grid-column:1/-1;align-items:center;background:color-mix(in srgb,var(--global-theme-color) 9%,var(--global-bg-color));border-color:color-mix(in srgb,var(--global-theme-color) 45%,var(--global-divider-color))!important}.pb-costs strong{font-size:1.15rem}.pb-costs small{color:var(--global-text-color-light)}
.pb-architecture{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:1rem;margin:1.2rem 0}.pb-architecture section{padding:1.2rem;border:1px solid var(--global-divider-color);border-radius:1rem;background:var(--global-card-bg-color)}.pb-flow{display:flex;flex-direction:column;align-items:center;gap:.4rem}.pb-flow span{width:100%;padding:.65rem;text-align:center;border-radius:.6rem;background:color-mix(in srgb,var(--global-theme-color) 9%,var(--global-bg-color));font-weight:600}.pb-flow b{color:var(--global-theme-color)}.pb-power{margin-top:1rem;padding:.8rem;border:1px dashed var(--global-theme-color);border-radius:.65rem;text-align:center}.pb-power small{display:block;color:var(--global-text-color-light)}
.pb-deferred{padding:1.1rem 1.2rem;border-left:4px solid var(--global-theme-color);border-radius:0 .75rem .75rem 0;background:color-mix(in srgb,var(--global-theme-color) 7%,transparent)}.pb-deferred p:last-child{margin-bottom:0}.pb-sequence{display:flex;flex-wrap:wrap;gap:.45rem;align-items:center}.pb-sequence span{color:var(--global-theme-color)}
.pb-books{display:grid;gap:1rem;margin:1.3rem 0}.pb-book{display:grid;grid-template-columns:150px 1fr;gap:1.2rem;padding:1rem;border:1px solid var(--global-divider-color);border-radius:1rem;background:var(--global-card-bg-color)}.pb-cover{display:flex;min-height:190px;flex-direction:column;justify-content:center;align-items:center;border:1px dashed color-mix(in srgb,var(--global-theme-color) 50%,var(--global-divider-color));border-radius:.7rem;background:linear-gradient(145deg,color-mix(in srgb,var(--global-theme-color) 14%,var(--global-bg-color)),var(--global-bg-color));color:var(--global-theme-color)}.pb-cover span{font-size:2.2rem;font-weight:800}.pb-cover small{text-align:center}.pb-book__top{display:flex;justify-content:space-between;align-items:center;color:var(--global-text-color-light);font-size:.75rem}.pb-book h3{margin:.65rem 0 .15rem}.pb-author{color:var(--global-text-color-light);font-style:italic}
.pb-media-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:1rem}.pb-media-grid section{padding:1rem;border:1px solid var(--global-divider-color);border-radius:1rem}.pb-media-placeholder{display:grid;place-items:center;aspect-ratio:16/9;border:1px dashed var(--global-divider-color);border-radius:.65rem;background:color-mix(in srgb,var(--global-theme-color) 6%,var(--global-bg-color));color:var(--global-text-color-light);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}.pb-media-grid h3{margin:.8rem 0 .25rem}
.pb-goals{display:flex;flex-wrap:wrap;gap:.55rem}.pb-goals span{padding:.55rem .75rem;border:1px solid var(--global-divider-color);border-radius:999px;background:var(--global-card-bg-color);font-size:.86rem}.pb-milestone{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:1.3rem;padding:1.3rem;border:1px solid color-mix(in srgb,var(--global-theme-color) 45%,var(--global-divider-color));border-radius:1rem;background:color-mix(in srgb,var(--global-theme-color) 6%,var(--global-bg-color))}.pb-checklist{list-style:none;padding:0;margin:0}.pb-checklist li{position:relative;padding:.35rem 0 .35rem 1.6rem}.pb-checklist li:before{content:"";position:absolute;left:0;top:.55rem;width:.75rem;height:.75rem;border:2px solid var(--global-theme-color);border-radius:.2rem}
@media(max-width:600px){.pb-book,.pb-milestone{grid-template-columns:1fr}.pb-cover{min-height:130px}.pb-costs{grid-template-columns:1fr}.pb-costs__total{grid-column:auto;flex-wrap:wrap}.pb-item{flex-direction:column}.pb-book__top{align-items:flex-start;gap:.5rem;flex-direction:column}}
</style>
