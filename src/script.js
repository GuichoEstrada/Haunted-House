import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

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
    new THREE.MeshStandardMaterial() 
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
    new THREE.MeshStandardMaterial() 
)
roof.position.y = houseMeasurements.height + 0.75
roof.rotation.y = Math.PI / 4

// Door
const doorMeasurements = {
    width: 2.2,
    height: 2.2
}
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(
        doorMeasurements.width,
        doorMeasurements.height
    ),
    new THREE.MeshStandardMaterial({color: 'red'})
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
const bushMaterial = new THREE.MeshStandardMaterial()
// Bush 1
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.setScalar(0.5)
bush1.position.set(0.8, 0.2, 2.2)
// Bush 2
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.setScalar(0.25)
bush2.position.set(1.4, 0.1, 2.1)
// Bush 3
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.setScalar(0.4)
bush3.position.set(-0.8, 0.1, 2.2)
// Bush 4
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.setScalar(0.15)
bush4.position.set(-1, 0.05, 2.6)

// Floor
const floorMeasurements = {
    width: 20,
    height: 20
}
const floor = new THREE.Mesh( 
    new THREE.PlaneGeometry(
        floorMeasurements.width,
        floorMeasurements.height
    ), 
    new THREE.MeshStandardMaterial() 
);
floor.rotation.x = -Math.PI * 0.5

house.add(walls, roof, door, bush1, bush2, bush3, bush4)
scene.add(floor, house)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

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

lightingFolder.close()


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
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()