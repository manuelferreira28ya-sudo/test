import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const vignette = {
  background:
    'radial-gradient(circle at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.45) 100%)',
};

const website = staticFile('assets/sailorpiece-home.jpg');
const characters = staticFile('assets/sailorpiece-characters.jpg');
const lore = staticFile('assets/sailorpiece-lore.jpg');
const community = staticFile('assets/sailorpiece-community.jpg');
const music = staticFile('assets/ambient-tech.mp3');

const labels = ['Characters', 'Lore', 'Community Content'];

const SceneBase: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{backgroundColor: '#070709', color: 'white', fontFamily: 'Inter, sans-serif'}}>
    {children}
  </AbsoluteFill>
);

const Cursor: React.FC<{x: number; y: number; clickAt?: number}> = ({x, y, clickAt = 0}) => {
  const frame = useCurrentFrame();
  const pulse = spring({
    frame: Math.max(0, frame - clickAt),
    fps: 30,
    config: {damping: 14, stiffness: 140},
  });

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 26,
          height: 26,
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.95)',
          boxShadow: `0 0 ${10 + pulse * 20}px rgba(255,255,255,0.7)`,
          transform: `scale(${1 + pulse * 0.15})`,
        }}
      />
    </>
  );
};

export const SailorPieceWalkthrough: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const introZoom = interpolate(frame, [0, 150], [1.2, 1], {extrapolateRight: 'clamp'});
  const heroPanX = interpolate(frame, [150, 360], [0, -120], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scrollY = interpolate(frame, [1200, 1500], [0, -500], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const outroFade = interpolate(frame, [1650, 1799], [1, 0], {extrapolateLeft: 'clamp'});

  return (
    <SceneBase>
      <Audio src={music} volume={0.2} />

      <Sequence from={0} durationInFrames={150}>
        <AbsoluteFill>
          <Img src={website} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${introZoom})`, filter: 'saturate(1.12) brightness(1.05)'}} />
          <AbsoluteFill style={vignette} />
          <h1 style={{position: 'absolute', bottom: 120, left: 110, fontSize: 74, letterSpacing: 1, textShadow: '0 0 30px rgba(255, 60, 60, 0.4)'}}>
            Explore SailorPiece Fan Wiki
          </h1>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={150} durationInFrames={210}>
        <AbsoluteFill style={{transform: `translateX(${heroPanX}px)`}}>
          <Img src={website} style={{width: '108%', height: '100%', objectFit: 'cover'}} />
          <Cursor x={620} y={145} clickAt={45} />
          <div style={{position: 'absolute', inset: 0, ...vignette}} />
        </AbsoluteFill>
      </Sequence>

      {[characters, lore, community].map((src, i) => (
        <Sequence key={labels[i]} from={360 + i * 130} durationInFrames={130}>
          <AbsoluteFill>
            <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.98)'}} />
            <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.35))'}} />
            <div style={{position: 'absolute', top: 72, left: 90, padding: '14px 24px', borderRadius: 14, background: 'rgba(13,15,22,0.65)', border: '1px solid rgba(255,255,255,0.24)', fontSize: 42}}>
              {labels[i]}
            </div>
            <Cursor x={300 + i * 200} y={155 + i * 20} clickAt={20} />
          </AbsoluteFill>
        </Sequence>
      ))}

      <Sequence from={750} durationInFrames={450}>
        <AbsoluteFill>
          <Img src={lore} style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.03)'}} />
          {['Easy Navigation', 'Detailed Wiki Pages', 'Fan-driven Content'].map((text, idx) => {
            const localFrame = frame - 750;
            const y = 220 + idx * 130;
            const enter = interpolate(localFrame, [idx * 35, idx * 35 + 25], [60, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            const opacity = interpolate(localFrame, [idx * 35, idx * 35 + 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            return (
              <div key={text} style={{position: 'absolute', top: y + enter, left: 120, opacity, fontSize: 46, fontWeight: 600, padding: '12px 20px', borderRadius: 14, background: 'rgba(8,8,12,0.55)', boxShadow: '0 0 40px rgba(255, 40, 40, 0.25)'}}>
                {text}
              </div>
            );
          })}
        </AbsoluteFill>
      </Sequence>

      <Sequence from={1200} durationInFrames={300}>
        <AbsoluteFill style={{overflow: 'hidden'}}>
          <Img src={characters} style={{width: '100%', height: 'calc(100% + 500px)', objectFit: 'cover', transform: `translateY(${scrollY}px)`}} />
          <div style={{position: 'absolute', right: 120, top: 80, padding: '10px 18px', borderRadius: 10, background: 'rgba(0,0,0,0.55)'}}>Smooth scroll showcase</div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={1500} durationInFrames={300}>
        <AbsoluteFill style={{opacity: outroFade}}>
          <Img src={website} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${interpolate(frame, [1500, 1799], [1, 0.92], {extrapolateRight: 'clamp'})})`}} />
          <AbsoluteFill style={{background: 'rgba(0,0,0,0.45)'}} />
          <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center'}}>
            <div>
              <div style={{fontSize: 68, fontWeight: 700, marginBottom: 18}}>Start Exploring Now</div>
              <div style={{fontSize: 42, opacity: 0.95}}>sailorpiecefanwiki.com</div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          boxShadow: 'inset 0 0 250px rgba(0,0,0,0.55)',
          mixBlendMode: 'normal',
        }}
      />
    </SceneBase>
  );
};
