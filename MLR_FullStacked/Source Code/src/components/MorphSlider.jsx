import { useEffect, useMemo, useRef, useState } from 'react';
import { Renderer, Triangle, Program, Mesh, Texture } from 'ogl';
import gsap from 'gsap';
import './MorphSlider.css';

const vertex = `attribute vec2 position; attribute vec2 uv; varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}`;
const fragment = `precision highp float; uniform sampler2D currentTexture; uniform sampler2D nextTexture; uniform float progress; uniform float time; uniform float intensity; uniform vec2 resolution; varying vec2 vUv; vec2 cover(vec2 uv, vec2 res, vec2 image){float screen=res.x/res.y;float source=image.x/image.y;vec2 scale=vec2(1.);if(screen>source)scale.y=source/screen;else scale.x=screen/source;return (uv-.5)*scale+.5;} void main(){float p=smoothstep(0.,1.,progress);float wave=sin((vUv.y+time*.08)*18.)*.012*intensity*sin(p*3.14159);vec2 uv=vUv+vec2(wave*(1.-p),wave*p);vec2 uvC=cover(uv, resolution, vec2(1.6,1.));vec2 uvN=cover(uv, resolution, vec2(1.6,1.));vec4 a=texture2D(currentTexture,uvC);vec4 b=texture2D(nextTexture,uvN);float mask=smoothstep(p-.18,p+.18,vUv.x+sin(vUv.y*12.)*.05*intensity);gl_FragColor=mix(a,b,mask);}`;

const fallback = (gl) => new Texture(gl, { image: new Uint8Array([24, 8, 10, 255]), width: 1, height: 1 });

export default function MorphSlider({ items = [], startIndex = 0, duration = 1.1, intensity = .55, drift = .4, autoplay = false, autoplayDelay = 4, radius = 16, showCaptions = true, showControls = true, showIndicators = true, className = '' }) {
  const hostRef = useRef(null);
  const engineRef = useRef(null);
  const currentIndexRef = useRef(startIndex);
  const [index, setIndex] = useState(startIndex);
  const [hovering, setHovering] = useState(false);
  const safeItems = useMemo(() => items.filter((item) => item?.image), [items]);

  useEffect(() => {
    if (!hostRef.current || safeItems.length < 1) return undefined;
    const host = hostRef.current;
    currentIndexRef.current = startIndex % safeItems.length;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const textures = safeItems.map(() => fallback(gl));
    const sizes = safeItems.map(() => [1.6, 1]);
    const program = new Program(gl, { vertex, fragment, uniforms: { currentTexture: { value: textures[startIndex % safeItems.length] }, nextTexture: { value: textures[startIndex % safeItems.length] }, progress: { value: 0 }, time: { value: 0 }, intensity: { value: intensity }, resolution: { value: [1, 1] } } });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    gl.canvas.className = 'morph-slider-canvas';
    host.appendChild(gl.canvas);
    const resize = () => { const rect = host.getBoundingClientRect(); renderer.setSize(rect.width, rect.height); program.uniforms.resolution.value = [rect.width, rect.height]; };
    const observer = new ResizeObserver(resize); observer.observe(host); resize();
    safeItems.forEach((item, itemIndex) => { const image = new Image(); image.crossOrigin = 'anonymous'; image.src = item.image; image.onload = () => { const texture = new Texture(gl, { generateMipmaps: false }); texture.image = image; textures[itemIndex] = texture; sizes[itemIndex] = [image.naturalWidth || 1, image.naturalHeight || 1]; if (itemIndex === currentIndexRef.current) program.uniforms.currentTexture.value = texture; }; });
    let frame; const loop = (time) => { program.uniforms.time.value = time * .001 * drift; renderer.render({ scene: mesh }); frame = requestAnimationFrame(loop); }; frame = requestAnimationFrame(loop);
    const go = (direction) => { const target = (currentIndexRef.current + direction + safeItems.length) % safeItems.length; currentIndexRef.current = target; program.uniforms.nextTexture.value = textures[target]; gsap.fromTo(program.uniforms.progress, { value: 0 }, { value: 1, duration, ease: 'power2.inOut', onComplete: () => { program.uniforms.currentTexture.value = textures[target]; program.uniforms.progress.value = 0; setIndex(target); } }); };
    engineRef.current = { next: () => go(1), prev: () => go(-1) };
    return () => { cancelAnimationFrame(frame); observer.disconnect(); engineRef.current = null; gl.getExtension('WEBGL_lose_context')?.loseContext(); host.replaceChildren(); };
  // The slider intentionally reinitializes when its item set changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeItems]);

  useEffect(() => { if (!autoplay || hovering || safeItems.length < 2) return undefined; const timer = window.setInterval(() => engineRef.current?.next(), autoplayDelay * 1000); return () => clearInterval(timer); }, [autoplay, autoplayDelay, hovering, safeItems.length, index]);
  return <div className={`morph-slider ${className}`.trim()} style={{ borderRadius: `${radius}px` }} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
    {safeItems[index]?.image && <img className="morph-slider-image-fallback" src={safeItems[index].image} alt="" aria-hidden="true" />}
    <div ref={hostRef} className="morph-slider-stage" role="group" aria-label="CookSmart featured recipes" />
    {showCaptions && safeItems[index]?.caption && <div className="morph-slider-caption">{safeItems[index].caption}</div>}
    {showControls && <div className="morph-slider-controls"><button type="button" aria-label="Previous slide" onClick={() => engineRef.current?.prev()}>‹</button><button type="button" aria-label="Next slide" onClick={() => engineRef.current?.next()}>›</button></div>}
    {showIndicators && <div className="morph-slider-indicators">{safeItems.map((item, itemIndex) => <button key={item.image} type="button" aria-label={`Go to slide ${itemIndex + 1}`} className={itemIndex === index ? 'is-active' : ''} onClick={() => { const direction = itemIndex >= index ? itemIndex - index : safeItems.length - index + itemIndex; for (let step = 0; step < direction; step += 1) window.setTimeout(() => engineRef.current?.next(), step * 80); }} />)}</div>}
  </div>;
}
