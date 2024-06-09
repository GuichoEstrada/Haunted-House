import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**import { depth } from 'three/examples/jsm/nodes/Nodes.js'

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
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/coast_sand_rocks_02_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02_disp_1k.jpg')

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
const wallColorTexture = textureLoader.load('./wall/castle_brick_broken_06_diff_1k.jpg')
const wallARMTexture = textureLoader.load('./wall/castle_brick_broken_06_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./wall/castle_brick_broken_06_nor_gl_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

// Roof
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_diff_1k.jpg')
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_nor_gl_1k.jpg')

roofColorTexture.colorSpace = THREE.SRGBColorSpace

// If values are greater than 1, set wrapS or wrapT to repeatWrapping respectively
roofColorTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping

// Bush
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_diff_1k.jpg')
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_arm_1k.jpg')
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_nor_gl_1k.jpg')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

// Grave
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_diff_1k.jpg')
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_nor_gl_1k.jpg')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

// Door
const doorColorTexture = textureLoader.load('./door/color.jpg')
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorNormalTexture = textureLoader.load('./door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')

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
camera.position.set(4, 2, 5)
scene.add(camera)

/**
 * GUI/Helpers
 */
// General Lighting
const lightingFolder = gui.addFolder('Lighting')
const floorDisplacementMapFolder = gui.addFolder('Displacement Map')

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

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()