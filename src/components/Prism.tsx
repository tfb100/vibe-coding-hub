import React, { useEffect, useRef } from 'react';
import { Renderer, Triangle, Program, Mesh } from 'ogl';

interface PrismProps {
  height?: number;
  baseWidth?: number;
  animationType?: 'rotate' | 'hover' | '3drotate' | 'none';
  glow?: number;
  offset?: { x: number; y: number };
  noise?: number;
  transparent?: boolean;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  hoverStrength?: number;
  inertia?: number;
  bloom?: number;
  suspendWhenOffscreen?: boolean;
  timeScale?: number;
}

const Prism: React.FC<PrismProps> = ({
  height = 3.5,
  baseWidth = 5.5,
  animationType = 'rotate',
  glow = 1,
  offset = { x: 0, y: 0 },
  noise = 0.5,
  transparent = true,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  hoverStrength = 2,
  inertia = 0.05,
  bloom = 1,
  suspendWhenOffscreen = false,
  timeScale = 0.5
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const H = Math.max(0.001, height);
    const BW = Math.max(0.001, baseWidth);
    const GLOW = Math.max(0.0, glow);
    const NOISE = Math.max(0.0, noise);
    const offX = offset?.x ?? 0;
    const offY = offset?.y ?? 0;
    const SCALE = Math.max(0.001, scale);
    const HUE = hueShift || 0;
    const CFREQ = Math.max(0.0, colorFrequency || 1);
    const BLOOM = Math.max(0.0, bloom || 1);
    const TS = Math.max(0, timeScale || 1);
    const HOVSTR = Math.max(0, hoverStrength || 1);
    const INERT = Math.max(0, Math.min(1, inertia || 0.12));

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const renderer = new Renderer({
      dpr,
      alpha: transparent,
      antialias: false
    });
    const gl = renderer.gl;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (container as any).gl = gl;
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);

    Object.assign(gl.canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      display: 'block'
    });
    container.appendChild(gl.canvas);

    const vertex = /* glsl */ `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = /* glsl */ `
      precision highp float;
      uniform vec2  iResolution;
      uniform float iTime;
      uniform float uHeight;
      uniform float uBaseHalf;
      uniform mat3  uRot;
      uniform int   uUseBaseWobble;
      uniform float uGlow;
      uniform vec2  uOffset;
      uniform float uNoise;
      uniform float uHueShift;
      uniform float uColorFreq;
      uniform float uSaturation;
      uniform float uScale;
      uniform float uBloom;

      float hash(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453123);
      }

      float noise3D(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
              mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
          mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
              mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z
        );
      }

      float sdPrism(vec3 p, float h, float baseHalf) {
        vec3 q = abs(p);
        return max(q.z - h, max(q.x * 0.866025 + p.y * 0.5, -p.y) - baseHalf * 0.5);
      }

      vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.00, 0.33, 0.67);
        return a + b * cos(6.28318 * (c * t * uColorFreq + d + uHueShift/360.0));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / min(iResolution.y, iResolution.x);
        uv *= uScale;
        uv += uOffset;

        vec3 ro = vec3(0.0, 0.0, 5.0);
        vec3 rd = normalize(vec3(uv, -1.5));
        
        vec3 col = vec3(0.0);
        float t = 0.0;
        
        for(int i = 0; i < 64; i++) {
          vec3 p = ro + rd * t;
          p *= uRot;
          
          float d = sdPrism(p, uHeight, uBaseHalf);
          
          float n = noise3D(p * 2.0 + iTime * 0.2) * uNoise;
          d += n * 0.1;
          
          float glow = uGlow * 0.02 / (abs(d) + 0.01);
          col += palette(t * 0.1 + iTime * 0.1) * glow * uBloom;
          
          if(d < 0.001 || t > 10.0) break;
          t += d * 0.5;
        }
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iResolution: { value: [0, 0] },
        iTime: { value: 0 },
        uHeight: { value: H },
        uBaseHalf: { value: BW * 0.5 },
        uRot: { value: [1, 0, 0, 0, 1, 0, 0, 0, 1] },
        uUseBaseWobble: { value: animationType === 'rotate' ? 1 : 0 },
        uGlow: { value: GLOW },
        uOffset: { value: [offX, offY] },
        uNoise: { value: NOISE },
        uHueShift: { value: HUE },
        uColorFreq: { value: CFREQ },
        uSaturation: { value: transparent ? 1.5 : 1 },
        uScale: { value: SCALE },
        uBloom: { value: BLOOM }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    let animationId: number;
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    function resize() {
      const { clientWidth, clientHeight } = container!;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.iResolution.value = [clientWidth * dpr, clientHeight * dpr];
    }
    window.addEventListener('resize', resize);
    resize();

    function update(time: number) {
      animationId = requestAnimationFrame(update);
      const t = time * 0.001 * TS;
      
      mouse.x += (targetMouse.x - mouse.x) * INERT;
      mouse.y += (targetMouse.y - mouse.y) * INERT;

      let rx = 0, ry = 0;
      const rz = 0;
      if (animationType === 'rotate') {
        rx = t * 0.5;
        ry = t * 0.3;
      } else if (animationType === 'hover') {
        rx = mouse.y * HOVSTR;
        ry = mouse.x * HOVSTR;
      } else if (animationType === '3drotate') {
        rx = t * 0.2 + mouse.y * 0.5;
        ry = t * 0.3 + mouse.x * 0.5;
      }

      const cx = Math.cos(rx), sx = Math.sin(rx);
      const cy = Math.cos(ry), sy = Math.sin(ry);
      const cz = Math.cos(rz), sz = Math.sin(rz);

      program.uniforms.uRot.value = [
        cy * cz, -cy * sz, sy,
        cx * sz + sx * sy * cz, cx * cz - sx * sy * sz, -sx * cy,
        sx * sz - cx * sy * cz, sx * cz + cx * sy * sz, cx * cy
      ];

      program.uniforms.iTime.value = t;
      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
      if (container && container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [height, baseWidth, animationType, glow, offset?.x, offset?.y, noise, transparent, scale, hueShift, colorFrequency, hoverStrength, inertia, bloom, suspendWhenOffscreen, timeScale]);

  return <div className="w-full h-full relative" ref={containerRef} />;
};

export default Prism;
