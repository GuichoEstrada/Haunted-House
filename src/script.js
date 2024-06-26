import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/examples/jsm/Addons.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

/**
 * Base
 */
// Debug
const gui = new GUI({
    title: 'Haunted House GUI',
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
// Floor
const textureLoader = new THREE.TextureLoader()
const floorAlphaTexture = textureLoader.load('./floor/alpha.webp')
const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp')
const floorARMTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8,8)
floorARMTexture.repeat.set(8,8)
floorNormalTexture.repeat.set(8,8)
floorDisplacementTexture.repeat.set(8,8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

// Wall
const wallColorTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp')
const wallARMTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp')
const wallNormalTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

// Roof
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')

roofColorTexture.colorSpace = THREE.SRGBColorSpace

// If values are greater than 1, set wrapS or wrapT to repeatWrapping respectively
roofColorTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping

// Bush
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp')
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp')
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

// Grave
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg')
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

// Door
const doorColorTexture = textureLoader.load('./door/color.webp')
const doorAlphaTexture = textureLoader.load('./door/alpha.webp')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.webp')
const doorHeightTexture = textureLoader.load('./door/height.webp')
const doorNormalTexture = textureLoader.load('./door/normal.webp')
const doorMetalnessTexture = textureLoader.load('./door/metalness.webp')
const doorRoughnessTexture = textureLoader.load('./door/roughness.webp')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Objects
 */
// House
const houseMeasurements = {
    width: 4,
    height: 2.5,
    depth: 4
}
const house = new THREE.Group()

// Walls
const walls = new THREE.Mesh( 
    new THREE.BoxGeometry( 
        houseMeasurements.width, 
        houseMeasurements.height, 
        houseMeasurements.depth
    ), 
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture
    }) 
);
walls.position.y = houseMeasurements.height / 2

// Roof
const roofMeasurements = {
    radius: 3.5,
    height: 1.5,
    radialSegments: 4
}
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(
        roofMeasurements.radius,
        roofMeasurements.height,
        roofMeasurements.radialSegments
    ),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    }) 
)
roof.position.y = houseMeasurements.height + 0.75
roof.rotation.y = Math.PI / 4

// Door
const doorMeasurements = {
    width: 2.2,
    height: 2.2,
    widthSegments: 100,
    heightSegments: 100
}
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(
        doorMeasurements.width,
        doorMeasurements.height,
        doorMeasurements.widthSegments,
        doorMeasurements.heightSegments
    ),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        // color: 'red'
    })
)
door.position.y = 1
door.position.z = 2 + 0.01

// Bushes
const bushMeasurements = {
    radius: 1,
    widthSegments: 16,
    heightSegments: 16
}
const bushGeometry = new THREE.SphereGeometry(
    bushMeasurements.radius,
    bushMeasurements.widthSegments,
    bushMeasurements.heightSegments
)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
})
// Bush 1
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.setScalar(0.5)
bush1.position.set(0.8, 0.2, 2.2)
// To hide the weird bush shape
bush1.rotation.x = - 0.75
// Bush 2
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.setScalar(0.25)
bush2.position.set(1.4, 0.1, 2.1)
// To hide the weird bush shape
bush2.rotation.x = - 0.75
// Bush 3
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.setScalar(0.4)
bush3.position.set(-0.8, 0.1, 2.2)
// To hide the weird bush shape
bush3.rotation.x = - 0.75
// Bush 4
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.setScalar(0.15)
bush4.position.set(-1, 0.05, 2.6)
// To hide the weird bush shape
bush4.rotation.x = - 0.75

// Floor
const floorMeasurements = {
    width: 20,
    height: 20,
    widthSegments: 100,
    heightSegments: 100
}
const floor = new THREE.Mesh( 
    new THREE.PlaneGeometry(
        floorMeasurements.width,
        floorMeasurements.height,
        floorMeasurements.widthSegments,
        floorMeasurements.heightSegments
    ), 
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.2
    }) 
)
floor.rotation.x = -Math.PI * 0.5

// Graves
const graveMeasurements = {
    width: 0.6,
    height: 0.8,
    depth: 0.2
}
const graveGeometry = new THREE.BoxGeometry( graveMeasurements.width, graveMeasurements.height, graveMeasurements.depth)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    normalMap: graveNormalTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture
})

const graves = new THREE.Group()
for(let i = 0; i < 30; i++) {
    // Place the graves around the house (circle trigonometry)
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 4.5
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    // Create mesh for a grave
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    // Set graves position and rotation
    grave.position.set(x, Math.random() * 0.4, z)
    grave.rotation.x = grave.rotation.y = grave.rotation.z = (Math.random() - 0.5) * 0.4
    graves.add(grave)
}

house.add(walls, roof, door, bush1, bush2, bush3, bush4)
scene.add(floor, house, graves)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)

/**
 * Sky
 */
// Sky is a box mesh
const sky = new Sky()
sky.material.uniforms.turbidity.value = 10
sky.material.uniforms.rayleigh.value = 3
sky.material.uniforms.mieCoefficient.value = 0.1
sky.material.uniforms.mieDirectionalG.value = 0.95
sky.material.uniforms.sunPosition.value.set(0.3, -0.038, -0.95)
// Enclose scene in sky box mesh
sky.scale.setScalar(100)

scene.add(sky)

/**
 * Fog
 */
const fog = new THREE.FogExp2('#02343f', 0.1)
scene.fog = fog

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(3, 2, 10)
scene.add(camera)

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#380070', 6)
const ghost2 = new THREE.PointLight('#f28135', 6)
const ghost3 = new THREE.PointLight('#b50000', 6)

scene.add(ghost1, ghost2, ghost3)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
//Renderer
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
// Cast and Receive
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true
// Individual grave scope is not accessible so use .children and for loop
for(const grave of graves.children) {
    grave.castShadow = true
    grave.receiveShadow = true
}

// Mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.mapSize.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.mapSize.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.mapSize.far = 10

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghost movement
    const ghost1Angle = (elapsedTime / 3) * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle)* 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34)

    const ghost2Angle = -(elapsedTime / 2) * 0.38
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle)* 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)

    const ghost3Angle = (elapsedTime / 2.5) * 0.23
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle)* 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

/**
 * GUI/Helpers
 */
// General Lighting
const lightingFolder = gui.addFolder('Lighting')
const floorDisplacementMapFolder = gui.addFolder('Floor Displacement')
const ghostSettingsFolder = gui.addFolder('Ghosts')
const skySettingsFolder = gui.addFolder('Sky')
const fogSettingsFolder = gui.addFolder('Fog')

// Ambient Light
const ambientLightFolder = lightingFolder.addFolder('Ambient Light')
const ambientLightState = { enabled: true };
ambientLightFolder.add(ambientLightState, 'enabled').name('Enabled').onChange(value => {
    ambientLight.visible = value;
});
ambientLightFolder.add(ambientLight, 'intensity').name('Intensity').min(0).max(10).step(0.05)

// Directional Light
const directionalLightFolder = lightingFolder.addFolder('Directional Light')
const directionalLightState = { enabled: true };
directionalLightFolder.add(directionalLightState, 'enabled').name('Enabled').onChange(value => {
    directionalLight.visible = value;
});
directionalLightFolder.add(directionalLight, 'intensity').name('Intensity').min(0).max(10).step(0.05)
directionalLightFolder.add(directionalLight.position, 'x').name('Position X').min(-50).max(50).step(0.05)
directionalLightFolder.add(directionalLight.position, 'y').name('Position Y').min(-50).max(50).step(0.05)
directionalLightFolder.add(directionalLight.position, 'z').name('Position Z').min(-50).max(50).step(0.05)

// Point Light (Door)
const pointLightFolder = lightingFolder.addFolder('Point Light (Door)')
const pointLightState = { enabled: true };
pointLightFolder.add(pointLightState, 'enabled').name('Enabled').onChange(value => {
    doorLight.visible = value;
});
pointLightFolder.add(doorLight, 'intensity').name('Intensity').min(0).max(10).step(0.05)

// Displacement Map
floorDisplacementMapFolder.add(floor.material, 'displacementScale').name('Floor Displacement Scale').min(0).max(1).step(0.001)
floorDisplacementMapFolder.add(floor.material, 'displacementBias').name('Floor Displacement Bias').min(-1).max(1).step(0.001)

// Ghost Color
ghostSettingsFolder.addColor({ color: ghost1.color.getHex() }, 'color').name('Color').onChange((value) => {
    ghost1.color.set(value);
});
ghostSettingsFolder.addColor({ color: ghost2.color.getHex() }, 'color').name('Color').onChange((value) => {
    ghost2.color.set(value);
});
ghostSettingsFolder.addColor({ color: ghost3.color.getHex() }, 'color').name('Color').onChange((value) => {
    ghost3.color.set(value);
});

// Sky Settings
skySettingsFolder.add(sky.material.uniforms.turbidity, 'value').name('Turbidity').min(-20).max(20).step(0.001)
skySettingsFolder.add(sky.material.uniforms.rayleigh, 'value').name('Rayleigh').min(-20).max(20).step(0.001)
skySettingsFolder.add(sky.material.uniforms.mieCoefficient, 'value').name('Mie Coefficient').min(-20).max(20).step(0.001)
skySettingsFolder.add(sky.material.uniforms.mieDirectionalG, 'value').name('Mie Directional G').min(-20).max(20).step(0.001)
skySettingsFolder.add(sky.material.uniforms.sunPosition.value, 'x').name('Sun Position X').min(-1).max(1).step(0.001)
skySettingsFolder.add(sky.material.uniforms.sunPosition.value, 'y').name('Sun Position Y').min(-15).max(15).step(0.001)
skySettingsFolder.add(sky.material.uniforms.sunPosition.value, 'z').name('Sun Position Z').min(-10).max(10).step(0.001)

// Fog Settings
fogSettingsFolder.add(fog, 'density').name('Density').min(0).max(1).step(0.001)
fogSettingsFolder.addColor({ color: fog.color.getHex() }, 'color').name('Color').onChange((value) => {
    fog.color.set(value);
});

lightingFolder.close()
floorDisplacementMapFolder.close()
ghostSettingsFolder.close()
skySettingsFolder.close()
fogSettingsFolder.close()