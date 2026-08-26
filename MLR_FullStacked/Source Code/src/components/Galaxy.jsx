import { useEffect, useRef } from 'react';
import { Color, Mesh, Program, Renderer, Triangle } from 'ogl';
import './Galaxy.css';

const vertexShader = `attribute vec2 position; attribute vec2 uv; varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}`;
const fragmentShader = `precision highp float;
uniform float uTime; uniform vec3 uResolution; uniform vec2 uMouse; uniform float uDensity; uniform float uGlow; uniform float uHue;
varying vec2 vUv;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
vec3 hsv(vec3 c){vec4 k=vec4(1.,.666666,.333333,3.);vec3 p=abs(fract(c.xxx+k.xyz)*6.-k.www);return c.z*mix(k.xxx,clamp(p-k.xxx,0.,1.),c.y);}
void main(){vec2 uv=(vUv-.5)*vec2(uResolution.x/uResolution.y,1.);uv+=(uMouse-.5)*.035;float t=uTime*.018;vec3 color=vec3(0.);for(float layer=0.;layer<3.;layer+=1.){vec2 grid=uv*(24.+layer*17.)*uDensity;grid+=vec2(t*(layer+1.),-t*.35);vec2 id=floor(grid);vec2 cell=fract(grid)-.5;float seed=hash(id+layer*31.);vec2 drift=vec2(sin(t*2.+seed*8.),cos(t*1.4+seed*7.))*0.16;float d=length(cell-drift);float star=smoothstep(.075,.0,d)*(0.4+seed*.9);float twinkle=.72+.28*sin(uTime*.9+seed*40.);vec3 starColor=hsv(vec3(fract(uHue/360.+seed*.08),.72,.92));color+=star*twinkle*starColor*(1.-layer*.2);}float glow=smoothstep(.9,.0,length(uv))*.035*uGlow;color+=vec3(1.,.14,.04)*glow;gl_FragColor=vec4(color,clamp(length(color)*1.8,0.,.92));}`;

export default function Galaxy({ density = 1, hueShift = 38, glowIntensity = .65, speed = 1, mouseInteraction = true, mouseRepulsion = true, disableAnimation = false, transparent = true, className = '', ...props }) {
  const containerRef = useRef(null);
  const mouseRef = useRef([.5, .5]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const renderer = new Renderer({ alpha: transparent, premultipliedAlpha: false, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, transparent ? 0 : 1);
    const program = new Program(gl, { vertex: vertexShader, fragment: fragmentShader, uniforms: { uTime: { value: 0 }, uResolution: { value: new Color(1, 1, 1) }, uMouse: { value: mouseRef.current }, uDensity: { value: density }, uGlow: { value: glowIntensity }, uHue: { value: hueShift } } });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const resize = () => { const rect = container.getBoundingClientRect(); renderer.setSize(Math.max(rect.width, 1), Math.max(rect.height, 1)); program.uniforms.uResolution.value = new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / Math.max(gl.canvas.height, 1)); };
    const move = (event) => { const rect = container.getBoundingClientRect(); mouseRef.current = [(event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height]; };
    const observer = new ResizeObserver(resize);
    observer.observe(container); resize();
    if (mouseInteraction) container.addEventListener('pointermove', move, { passive: true });
    gl.canvas.className = 'galaxy-canvas'; container.appendChild(gl.canvas);
    let frame; const render = (time) => { if (!disableAnimation) program.uniforms.uTime.value = time * speed; program.uniforms.uMouse.value = mouseRef.current; renderer.render({ scene: mesh }); frame = requestAnimationFrame(render); }; frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); if (mouseInteraction) container.removeEventListener('pointermove', move); gl.getExtension('WEBGL_lose_context')?.loseContext(); container.replaceChildren(); };
  }, [density, disableAnimation, glowIntensity, hueShift, mouseInteraction, speed, transparent]);

  return <div ref={containerRef} className={`galaxy-container ${className}`.trim()} aria-hidden="true" {...props} />;
}
