import React from 'react'
import * as THREE from 'three'
import './Visualizer.css'

let cam, scene, renderer
let geom, mat, mesh

const renderTarget = new THREE.WebGLRenderTarget(
  1024, 1024,
  { format: THREE.RGBFormat })



class Visualizer extends React.Component {
  init() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })

    this.cam = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10)
    this.cam.position.z = -1

    this.scene = new THREE.Scene()
    this.geom = new THREE.BoxGeometry(0.2, 0.2, 0.2)
    this.mat = new THREE.MeshBasicMaterial()

    this.mesh = new THREE.Mesh(geom, mat)
    this.scene.add(mesh)

    window.addEventListener('resize', this.resize.bind(this), false)
  }

  resize() {
    const {innerWidth: w, innerHeight: h} = window
    this.cam.aspect = w / h
    this.cam.updateProjectionMatrix()
    this.renderer.setSize(w, h)
  }

  animate() {
    requestAnimationFrame(this.animate)

    this.renderer.render(this.scene, this.cam)
  }

  componentDidMount() {
    this.init()
    this.animate()
  }

  render() {
    return (
      <div
        id="visualizer-wrapper"
        ref={div => {
          this.container = div
        }}>
      </div>
    )
  }
}

export default Visualizer