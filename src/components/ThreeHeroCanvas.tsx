import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Eye, RotateCcw, Sparkles, Layers, Sliders, ChevronDown, ChevronUp } from 'lucide-react';

// Pre-allocated math objects to prevent GC in render loop (Three.js Skill Directive 4.3)
const _pointerTarget = new THREE.Vector2(0, 0);
const _currentPointer = new THREE.Vector2(0, 0);

interface ThreeHeroCanvasProps {
  onLoaded?: () => void;
}

export const ThreeHeroCanvas: React.FC<ThreeHeroCanvasProps> = ({ onLoaded }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [materialTheme, setMaterialTheme] = useState<'chrome' | 'titanium' | 'wireframe'>('chrome');
  const [neonGlow, setNeonGlow] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [isHudCollapsed, setIsHudCollapsed] = useState<boolean>(false);

  // References to dynamic 3D elements for interactive controls without re-mounting
  const sceneStateRef = useRef<{
    materials: {
      chromeFront: THREE.MeshPhysicalMaterial;
      titaniumBody: THREE.MeshStandardMaterial;
      neonEdges: THREE.MeshBasicMaterial;
      ringMaterial: THREE.MeshStandardMaterial;
      neonRingAccents: THREE.MeshBasicMaterial;
    } | null;
    emblemGroup: THREE.Group | null;
    gimbalInner: THREE.Mesh | null;
    gimbalOuter: THREE.Mesh | null;
    particles: THREE.Points | null;
    speedMultiplier: number;
    neonActive: boolean;
  }>({
    materials: null,
    emblemGroup: null,
    gimbalInner: null,
    gimbalOuter: null,
    particles: null,
    speedMultiplier: 1,
    neonActive: true,
  });

  // Keep ref in sync with state
  useEffect(() => {
    sceneStateRef.current.speedMultiplier = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    sceneStateRef.current.neonActive = neonGlow;
    if (sceneStateRef.current.materials) {
      sceneStateRef.current.materials.neonEdges.color.set(neonGlow ? '#00f0ff' : '#0e3a4a');
      sceneStateRef.current.materials.neonRingAccents.color.set(neonGlow ? '#38bdf8' : '#082f49');
    }
  }, [neonGlow]);

  useEffect(() => {
    if (!sceneStateRef.current.materials) return;
    const { chromeFront, titaniumBody } = sceneStateRef.current.materials;

    if (materialTheme === 'chrome') {
      chromeFront.wireframe = false;
      titaniumBody.wireframe = false;
      chromeFront.metalness = 0.98;
      chromeFront.roughness = 0.12;
      chromeFront.color.set('#f8fafc');
      titaniumBody.color.set('#1e293b');
      titaniumBody.roughness = 0.35;
      titaniumBody.metalness = 0.85;
    } else if (materialTheme === 'titanium') {
      chromeFront.wireframe = false;
      titaniumBody.wireframe = false;
      chromeFront.metalness = 0.9;
      chromeFront.roughness = 0.3;
      chromeFront.color.set('#334155');
      titaniumBody.color.set('#0f172a');
      titaniumBody.roughness = 0.5;
      titaniumBody.metalness = 0.95;
    } else if (materialTheme === 'wireframe') {
      chromeFront.wireframe = true;
      titaniumBody.wireframe = true;
      chromeFront.color.set('#00f0ff');
      titaniumBody.color.set('#38bdf8');
    }
  }, [materialTheme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#07090e', 0.035);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // 3. Modern Renderer setup (Three.js Directive 2.2)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Studio Environment Reflection (Three.js Directive 2.1)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    pmremGenerator.dispose();

    // 5. Lighting Rig (3-Point studio lighting)
    const ambientLight = new THREE.AmbientLight('#0f172a', 1.2);
    scene.add(ambientLight);

    // Key Light (Warm metallic highlight)
    const keyLight = new THREE.DirectionalLight('#ffffff', 2.8);
    keyLight.position.set(5, 6, 7);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill Light (Cool electric cyan rim)
    const fillLight = new THREE.DirectionalLight('#00f0ff', 3.5);
    fillLight.position.set(-6, -2, 4);
    scene.add(fillLight);

    // Backlight / Rim Light (Violet depth)
    const rimLight = new THREE.DirectionalLight('#8b5cf6', 2.2);
    rimLight.position.set(0, -6, -4);
    scene.add(rimLight);

    // 6. Materials library for STRAVEX Emblem
    const chromeFront = new THREE.MeshPhysicalMaterial({
      color: '#f8fafc',
      metalness: 0.98,
      roughness: 0.12,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
    });

    const titaniumBody = new THREE.MeshStandardMaterial({
      color: '#1e293b',
      metalness: 0.85,
      roughness: 0.35,
    });

    const neonEdges = new THREE.MeshBasicMaterial({
      color: '#00f0ff',
      wireframe: false,
    });

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: '#334155',
      metalness: 0.92,
      roughness: 0.25,
    });

    const neonRingAccents = new THREE.MeshBasicMaterial({
      color: '#38bdf8',
    });

    sceneStateRef.current.materials = {
      chromeFront,
      titaniumBody,
      neonEdges,
      ringMaterial,
      neonRingAccents,
    };

    // 7. Composite Procedural 3D Model: STRAVEX Geometric S Emblem
    // 3-12 distinct parts (Three.js Directive 1.3)
    const masterEmblemGroup = new THREE.Group();

    // Geometric 'S' Emblem Shape definition with faceted cyberpunk cuts
    const sShape = new THREE.Shape();
    // High-tech angular S polygon coordinates
    sShape.moveTo(-1.2, 1.4);
    sShape.lineTo(1.2, 1.4);
    sShape.lineTo(1.4, 1.2);
    sShape.lineTo(1.4, 0.4);
    sShape.lineTo(0.3, 0.4);
    sShape.lineTo(0.1, 0.2);
    sShape.lineTo(0.3, 0.0);
    sShape.lineTo(1.2, 0.0);
    sShape.lineTo(1.4, -0.2);
    sShape.lineTo(1.4, -1.4);
    sShape.lineTo(1.2, -1.6);
    sShape.lineTo(-1.2, -1.6);
    sShape.lineTo(-1.4, -1.4);
    sShape.lineTo(-1.4, -0.6);
    sShape.lineTo(-0.3, -0.6);
    sShape.lineTo(-0.1, -0.4);
    sShape.lineTo(-0.3, -0.2);
    sShape.lineTo(-1.2, -0.2);
    sShape.lineTo(-1.4, 0.0);
    sShape.lineTo(-1.4, 1.2);
    sShape.closePath();

    // Extruded Main S Body (Part 1: Titanium Structure)
    const extrudeSettings = {
      steps: 2,
      depth: 0.45,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelOffset: 0,
      bevelSegments: 4,
    };
    const sGeometry = new THREE.ExtrudeGeometry(sShape, extrudeSettings);
    sGeometry.center();
    const sBodyMesh = new THREE.Mesh(sGeometry, titaniumBody);
    sBodyMesh.castShadow = true;
    masterEmblemGroup.add(sBodyMesh);

    // Front Chrome Plate (Part 2: Polished Chrome Facet)
    const frontSettings = {
      steps: 1,
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3,
    };
    const frontGeom = new THREE.ExtrudeGeometry(sShape, frontSettings);
    frontGeom.center();
    const frontMesh = new THREE.Mesh(frontGeom, chromeFront);
    frontMesh.position.z = 0.28;
    masterEmblemGroup.add(frontMesh);

    // Back Chrome Plate (Part 3: Symmetrical Chrome Backing)
    const backMesh = new THREE.Mesh(frontGeom, chromeFront);
    backMesh.position.z = -0.28;
    masterEmblemGroup.add(backMesh);

    // Neon Edge Inlay Lines (Part 4: Glowing Electric Blue Channel)
    const edgesGeom = new THREE.EdgesGeometry(sGeometry, 25);
    const neonWire = new THREE.LineSegments(edgesGeom, neonEdges);
    masterEmblemGroup.add(neonWire);

    // Geometric Diamond Corner Accents (Parts 5, 6, 7, 8: Titanium & Neon bolts)
    const cornerPositions = [
      [-1.5, 1.7, 0],
      [1.5, 1.7, 0],
      [-1.5, -1.9, 0],
      [1.5, -1.9, 0],
    ];
    const diamondGeom = new THREE.OctahedronGeometry(0.12, 0);
    cornerPositions.forEach(([x, y, z]) => {
      const bolt = new THREE.Mesh(diamondGeom, neonRingAccents);
      bolt.position.set(x, y, z);
      masterEmblemGroup.add(bolt);
    });

    scene.add(masterEmblemGroup);
    sceneStateRef.current.emblemGroup = masterEmblemGroup;

    // 8. Orbiting Geometric Rings (Parts 9 & 10: Gyroscope / Orbital Rings)
    const innerRingGeom = new THREE.TorusGeometry(2.35, 0.03, 16, 80);
    const innerRing = new THREE.Mesh(innerRingGeom, ringMaterial);
    scene.add(innerRing);
    sceneStateRef.current.gimbalInner = innerRing;

    const outerRingGeom = new THREE.TorusGeometry(2.8, 0.025, 16, 90);
    const outerRing = new THREE.Mesh(outerRingGeom, ringMaterial);
    scene.add(outerRing);
    sceneStateRef.current.gimbalOuter = outerRing;

    // Add glowing marker nodes on the rings (Parts 11 & 12)
    const ringNodeGeom = new THREE.SphereGeometry(0.06, 12, 12);
    const ringNode1 = new THREE.Mesh(ringNodeGeom, neonRingAccents);
    ringNode1.position.set(2.35, 0, 0);
    innerRing.add(ringNode1);

    const ringNode2 = new THREE.Mesh(ringNodeGeom, neonRingAccents);
    ringNode2.position.set(-2.35, 0, 0);
    innerRing.add(ringNode2);

    const ringNode3 = new THREE.Mesh(ringNodeGeom, neonRingAccents);
    ringNode3.position.set(0, 2.8, 0);
    outerRing.add(ringNode3);

    // 9. Floating Ambient 3D Particle Cloud
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
      particleScales[i] = Math.random() * 0.06 + 0.02;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: '#00f0ff',
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    sceneStateRef.current.particles = particles;

    // 10. Contact Shadow Grounding Disc (Three.js Directive 3.2)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
      gradient.addColorStop(0.3, 'rgba(14, 165, 233, 0.2)');
      gradient.addColorStop(0.7, 'rgba(7, 9, 14, 0.08)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.8;
    scene.add(shadowPlane);

    // Notify parent on loaded
    if (onLoaded) {
      onLoaded();
    }

    // 11. Mouse / Pointer Interaction Handling
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      _pointerTarget.set(x, y);
    };

    window.addEventListener('mousemove', handlePointerMove);

    // 12. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 13. Animation Loop with silky exponential damping
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      const speed = sceneStateRef.current.speedMultiplier;

      // Smooth pointer interpolation
      _currentPointer.x = THREE.MathUtils.damp(_currentPointer.x, _pointerTarget.x, 4.0, delta);
      _currentPointer.y = THREE.MathUtils.damp(_currentPointer.y, _pointerTarget.y, 4.0, delta);

      // Rotate and float the central STRAVEX Emblem
      if (masterEmblemGroup) {
        masterEmblemGroup.rotation.y = time * 0.45 * speed + _currentPointer.x * 0.6;
        masterEmblemGroup.rotation.x = Math.sin(time * 0.6) * 0.12 - _currentPointer.y * 0.5;
        masterEmblemGroup.position.y = Math.sin(time * 1.2) * 0.15;
      }

      // Orbital Rings differential rotation
      if (innerRing) {
        innerRing.rotation.x = time * 0.3 * speed;
        innerRing.rotation.y = time * 0.2 * speed;
      }

      if (outerRing) {
        outerRing.rotation.y = -time * 0.25 * speed;
        outerRing.rotation.z = Math.sin(time * 0.4) * 0.3;
      }

      // Particle subtle drift
      if (particles) {
        particles.rotation.y = time * 0.05 * speed;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 14. Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      sGeometry.dispose();
      frontGeom.dispose();
      innerRingGeom.dispose();
      outerRingGeom.dispose();
      particleGeometry.dispose();
      shadowTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  const handleResetCamera = () => {
    _pointerTarget.set(0, 0);
    setRotationSpeed(1);
    setMaterialTheme('chrome');
    setNeonGlow(true);
  };

  return (
    <div className="relative w-full h-full min-h-[550px] lg:min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Three.js Isolated Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing" />

      {/* Subtle Background Radial Gradients for Lighting Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[480px] h-[340px] md:h-[480px] bg-[#00f0ff]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/3 w-[260px] h-[260px] bg-[#8b5cf6]/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* Ergonomic Collapsible Bottom Control Dock (Three.js Directive Section 5) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-[700px] transition-transform duration-300">
        {/* Toggle Cinema / Zen Mode Tab */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsHudCollapsed(!isHudCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-slate-400 hover:text-[#00f0ff] bg-[#07090e]/80 border border-slate-800 rounded-t-md backdrop-blur-md transition-colors"
            title="Toggle 3D Viewport Controls"
          >
            <Sliders className="w-3 h-3 text-[#00f0ff]" />
            <span>{isHudCollapsed ? 'Inspect 3D Emblem' : 'Collapse Dock'}</span>
            {isHudCollapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Unified Bottom Glass Dock */}
        {!isHudCollapsed && (
          <div className="glass-panel p-3 rounded-xl shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Finish Selector */}
            <div className="flex items-center gap-1">
              <span className="text-slate-400 font-mono hidden sm:inline mr-1">Finish:</span>
              <button
                onClick={() => setMaterialTheme('chrome')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  materialTheme === 'chrome'
                    ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Chrome
              </button>
              <button
                onClick={() => setMaterialTheme('titanium')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  materialTheme === 'titanium'
                    ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Titanium
              </button>
              <button
                onClick={() => setMaterialTheme('wireframe')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  materialTheme === 'wireframe'
                    ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Wireframe
              </button>
            </div>

            {/* Neon Accent Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNeonGlow(!neonGlow)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-all ${
                  neonGlow
                    ? 'bg-sky-500/20 text-[#00f0ff] border border-[#00f0ff]/40'
                    : 'text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#00f0ff]" />
                <span>Neon Edges</span>
              </button>

              {/* Speed Preset Switcher */}
              <button
                onClick={() => setRotationSpeed(rotationSpeed === 1 ? 2 : rotationSpeed === 2 ? 0.3 : 1)}
                className="flex items-center gap-1 px-2.5 py-1 rounded font-mono text-slate-300 hover:text-[#00f0ff] bg-slate-900/60 border border-slate-800 transition-colors"
                title="Change rotation speed"
              >
                <Layers className="w-3 h-3 text-slate-400" />
                <span>{rotationSpeed === 1 ? '1x' : rotationSpeed === 2 ? '2x' : '0.3x'}</span>
              </button>

              {/* Reset Cam */}
              <button
                onClick={handleResetCamera}
                className="p-1.5 text-slate-400 hover:text-[#00f0ff] hover:bg-slate-800/60 rounded transition-colors"
                title="Reset View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
