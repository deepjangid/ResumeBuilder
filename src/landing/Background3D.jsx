import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion.js'

const ACCENT_COLORS = {
  gold: '#fbbf24',
  teal: '#2dd4bf',
  violet: '#a78bfa',
}

function hashSeed(input) {
  let hash = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function mulberry32(seed) {
  let t = seed >>> 0
  return function random() {
    t += 0x6d2b79f5
    let x = t
    x = Math.imul(x ^ (x >>> 15), x | 1)
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61)
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

function FloatingShapes({ accent = 'gold' }) {
  const groupRef = useRef(null)

  const shapes = useMemo(() => {
    const rand = mulberry32(hashSeed(accent))
    const palette = [
      ACCENT_COLORS[accent] ?? ACCENT_COLORS.gold,
      '#93c5fd',
      '#e2e8f0',
    ]

    return Array.from({ length: 18 }, (_, index) => {
      const radius = 2.5 + rand() * 4.5
      const theta = rand() * Math.PI * 2
      const y = (rand() - 0.5) * 2.2
      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius - 3
      const scale = 0.28 + rand() * 0.55
      const color = palette[index % palette.length]

      return {
        id: index,
        position: [x, y, z],
        rotation: [
          rand() * Math.PI,
          rand() * Math.PI,
          rand() * Math.PI,
        ],
        scale,
        color,
        kind: index % 3,
      }
    })
  }, [accent])

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return
    const t = state.clock.getElapsedTime()
    group.rotation.y = t * 0.08
    group.rotation.x = t * 0.04
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape) => (
        <mesh
          key={shape.id}
          position={shape.position}
          rotation={shape.rotation}
          scale={shape.scale}
        >
          {shape.kind === 0 ? (
            <torusGeometry args={[0.55, 0.2, 16, 32]} />
          ) : shape.kind === 1 ? (
            <icosahedronGeometry args={[0.6, 0]} />
          ) : (
            <boxGeometry args={[0.8, 0.8, 0.8]} />
          )}
          <meshStandardMaterial
            color={shape.color}
            metalness={0.7}
            roughness={0.25}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </group>
  )
}

function Scene({ accent }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 3, 2]} intensity={0.9} />
      <pointLight position={[-4, -2, -2]} intensity={0.6} />
      <FloatingShapes accent={accent} />
    </>
  )
}

export default function Background3D({ accent }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  if (prefersReducedMotion) return null

  return (
    <div className="bg3d" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 48 }}
        dpr={[1, 1.4]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <Scene accent={accent} />
      </Canvas>
    </div>
  )
}
