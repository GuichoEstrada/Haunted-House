# Haunted House

### This project is a simple 3D haunted house scene built using Three.js. 
### The models are created using primitive shapes provided by Three.js, such as boxes, spheres, and cylinders. 
### No pre-made models are used.

## Table of Contents
1. Techonologies Used
2. Current Stage of Development
3. Features
4. Installation
5. Usage
6. References

## Technologies Used
- **Three.js**: A JavaScript library used to create and display animated 3D graphics in the browser.
- **JavaScript**: The primary programming language used for the project.
- **HTML & CSS**: Used for structuring and styling the web page.
- **npm**: Node package manager used for managing dependencies.
- **vite**: A powerful and efficient tool offering fast build times, real-time updates, and optimized code handling

## Current Stage of Development
### The project currently features a basic structure of a haunted house with adjustable settings using a GUI. 
### Below is a screenshot of the current development stage:
https://github.com/GuichoEstrada/Haunted-House/assets/44462824/ae64f6ba-f65e-4f05-b288-27e2e7cfe5c6

## Features in Development
- **Audio**
- **Flicker Animations**
- **Additional objects**

## Installation
To get started, clone the repository and install the dependencies:
bash
Copy code
```
git clone https://github.com/GuichoEstrada/Haunted-House.git
cd Haunted-House
npm install
```

## Usage
To run the project locally, use the following command to start the development server:
bash
Copy code
```
npm run dev
This will start a local server and open the project in your default web browser.
```

## Features
### Models
- **House**: Built using boxes for walls and cone geomtery for the roof.
- **Graveyard**: Consists of boxes to create tombstones.
- **Trees**: Modeled using spheres for foliage.
- **Ghosts**: Still looking for suitable models so I'm using Point Lights for now
- **Lights**: Various light sources including ambient, directional, point, and spotlights to create a spooky atmosphere.
### Controls
- **Orbit Controls**: Allowing the user to rotate around the scene, zoom in and out, and pan.
### Shadows and Effects
- **Shadows**: Implemented using Three.js shadow capabilities.
- **Sky**: Utilized built in Sky feature of Three.js
- **Fog**: Added to enhance the eerie atmosphere using Fog feature of Three.js.
### GUI
- **Lighting**: Adjustable settings for ambient, directional and point lights
- **Floor Displacement**: Adjustable floor displacement scale and bias.
- **Ghosts**: Adjustable colors for the ghosts
- **Sky**: Sky settings like turbidity, rayleigh, position, etc.
- **Fog**: Can adjust fog color and density

## References
Textures:
Coast Sand Rocks 02 by Rob Tuytel - https://polyhaven.com/a/coast_sand_rocks_02
Plastered Stone Wall by Rob Tuytelhttps://polyhaven.com/a/plastered_stone_wall
Roof Slates 02 by Rob Tuytel - https://polyhaven.com/a/roof_slates_02
Classic Brick Broken 06 by Rob Tuytel - https://polyhaven.com/a/castle_brick_broken_06
Leaves Forest Ground by Dario Barresi & Dimitrios Savva - https://polyhaven.com/a/leaves_forest_ground
Door by Eren Katsukagi - https://3dtextures.me/2019/04/16/door-wood-001/


