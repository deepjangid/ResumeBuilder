import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useState, useEffect } from 'react'
import { OrbitControls, Sparkles, Stars, Html } from '@react-three/drei'
import * as THREE from 'three'
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js'

const ACCENT_COLORS = {
  gold: '#fbbf24',
  teal: '#2dd4bf',
  violet: '#a78bfa',
}

const SECTION_CAMERAS = {
  overview: { pos: [0, 2.5, 9.5], look: [0, 0.6, 0] },
  process: { pos: [-4.9, 1.8, 4.2], look: [-4.9, 0.9, 0] },
  metrics: { pos: [0, 1.6, 4.5], look: [0, 0.9, 0] },
  projects: { pos: [5.0, 1.8, 4.5], look: [5.0, 0.9, 0] },
}

// Camera controller to interpolate target coordinates and look-at
function CameraController({ activeSection }) {
  const { camera } = useThree()
  const controlsRef = useRef()

  const target = useMemo(() => SECTION_CAMERAS[activeSection] || SECTION_CAMERAS.overview, [activeSection])

  useFrame(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current

      // Lerp camera position
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.pos[0], 0.06)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.pos[1], 0.06)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, target.pos[2], 0.06)

      // Lerp OrbitControls look-at target
      controls.target.x = THREE.MathUtils.lerp(controls.target.x, target.look[0], 0.06)
      controls.target.y = THREE.MathUtils.lerp(controls.target.y, target.look[1], 0.06)
      controls.target.z = THREE.MathUtils.lerp(controls.target.z, target.look[2], 0.06)

      controls.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2 - 0.05}
      minDistance={2.5}
      maxDistance={15}
    />
  )
}

// Sub-Component: 3D Process Analyst Workflow Hub
const PROCESS_NODES = [
  { id: 'elicit', label: 'Elicitation', pos: [-6.4, 0.4, 0], color: '#fbbf24', desc: 'Facilitating stakeholder workshops, gathering functional requirements, and writing detailed user stories.' },
  { id: 'analyze', label: 'Analysis', pos: [-5.7, 1.2, 0.4], color: '#ef4444', desc: 'Performing root cause analysis, GAP analysis, and SWOT analysis to identify operational bottlenecks.' },
  { id: 'map', label: 'Mapping', pos: [-4.9, 0.4, -0.2], color: '#3b82f6', desc: 'Creating current-state (As-Is) and future-state (To-Be) process maps using BPMN and UML standards.' },
  { id: 'quantify', label: 'Quantification', pos: [-4.1, 1.2, 0.4], color: '#10b981', desc: 'Identifying and quantifying potential benefits, building business cases, and validating benefits estimation.' },
  { id: 'standard', label: 'Standardization', pos: [-3.4, 0.4, 0], color: '#8b5cf6', desc: 'Drafting SOP documentation, establishing quality protocols, and ensuring process standardization across teams.' },
]

function ProcessHub({ setSelectedItem, selectedItem }) {
  const [hoveredNode, setHoveredNode] = useState(null)

  // 3D connection cylinders helper
  const connections = useMemo(() => {
    const lines = []
    for (let i = 0; i < PROCESS_NODES.length - 1; i++) {
      lines.push({
        id: `c-${i}`,
        from: PROCESS_NODES[i].pos,
        to: PROCESS_NODES[i + 1].pos,
      })
    }
    return lines
  }, [])

  return (
    <group>
      {/* Dynamic Connector lines */}
      {connections.map((c) => {
        const pStart = new THREE.Vector3(...c.from)
        const pEnd = new THREE.Vector3(...c.to)
        const distance = pStart.distanceTo(pEnd)
        const position = pStart.clone().add(pEnd).multiplyScalar(0.5)
        const direction = new THREE.Vector3().subVectors(pEnd, pStart).normalize()
        const alignVector = new THREE.Vector3(0, 1, 0)
        const quaternion = new THREE.Quaternion().setFromUnitVectors(alignVector, direction)

        return (
          <mesh key={c.id} position={position} quaternion={quaternion}>
            <cylinderGeometry args={[0.02, 0.02, distance, 8]} />
            <meshBasicMaterial color="#334155" transparent opacity={0.6} />
          </mesh>
        )
      })}

      {/* Nodes */}
      {PROCESS_NODES.map((node) => {
        const isHovered = hoveredNode === node.id
        const isSelected = selectedItem?.type === 'process' && selectedItem?.id === node.id

        return (
          <group
            key={node.id}
            position={node.pos}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedItem({ type: 'process', id: node.id, title: node.label, description: node.desc })
            }}
            onPointerOver={(e) => {
              e.stopPropagation()
              setHoveredNode(node.id)
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={(e) => {
              e.stopPropagation()
              setHoveredNode(null)
              document.body.style.cursor = 'default'
            }}
          >
            <mesh scale={isHovered ? 1.25 : isSelected ? 1.15 : 1.0}>
              <sphereGeometry args={[0.18, 32, 32]} />
              <meshStandardMaterial
                color={isHovered ? '#ffffff' : node.color}
                emissive={node.color}
                emissiveIntensity={isHovered ? 0.9 : isSelected ? 0.75 : 0.4}
                roughness={0.1}
                metalness={0.8}
              />
            </mesh>

            {/* Label - Local HTML element */}
            <Html
              position={[0, 0.35, 0]}
              center
              style={{
                color: '#ffffff',
                fontSize: '11px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                background: 'rgba(15, 23, 42, 0.85)',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {node.label}
            </Html>
          </group>
        )
      })}
    </group>
  )
}

// Sub-Component: 3D Metrics Bar Chart (Analytics)
const METRIC_ITEMS = [
  { id: 'exp', label: 'Years Exp', val: '6+', height: 1.1, pos: [-1.2, 0, 0], color: '#fbbf24', desc: '6+ Years of cross-functional business analysis and process improvement expertise across multiple domains.' },
  { id: 'gap', label: 'Requirements Gap', val: '-15%', height: 1.4, pos: [-0.4, 0, 0.1], color: '#3b82f6', desc: 'Reduced requirement gaps by 15% through optimized stakeholder workshops and delivery alignments.' },
  { id: 'defects', label: 'QA Defects Leakage', val: '-25%', height: 1.7, pos: [0.4, 0, -0.1], color: '#10b981', desc: 'Minimized post-release issues by 25% by reforming regression coverage rules and UAT processes.' },
  { id: 'active', label: 'Active Projects', val: '8+ Coordinated', height: 1.2, pos: [1.2, 0, 0], color: '#8b5cf6', desc: 'Coordinated requirements, mapping, and delivery sprint flows for 8+ active projects simultaneously.' },
]

function MetricsWall({ setSelectedItem, selectedItem }) {
  const [hoveredBar, setHoveredBar] = useState(null)

  return (
    <group>
      {METRIC_ITEMS.map((item) => {
        const isHovered = hoveredBar === item.id
        const isSelected = selectedItem?.type === 'metric' && selectedItem?.id === item.id

        return (
          <group
            key={item.id}
            position={item.pos}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedItem({ type: 'metric', id: item.id, title: item.label, description: item.desc, value: item.val })
            }}
            onPointerOver={(e) => {
              e.stopPropagation()
              setHoveredBar(item.id)
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={(e) => {
              e.stopPropagation()
              setHoveredBar(null)
              document.body.style.cursor = 'default'
            }}
          >
            {/* 3D Bar */}
            <mesh
              position={[0, item.height / 2, 0]}
              scale={isHovered ? [1.1, 1.0, 1.1] : isSelected ? [1.05, 1.0, 1.05] : [1.0, 1.0, 1.0]}
            >
              <boxGeometry args={[0.5, item.height, 0.5]} />
              <meshStandardMaterial
                color={isHovered ? '#ffffff' : item.color}
                roughness={0.2}
                metalness={0.6}
                transparent
                opacity={isHovered ? 0.95 : isSelected ? 0.85 : 0.65}
              />
            </mesh>

            {/* Value Text - Local HTML */}
            <Html
              position={[0, item.height + 0.35, 0]}
              center
              style={{
                color: '#ffffff',
                fontFamily: 'var(--font-sans)',
                fontWeight: 'bold',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {item.val}
            </Html>

            {/* Label Text - Local HTML */}
            <Html
              position={[0, -0.2, 0]}
              center
              style={{
                color: '#94a3b8',
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {item.label}
            </Html>
          </group>
        )
      })}
    </group>
  )
}

// Sub-Component: 3D Projects Kanban Board
const KANBAN_CARDS = [
  { id: 'fitcy', col: 1, title: 'Fitcy Platform', x: 4.8, y: 1.1, z: 0.1, color: '#fbbf24', desc: 'Analyzed user journeys and mapped future-state subscription flows using BPMN, reducing requirement gaps by 15%.' },
  { id: 'food', col: 2, title: 'Food Manufacturing', x: 5.8, y: 1.1, z: -0.1, color: '#ef4444', desc: 'Designed comprehensive process maps for raw material tracking using BPMN, improving inventory reporting accuracy.' },
  { id: 'payroll', col: 0, title: 'HSL Payroll System', x: 3.8, y: 1.1, z: 0.0, color: '#3b82f6', desc: 'Mapped complex payroll and attendance workflows using BPMN process maps, standardizing business rules.' },
  { id: 'oht', col: 0, title: 'Operational Recovery', x: 3.8, y: 0.4, z: -0.05, color: '#8b5cf6', desc: 'Formulated a process recovery plan, documented current inefficiencies, and designed to-be technology integration solutions.' },
  { id: 'donor', col: 2, title: 'Donor Data Optimization', x: 5.8, y: 0.4, z: 0.1, color: '#10b981', desc: 'Analyzed and structured donor workflows using Access and Excel, utilizing PivotTables for data-driven decisions.' }
]

function ProjectsBoard({ setSelectedItem, selectedItem }) {
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <group>
      {/* Columns Background Board */}
      <mesh position={[4.8, 0.8, -0.3]}>
        <boxGeometry args={[2.7, 1.8, 0.05]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.4} roughness={0.9} />
      </mesh>

      {/* Column Titles - Local HTML */}
      <Html position={[3.8, 1.8, -0.2]} center style={{ color: '#94a3b8', fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 'bold', pointerEvents: 'none' }}>ANALYZED</Html>
      <Html position={[4.8, 1.8, -0.2]} center style={{ color: '#94a3b8', fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 'bold', pointerEvents: 'none' }}>IN PROGRESS</Html>
      <Html position={[5.8, 1.8, -0.2]} center style={{ color: '#94a3b8', fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 'bold', pointerEvents: 'none' }}>STANDARDIZED</Html>

      {/* Project Cards */}
      {KANBAN_CARDS.map((card) => {
        const isHovered = hoveredCard === card.id
        const isSelected = selectedItem?.type === 'project' && selectedItem?.id === card.id

        return (
          <group
            key={card.id}
            position={[card.x, card.y, card.z]}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedItem({ type: 'project', id: card.id, title: card.title, description: card.desc, col: card.col })
            }}
            onPointerOver={(e) => {
              e.stopPropagation()
              setHoveredCard(card.id)
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={(e) => {
              e.stopPropagation()
              setHoveredCard(null)
              document.body.style.cursor = 'default'
            }}
          >
            {/* Card Plane */}
            <mesh scale={isHovered ? 1.08 : isSelected ? 1.04 : 1.0}>
              <boxGeometry args={[0.75, 0.5, 0.06]} />
              <meshStandardMaterial
                color={isHovered ? '#ffffff' : '#334155'}
                roughness={0.3}
                metalness={0.7}
                transparent
                opacity={isHovered ? 0.95 : isSelected ? 0.85 : 0.65}
              />
            </mesh>

            {/* Left strip showing accent color */}
            <mesh position={[-0.35, 0, 0.035]}>
              <boxGeometry args={[0.04, 0.44, 0.01]} />
              <meshBasicMaterial color={card.color} />
            </mesh>

            {/* Card Title & Desc - Local HTML */}
            <Html
              position={[0.02, 0, 0.045]}
              center
              style={{
                width: '115px',
                pointerEvents: 'none',
                color: isHovered ? '#0f172a' : '#ffffff',
                fontFamily: 'var(--font-sans)',
                transition: 'color 0.2s ease',
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '9px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {card.title}
              </div>
              <div style={{ fontSize: '7px', opacity: 0.8, marginTop: '3px', lineHeight: '1.2' }}>
                {card.desc.slice(0, 48) + '...'}
              </div>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

function Scene({ accent, activeSection, selectedItem, setSelectedItem }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} />
      <pointLight position={[-6, 3, 2]} intensity={0.7} color={ACCENT_COLORS[accent]} />
      <pointLight position={[6, 3, 2]} intensity={0.7} color={ACCENT_COLORS[accent]} />

      <Stars radius={120} depth={40} count={1200} factor={3.5} saturation={0.5} fade speed={1} />
      <Sparkles count={55} scale={14} size={1.2} speed={0.4} color={ACCENT_COLORS[accent] || '#fbbf24'} />

      {/* Grid Floor */}
      <gridHelper args={[26, 26, '#334155', '#1e293b']} position={[0, -0.3, 0]} />

      {/* Sub-scenes */}
      <ProcessHub setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
      <MetricsWall setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
      <ProjectsBoard setSelectedItem={setSelectedItem} selectedItem={selectedItem} />

      {/* Camera Glide */}
      <CameraController activeSection={activeSection} />
    </>
  )
}

export default function Background3D({ accent = 'gold', activeSection = 'overview', selectedItem, setSelectedItem }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  if (prefersReducedMotion) return null

  return (
    <div className="bg3d" aria-hidden="true" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, 2.5, 9.5], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Scene
          accent={accent}
          activeSection={activeSection}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </Canvas>
    </div>
  )
}
