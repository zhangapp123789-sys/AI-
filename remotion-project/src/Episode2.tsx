import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from 'remotion';

const SCENES = [
  { image: 'scene01_D.png', audio: 'ep2_s01.mp3', subtitle: '他以为一切悄无声息...' },
  { image: 'paste_02.png', audio: 'ep2_s02.mp3', subtitle: '下午，一波下杀。死死按在跌停板上。大侠爆仓，两千万化为乌有。' },
  { image: 'paste_03.png', audio: 'ep2_s03.mp3', subtitle: '他从七楼跳了下去。' },
  { image: 'paste_04.png', audio: 'ep2_s04.mp3', subtitle: '命不该绝，摔断了双腿，严重脑震荡。昏迷十一天。' },
  { image: 'paste_05.png', audio: 'ep2_s05.mp3', subtitle: '醒来时，妻子不堪重负，带着孩子走了，留下一张离婚协议。' },
  { image: 'paste_06.png', audio: 'ep2_s06.mp3', subtitle: '朋友全都远离。表弟把他接回农村老家。弟妹嫌弃，赶去猪圈住。' },
  { image: 'scene01_D.png', audio: 'ep2_s07.mp3', subtitle: '两个月。在猪圈里躺了整整两个月。大侠想明白了一切。' },
];

const SceneCard: React.FC<{ imageFile: string; subtitle: string; durationFrames: number }> = ({ imageFile, subtitle, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationFrames], [1, 1.12], { extrapolateRight: 'clamp' });

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  const subSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 20, stiffness: 80 } });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', opacity: fadeIn }}>
        <Img src={staticFile(imageFile)} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})` }} />
      </div>
      <div style={{ position: 'absolute', bottom: 80, left: 40, right: 40, textAlign: 'center', opacity: subSpring }}>
        <span style={{ color: '#fff', fontSize: 36, fontWeight: 600, backgroundColor: 'rgba(0,0,0,0.6)', padding: '12px 24px', borderRadius: 8, lineHeight: 1.6, textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          {subtitle}
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const Episode2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {SCENES.map((scene, i) => {
        const dur = 270;
        return (
          <Sequence key={i} from={i * dur} durationInFrames={dur}>
            <SceneCard imageFile={scene.image} subtitle={scene.subtitle} durationFrames={dur} />
            <Audio src={staticFile(scene.audio)} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
