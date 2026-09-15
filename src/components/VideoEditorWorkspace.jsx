import React, { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import confetti from 'canvas-confetti';
import {
  Upload,
  Play,
  Pause,
  Scissors,
  Music,
  Sparkles,
  Download,
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertCircle,
  Film,
  FileAudio,
  Trash2,
  ShieldCheck,
  Plus,
  ArrowLeft,
  ArrowRight,
  Layers,
  Settings,
} from 'lucide-react';

/**
 * Format seconds to mm:ss or mm:ss.ms
 */
function formatSeconds(seconds, showMs = true) {
  if (isNaN(seconds) || seconds < 0) seconds = 0;
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);
  const pad = (n) => n.toString().padStart(2, '0');
  return showMs ? `${pad(mins)}:${pad(secs)}.${ms}` : `${pad(mins)}:${pad(secs)}`;
}

export default function VideoEditorWorkspace({ translations = {}, currentLang = 'en' }) {
  const t = (key) => translations[key] || key;

  // Multi-Video Clips State
  const [videoClips, setVideoClips] = useState([]);
  const [activeClipIndex, setActiveClipIndex] = useState(0);

  // Player Playback State
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Multi-Audio Tracks State
  // { id, file, url, name, duration, startTime, endTime, startOffset, volume }
  const [audioTracks, setAudioTracks] = useState([]);
  const [audioMode, setAudioMode] = useState('mix'); // 'mix' | 'replace' | 'keep'
  const [playingAudioId, setPlayingAudioId] = useState(null);

  // Resolution & Transitions
  const [exportResolution, setExportResolution] = useState('1080p'); // '1080p' | '720p' | 'original'
  const [fadeInDuration, setFadeInDuration] = useState(0);
  const [fadeOutDuration, setFadeOutDuration] = useState(0);

  // Active Tool Tab: 'timeline' | 'audio' | 'transitions' | 'settings'
  const [activeTab, setActiveTab] = useState('timeline');

  // FFmpeg & Export State
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatusText, setExportStatusText] = useState('');
  const [exportedVideoUrl, setExportedVideoUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // DOM Refs
  const videoRef = useRef(null);
  const audioPreviewRef = useRef(null);
  const ffmpegRef = useRef(null);
  const videoInputRef = useRef(null);
  const addMoreVideoRef = useRef(null);
  const audioInputRef = useRef(null);

  // Current active clip shortcut
  const activeClip = videoClips[activeClipIndex] || null;

  // Calculate total project timeline duration
  const totalProjectDuration = videoClips.reduce(
    (acc, clip) => acc + Math.max(0, clip.endTime - clip.startTime),
    0
  );

  // Load FFmpeg instance
  const getFFmpeg = async () => {
    if (ffmpegRef.current && ffmpegLoaded) {
      return ffmpegRef.current;
    }

    const ffmpeg = new FFmpeg();
    ffmpegRef.current = ffmpeg;

    ffmpeg.on('log', ({ message }) => {
      if (message.includes('time=')) {
        const timeMatch = message.match(/time=(\d+):(\d+):(\d+\.\d+)/);
        if (timeMatch && totalProjectDuration > 0) {
          const hours = parseFloat(timeMatch[1]);
          const minutes = parseFloat(timeMatch[2]);
          const seconds = parseFloat(timeMatch[3]);
          const totalSecs = hours * 3600 + minutes * 60 + seconds;
          const pct = Math.min(99, Math.round((totalSecs / totalProjectDuration) * 100));
          setExportProgress(pct);
        }
      }
    });

    ffmpeg.on('progress', ({ progress }) => {
      const pct = Math.min(99, Math.round(progress * 100));
      if (pct > 0) setExportProgress(pct);
    });

    setExportStatusText(t('export.statusInit'));
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm';

    try {
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      setFfmpegLoaded(true);
      return ffmpeg;
    } catch (err) {
      console.error('Failed to load FFmpeg from CDN:', err);
      throw err;
    }
  };

  // Helper: Read video file metadata and duration
  const loadVideoMetadata = (file) => {
    return new Promise((resolve) => {
      const tempVideo = document.createElement('video');
      tempVideo.preload = 'metadata';
      const url = URL.createObjectURL(file);
      tempVideo.src = url;

      tempVideo.onloadedmetadata = () => {
        resolve({
          id: Math.random().toString(36).substring(2, 9),
          file,
          url,
          name: file.name,
          duration: tempVideo.duration || 1,
          startTime: 0,
          endTime: tempVideo.duration || 1,
          width: tempVideo.videoWidth || 1920,
          height: tempVideo.videoHeight || 1080,
        });
      };

      tempVideo.onerror = () => {
        resolve({
          id: Math.random().toString(36).substring(2, 9),
          file,
          url,
          name: file.name,
          duration: 10,
          startTime: 0,
          endTime: 10,
          width: 1920,
          height: 1080,
        });
      };
    });
  };

  // Helper: Read audio file metadata and duration for cutting
  const loadAudioMetadata = (file) => {
    return new Promise((resolve) => {
      const tempAudio = new Audio();
      const url = URL.createObjectURL(file);
      tempAudio.preload = 'metadata';
      tempAudio.src = url;

      tempAudio.onloadedmetadata = () => {
        const dur = tempAudio.duration || 30;
        resolve({
          id: Math.random().toString(36).substring(2, 9),
          file,
          url,
          name: file.name,
          duration: dur,
          startTime: 0,
          endTime: dur,
          startOffset: 0,
          volume: 1.0,
        });
      };

      tempAudio.onerror = () => {
        resolve({
          id: Math.random().toString(36).substring(2, 9),
          file,
          url,
          name: file.name,
          duration: 30,
          startTime: 0,
          endTime: 30,
          startOffset: 0,
          volume: 1.0,
        });
      };
    });
  };

  // Handle adding initial or additional videos
  const handleAddVideos = async (files) => {
    if (!files || files.length === 0) return;
    setErrorMessage('');
    setExportedVideoUrl('');

    const newClips = [];
    for (let i = 0; i < files.length; i++) {
      const clip = await loadVideoMetadata(files[i]);
      newClips.push(clip);
    }

    setVideoClips((prev) => {
      const updated = [...prev, ...newClips];
      return updated;
    });

    if (videoClips.length === 0) {
      setActiveClipIndex(0);
      setCurrentTime(0);
    }
  };

  // Move clip earlier in sequence
  const moveClipEarlier = (index, e) => {
    e.stopPropagation();
    if (index <= 0) return;
    setVideoClips((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
    if (activeClipIndex === index) {
      setActiveClipIndex(index - 1);
    } else if (activeClipIndex === index - 1) {
      setActiveClipIndex(index);
    }
  };

  // Move clip later in sequence
  const moveClipLater = (index, e) => {
    e.stopPropagation();
    if (index >= videoClips.length - 1) return;
    setVideoClips((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
    if (activeClipIndex === index) {
      setActiveClipIndex(index + 1);
    } else if (activeClipIndex === index + 1) {
      setActiveClipIndex(index);
    }
  };

  // Delete clip from project
  const deleteClip = (index, e) => {
    e.stopPropagation();
    const clipToDelete = videoClips[index];
    if (clipToDelete && clipToDelete.url) {
      URL.revokeObjectURL(clipToDelete.url);
    }

    const updated = videoClips.filter((_, i) => i !== index);
    setVideoClips(updated);

    if (activeClipIndex >= updated.length) {
      setActiveClipIndex(Math.max(0, updated.length - 1));
    }
  };

  // Handle active clip trim bounds changes
  const updateActiveClipTrim = (newStart, newEnd) => {
    if (!activeClip) return;
    const clampedStart = Math.max(0, Math.min(newStart, activeClip.duration));
    const clampedEnd = Math.max(clampedStart + 0.1, Math.min(newEnd, activeClip.duration));

    setVideoClips((prev) => {
      const copy = [...prev];
      copy[activeClipIndex] = {
        ...copy[activeClipIndex],
        startTime: clampedStart,
        endTime: clampedEnd,
      };
      return copy;
    });
  };

  // Video Player Event Handlers
  const handleTimeUpdate = () => {
    if (!videoRef.current || !activeClip) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);

    // Loop within active clip's trimmed bounds
    if (curr >= activeClip.endTime) {
      videoRef.current.currentTime = activeClip.startTime;
      if (!videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current || !activeClip) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      if (currentTime < activeClip.startTime || currentTime >= activeClip.endTime) {
        videoRef.current.currentTime = activeClip.startTime;
      }
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (newTime) => {
    if (!activeClip) return;
    const clamped = Math.max(0, Math.min(activeClip.duration, newTime));
    setCurrentTime(clamped);
    if (videoRef.current) {
      videoRef.current.currentTime = clamped;
    }
  };

  // Add Audio Tracks with duration metadata
  const handleAddAudios = async (files) => {
    if (!files || files.length === 0) return;
    const newTracks = [];
    for (let i = 0; i < files.length; i++) {
      const track = await loadAudioMetadata(files[i]);
      newTracks.push(track);
    }
    setAudioTracks((prev) => [...prev, ...newTracks]);
  };

  const updateAudioTrack = (index, field, value) => {
    setAudioTracks((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const updateAudioTrim = (index, newStart, newEnd) => {
    setAudioTracks((prev) => {
      const copy = [...prev];
      const track = copy[index];
      const clampedStart = Math.max(0, Math.min(newStart, track.duration));
      const clampedEnd = Math.max(clampedStart + 0.1, Math.min(newEnd, track.duration));
      copy[index] = {
        ...track,
        startTime: clampedStart,
        endTime: clampedEnd,
      };
      return copy;
    });
  };

  const deleteAudioTrack = (index) => {
    const track = audioTracks[index];
    if (track && track.url) {
      URL.revokeObjectURL(track.url);
    }
    if (playingAudioId === track?.id && audioPreviewRef.current) {
      audioPreviewRef.current.pause();
      setPlayingAudioId(null);
    }
    setAudioTracks((prev) => prev.filter((_, i) => i !== index));
  };

  // Toggle Audio Track Audition Preview
  const toggleAudioPreview = (track) => {
    if (!audioPreviewRef.current) return;
    if (playingAudioId === track.id) {
      audioPreviewRef.current.pause();
      setPlayingAudioId(null);
    } else {
      audioPreviewRef.current.src = track.url;
      audioPreviewRef.current.currentTime = track.startTime || 0;
      audioPreviewRef.current.volume = Math.min(1.0, Math.max(0, track.volume || 1.0));
      audioPreviewRef.current.play();
      setPlayingAudioId(track.id);
    }
  };

  const handleAudioPreviewTimeUpdate = () => {
    if (!audioPreviewRef.current || !playingAudioId) return;
    const track = audioTracks.find((t) => t.id === playingAudioId);
    if (track && audioPreviewRef.current.currentTime >= track.endTime) {
      audioPreviewRef.current.currentTime = track.startTime;
      audioPreviewRef.current.pause();
      setPlayingAudioId(null);
    }
  };

  // Full HD 1080p Multi-Video & Multi-Audio Export Pipeline
  const handleExport = async () => {
    if (videoClips.length === 0) return;

    try {
      setIsExporting(true);
      setExportProgress(3);
      setErrorMessage('');
      setExportedVideoUrl('');

      const ffmpeg = await getFFmpeg();

      setExportStatusText(t('export.statusLoading'));
      setExportProgress(10);

      // Determine Target Resolution (Default 1080p Full HD)
      let targetWidth = 1920;
      let targetHeight = 1080;
      if (exportResolution === '720p') {
        targetWidth = 1280;
        targetHeight = 720;
      } else if (exportResolution === 'original' && videoClips[0]) {
        targetWidth = videoClips[0].width || 1920;
        targetHeight = videoClips[0].height || 1080;
      }

      // Write all video files to virtual FS
      const videoInputsArgs = [];
      for (let i = 0; i < videoClips.length; i++) {
        const clip = videoClips[i];
        const ext = clip.file.name.split('.').pop() || 'mp4';
        const virtualName = `v_${i}.${ext}`;
        await ffmpeg.writeFile(virtualName, await fetchFile(clip.file));

        // Accurate seek and trim for each clip
        videoInputsArgs.push('-ss', clip.startTime.toFixed(3));
        videoInputsArgs.push('-to', clip.endTime.toFixed(3));
        videoInputsArgs.push('-i', virtualName);
      }

      // Write all audio files to virtual FS
      const audioInputsArgs = [];
      for (let j = 0; j < audioTracks.length; j++) {
        const track = audioTracks[j];
        const ext = track.file.name.split('.').pop() || 'mp3';
        const virtualAudioName = `a_${j}.${ext}`;
        await ffmpeg.writeFile(virtualAudioName, await fetchFile(track.file));
        audioInputsArgs.push('-i', virtualAudioName);
      }

      setExportStatusText(t('export.statusEncoding'));
      setExportProgress(25);

      const N = videoClips.length;
      const M = audioTracks.length;
      const filterComplex = [];

      // 1. Process and scale each video clip to uniform 1080p Full HD with black letterboxing & 30fps
      for (let i = 0; i < N; i++) {
        let videoFilter = `scale=${targetWidth}:${targetHeight}:force_original_aspect_ratio=decrease,pad=${targetWidth}:${targetHeight}:(ow-iw)/2:(oh-ih)/2:black,setsar=1,fps=30`;

        // Apply intro fade in to first clip
        if (i === 0 && fadeInDuration > 0) {
          videoFilter += `,fade=t=in:st=0:d=${fadeInDuration}`;
        }
        // Apply outro fade out to last clip
        if (i === N - 1 && fadeOutDuration > 0) {
          const lastClipTrimmedDur = Math.max(0.1, videoClips[N - 1].endTime - videoClips[N - 1].startTime);
          const fadeOutStart = Math.max(0, lastClipTrimmedDur - fadeOutDuration);
          videoFilter += `,fade=t=out:st=${fadeOutStart.toFixed(3)}:d=${fadeOutDuration}`;
        }

        filterComplex.push(`[${i}:v]${videoFilter}[v${i}]`);
      }

      // 2. Concatenate all processed video streams
      const concatInputs = Array.from({ length: N }, (_, i) => `[v${i}]`).join('');
      filterComplex.push(`${concatInputs}concat=n=${N}:v=1:a=0[v_concat]`);

      // 3. Audio Handling
      const audioStreamsToMix = [];

      // Check if keeping original video audio
      const keepOriginalAudio = audioMode !== 'replace';
      if (keepOriginalAudio) {
        for (let i = 0; i < N; i++) {
          let aFilter = `aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo`;
          if (i === 0 && fadeInDuration > 0) {
            aFilter += `,afade=t=in:st=0:d=${fadeInDuration}`;
          }
          if (i === N - 1 && fadeOutDuration > 0) {
            const lastClipTrimmedDur = Math.max(0.1, videoClips[N - 1].endTime - videoClips[N - 1].startTime);
            const fadeOutStart = Math.max(0, lastClipTrimmedDur - fadeOutDuration);
            aFilter += `,afade=t=out:st=${fadeOutStart.toFixed(3)}:d=${fadeOutDuration}`;
          }
          filterComplex.push(`[${i}:a]${aFilter}[a${i}]`);
        }
        const concatAudioInputs = Array.from({ length: N }, (_, i) => `[a${i}]`).join('');
        filterComplex.push(`${concatAudioInputs}concat=n=${N}:v=0:a=1[a_orig_concat]`);
        audioStreamsToMix.push('[a_orig_concat]');
      }

      // 4. Cut and position each secondary audio track
      for (let j = 0; j < M; j++) {
        const track = audioTracks[j];
        const audioInputIndex = N + j;
        const delayMs = Math.round((track.startOffset || 0) * 1000);
        const vol = track.volume !== undefined ? track.volume : 1.0;
        const cutStart = Math.max(0, track.startTime || 0);
        const cutEnd = Math.max(cutStart + 0.1, track.endTime || track.duration || 10);

        filterComplex.push(
          `[${audioInputIndex}:a]atrim=start=${cutStart.toFixed(3)}:end=${cutEnd.toFixed(3)},asetpts=PTS-STARTPTS,adelay=${delayMs}|${delayMs},volume=${vol},aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo[aud_${j}]`
        );
        audioStreamsToMix.push(`[aud_${j}]`);
      }

      // Mix all audio streams together
      let hasAudioOutput = false;
      if (audioStreamsToMix.length > 1) {
        filterComplex.push(
          `${audioStreamsToMix.join('')}amix=inputs=${audioStreamsToMix.length}:duration=first:dropout_transition=2[a_final]`
        );
        hasAudioOutput = true;
      } else if (audioStreamsToMix.length === 1) {
        filterComplex.push(`${audioStreamsToMix[0]}anull[a_final]`);
        hasAudioOutput = true;
      }

      // Build full command arguments
      const args = [
        ...videoInputsArgs,
        ...audioInputsArgs,
        '-filter_complex',
        filterComplex.join(';'),
        '-map',
        '[v_concat]',
      ];

      if (hasAudioOutput) {
        args.push('-map', '[a_final]');
        args.push('-c:a', 'aac', '-b:a', '192k');
      } else {
        args.push('-an');
      }

      // 1080p High Quality H.264 Encoding
      const outputFileName = 'output_1080p.mp4';
      args.push(
        '-c:v',
        'libx264',
        '-preset',
        'ultrafast',
        '-b:v',
        '5000k',
        '-maxrate',
        '6500k',
        '-bufsize',
        '10000k',
        '-pix_fmt',
        'yuv420p',
        '-movflags',
        '+faststart',
        '-y',
        outputFileName
      );

      console.log('Executing 1080p FFmpeg with args:', args.join(' '));
      await ffmpeg.exec(args);

      setExportStatusText(t('export.statusFinalizing'));
      setExportProgress(95);

      // Read output file
      const outputData = await ffmpeg.readFile(outputFileName);
      const outputBlob = new Blob([outputData.buffer], { type: 'video/mp4' });
      const exportedUrl = URL.createObjectURL(outputBlob);

      setExportedVideoUrl(exportedUrl);
      setExportProgress(100);
      setIsExporting(false);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#1B2CC1', '#7692FF', '#ABD2FA', '#FFDD00'],
        });
      } catch (e) {}
    } catch (err) {
      console.error('FFmpeg export error:', err);
      setErrorMessage(err.message || t('export.errorSubtitle'));
      setIsExporting(false);
    }
  };

  // Reset Project
  const handleResetProject = () => {
    videoClips.forEach((clip) => {
      if (clip.url) URL.revokeObjectURL(clip.url);
    });
    audioTracks.forEach((track) => {
      if (track.url) URL.revokeObjectURL(track.url);
    });
    if (exportedVideoUrl) URL.revokeObjectURL(exportedVideoUrl);
    setVideoClips([]);
    setActiveClipIndex(0);
    setAudioTracks([]);
    setCurrentTime(0);
    setExportedVideoUrl('');
    setErrorMessage('');
    setIsExporting(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      videoClips.forEach((clip) => {
        if (clip.url) URL.revokeObjectURL(clip.url);
      });
      audioTracks.forEach((track) => {
        if (track.url) URL.revokeObjectURL(track.url);
      });
      if (exportedVideoUrl) URL.revokeObjectURL(exportedVideoUrl);
    };
  }, []);

  // When active clip changes, seek video to its start time
  useEffect(() => {
    if (activeClip) {
      setCurrentTime(activeClip.startTime);
      if (videoRef.current) {
        videoRef.current.currentTime = activeClip.startTime;
      }
    }
  }, [activeClipIndex]);

  return (
    <section id="editor-workspace" class="w-full py-4 sm:py-8 md:py-12">
      <div class="max-w-6xl mx-auto px-2.5 sm:px-4 md:px-6">
        {/* Hidden Audio Preview Element for Auditioning */}
        <audio
          ref={audioPreviewRef}
          onTimeUpdate={handleAudioPreviewTimeUpdate}
          onEnded={() => setPlayingAudioId(null)}
          class="hidden"
        />

        {/* Hidden File Inputs */}
        <input
          type="file"
          ref={videoInputRef}
          multiple
          accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/*"
          class="hidden"
          onChange={(e) => {
            if (e.target.files) {
              handleAddVideos(Array.from(e.target.files));
            }
          }}
        />

        <input
          type="file"
          ref={addMoreVideoRef}
          multiple
          accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/*"
          class="hidden"
          onChange={(e) => {
            if (e.target.files) {
              handleAddVideos(Array.from(e.target.files));
            }
          }}
        />

        <input
          type="file"
          ref={audioInputRef}
          multiple
          accept="audio/mp3,audio/wav,audio/aac,audio/ogg,audio/m4a,audio/*"
          class="hidden"
          onChange={(e) => {
            if (e.target.files) {
              handleAddAudios(Array.from(e.target.files));
            }
          }}
        />

        {/* Empty State / Initial Dropzone */}
        {videoClips.length === 0 && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files) {
                handleAddVideos(Array.from(e.dataTransfer.files));
              }
            }}
            class="relative rounded-3xl border-2 border-dashed border-[#ABD2FA] dark:border-[#1B2CC1] bg-white/70 dark:bg-[#0c1844]/70 backdrop-blur-md p-6 sm:p-14 text-center shadow-lg transition-all hover:border-[#7692FF] hover:shadow-glow-soft group"
          >
            <div class="max-w-md mx-auto flex flex-col items-center">
              <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#1B2CC1] to-[#7692FF] text-white flex items-center justify-center shadow-glow mb-5 sm:mb-6 group-hover:scale-110 transition-transform">
                <Upload class="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <h2 class="text-xl sm:text-3xl font-black tracking-tight text-[#091540] dark:text-white">
                {t('editor.dropTitle')}
              </h2>

              <p class="mt-2 text-xs sm:text-sm text-[#091540]/70 dark:text-[#ABD2FA]/70">
                {t('editor.dropSubtitle')}
              </p>

              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                class="mt-5 sm:mt-6 inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-[#1B2CC1] hover:bg-[#7692FF] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-glow transition-all active:scale-95"
              >
                <Film class="w-4 h-4" />
                <span>{t('editor.chooseVideo')}</span>
              </button>

              <div class="mt-6 sm:mt-8 flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#091540]/60 dark:text-[#ABD2FA]/60 bg-[#ABD2FA]/20 dark:bg-[#1B2CC1]/30 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[#ABD2FA]/40 dark:border-[#1B2CC1]/50">
                <ShieldCheck class="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{t('editor.privacyGuaranteed')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Editor Workspace */}
        {videoClips.length > 0 && (
          <div class="space-y-4 sm:space-y-6">
            {/* Top Workspace Header Bar */}
            <div class="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white/85 dark:bg-[#0c1844]/85 border border-[#ABD2FA]/60 dark:border-[#1B2CC1]/60 shadow-sm">
              <div class="flex items-center gap-2.5 sm:gap-3">
                <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1B2CC1] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                  <Film class="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs sm:text-sm font-bold text-[#091540] dark:text-white">
                      {videoClips.length} {t('editor.clipsCount')}
                    </span>
                    <span class="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-[#ABD2FA]/30 dark:bg-[#1B2CC1]/50 text-[#1B2CC1] dark:text-[#ABD2FA] font-bold">
                      Full HD 1080p
                    </span>
                  </div>
                  <div class="text-[11px] sm:text-xs text-[#091540]/60 dark:text-[#ABD2FA]/70">
                    {t('editor.totalDuration')}:{' '}
                    <span class="font-mono font-bold text-[#1B2CC1] dark:text-white">
                      {formatSeconds(totalProjectDuration, false)}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addMoreVideoRef.current?.click()}
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold rounded-xl bg-[#1B2CC1] hover:bg-[#7692FF] text-white shadow-sm transition-all active:scale-95"
                >
                  <Plus class="w-3.5 h-3.5" />
                  <span>{t('editor.addVideo')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetProject}
                  class="inline-flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-2 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 text-[#091540] dark:text-[#ABD2FA] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title="Reset Project"
                  aria-label="Reset Project"
                >
                  <RotateCcw class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Video Player Preview (Top) */}
            {activeClip && (
              <div class="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black aspect-video max-h-[260px] sm:max-h-[380px] md:max-h-[480px] flex items-center justify-center shadow-2xl border border-[#ABD2FA]/40 dark:border-[#1B2CC1]/60 group">
                <video
                  ref={videoRef}
                  src={activeClip.url}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onClick={togglePlay}
                  class="w-full h-full object-contain cursor-pointer"
                />

                {!isPlaying && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    class="absolute inset-0 m-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#1B2CC1]/85 hover:bg-[#1B2CC1] text-white flex items-center justify-center shadow-glow transition-transform hover:scale-110 active:scale-95 z-20"
                    aria-label={t('player.play')}
                  >
                    <Play class="w-6 h-6 sm:w-8 sm:h-8 ml-0.5 sm:ml-1 fill-white" />
                  </button>
                )}

                <div class="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-auto z-20 flex flex-wrap items-center gap-1.5 sm:gap-2 pointer-events-none">
                  <span class="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-bold text-white border border-white/10 max-w-[200px] truncate">
                    #{activeClipIndex + 1}: {activeClip.name}
                  </span>
                  <span class="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#1B2CC1]/80 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-bold text-[#ABD2FA] border border-[#7692FF]/30">
                    {formatSeconds(currentTime)} / {formatSeconds(activeClip.duration)}
                  </span>
                </div>
              </div>
            )}

            {/* Timeline Multi-Clip Sequencer Bar */}
            <div class="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-[#0c1844]/85 border border-[#ABD2FA]/70 dark:border-[#1B2CC1]/70 shadow-md space-y-3.5 sm:space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-xs font-bold uppercase tracking-wider text-deep-navy/80 dark:text-pale-blue/80 flex items-center gap-2">
                  <Layers class="w-4 h-4 text-vivid-blue dark:text-soft-blue" />
                  <span>{t('editor.videoClips')}</span>
                </h4>
                <span class="text-xs font-mono font-bold text-deep-navy/60 dark:text-pale-blue/60">
                  {totalProjectDuration.toFixed(2)}s Total
                </span>
              </div>

              {/* Multi-Clip Strip */}
              <div class="flex gap-2.5 sm:gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin snap-x">
                {videoClips.map((clip, index) => {
                  const clipLength = Math.max(0, clip.endTime - clip.startTime);
                  const isSelected = index === activeClipIndex;
                  return (
                    <div
                      key={clip.id}
                      onClick={() => setActiveClipIndex(index)}
                      class={`min-w-[155px] sm:min-w-[195px] max-w-[220px] flex-shrink-0 snap-start relative p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#ABD2FA]/20 dark:bg-[#1B2CC1]/40 border-[#1B2CC1] dark:border-[#7692FF] shadow-glow-soft'
                          : 'bg-gray-50 dark:bg-[#060e2c] border-gray-200 dark:border-gray-800 hover:border-[#ABD2FA]'
                      }`}
                    >
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-deep-navy dark:text-white">
                          #{index + 1}
                        </span>
                        <div class="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={(e) => moveClipEarlier(index, e)}
                            class="p-1 rounded text-gray-500 hover:text-vivid-blue disabled:opacity-30"
                            title={t('editor.moveEarlier')}
                            aria-label={t('editor.moveEarlier')}
                          >
                            <ArrowLeft class="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={index === videoClips.length - 1}
                            onClick={(e) => moveClipLater(index, e)}
                            class="p-1 rounded text-gray-500 hover:text-vivid-blue disabled:opacity-30"
                            title={t('editor.moveLater')}
                            aria-label={t('editor.moveLater')}
                          >
                            <ArrowRight class="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => deleteClip(index, e)}
                            class="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                            title={t('editor.deleteClip')}
                            aria-label={t('editor.deleteClip')}
                          >
                            <Trash2 class="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div class="text-xs font-bold text-[#091540] dark:text-white truncate mb-1">
                        {clip.name}
                      </div>

                      <div class="flex items-center justify-between text-[11px] font-mono text-gray-500 dark:text-gray-400">
                        <span>{clipLength.toFixed(1)}s</span>
                        <span>
                          {clip.width}x{clip.height}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Clip Trimming Dual-Sliders */}
              {activeClip && (
                <div class="pt-3.5 sm:pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3.5 sm:space-y-4">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="text-xs font-bold text-[#091540] dark:text-white flex items-center gap-1.5 min-w-0 flex-1 truncate">
                      <Scissors class="w-3.5 h-3.5 text-[#1B2CC1] flex-shrink-0" />
                      <span class="truncate">
                        #{activeClipIndex + 1}: {activeClip.name}
                      </span>
                    </div>

                    <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.muted = !isMuted;
                            setIsMuted(!isMuted);
                          }
                        }}
                        class="p-1 sm:p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-[#091540] dark:text-[#ABD2FA]"
                        title={isMuted ? t('player.unmute') : t('player.mute')}
                      >
                        {isMuted ? <VolumeX class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" /> : <Volume2 class="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => updateActiveClipTrim(currentTime, activeClip.endTime)}
                        class="px-2 py-1 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-bold rounded-lg bg-[#ABD2FA]/30 dark:bg-[#1B2CC1]/40 text-[#1B2CC1] dark:text-[#ABD2FA] hover:bg-[#ABD2FA]/50"
                      >
                        <span class="hidden sm:inline">{t('trim.setStartCurrent')}</span>
                        <span class="sm:hidden">Start</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => updateActiveClipTrim(activeClip.startTime, currentTime)}
                        class="px-2 py-1 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-bold rounded-lg bg-[#ABD2FA]/30 dark:bg-[#1B2CC1]/40 text-[#1B2CC1] dark:text-[#ABD2FA] hover:bg-[#ABD2FA]/50"
                      >
                        <span class="hidden sm:inline">{t('trim.setEndCurrent')}</span>
                        <span class="sm:hidden">End</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => updateActiveClipTrim(0, activeClip.duration)}
                        class="p-1 text-xs text-gray-500 hover:text-black dark:hover:text-white"
                        title={t('trim.reset')}
                      >
                        <RotateCcw class="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Scrubber and Active Clip Range */}
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div class="space-y-1">
                      <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-[#091540] dark:text-[#ABD2FA]">
                          {t('trim.start')}:{' '}
                          <span class="font-mono text-[#1B2CC1] dark:text-white">
                            {formatSeconds(activeClip.startTime)}
                          </span>
                        </span>
                      </div>
                      <input
                        type="range"
                        aria-label="Trim start time in seconds"
                        min="0"
                        max={Math.max(0, activeClip.endTime - 0.1)}
                        step="0.05"
                        value={activeClip.startTime}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          updateActiveClipTrim(val, activeClip.endTime);
                          handleSeek(val);
                        }}
                        class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#1B2CC1]"
                      />
                    </div>

                    <div class="space-y-1">
                      <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-[#091540] dark:text-[#ABD2FA]">
                          {t('trim.end')}:{' '}
                          <span class="font-mono text-[#1B2CC1] dark:text-white">
                            {formatSeconds(activeClip.endTime)}
                          </span>
                        </span>
                      </div>
                      <input
                        type="range"
                        aria-label="Trim end time in seconds"
                        min={Math.min(activeClip.duration, activeClip.startTime + 0.1)}
                        max={activeClip.duration || 1}
                        step="0.05"
                        value={activeClip.endTime}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          updateActiveClipTrim(activeClip.startTime, val);
                          handleSeek(val);
                        }}
                        class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#1B2CC1]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Tabs: Audio, Transitions, Settings */}
            <div class="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-[#0c1844]/90 border border-[#ABD2FA]/70 dark:border-[#1B2CC1]/70 shadow-md">
              {/* Tabs Navigation (Horizontally scrollable without wrapping on mobile) */}
              <div class="flex items-center gap-1.5 sm:gap-2 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-800 overflow-x-auto scrollbar-none flex-nowrap -mx-1 px-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('timeline')}
                  class={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex-shrink-0 whitespace-nowrap ${
                    activeTab === 'timeline'
                      ? 'bg-[#1B2CC1] text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-[#091540]/80 dark:text-[#ABD2FA]/80 hover:bg-gray-200'
                  }`}
                >
                  <Layers class="w-4 h-4 flex-shrink-0" />
                  <span>{t('editor.videoClips')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('audio')}
                  class={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex-shrink-0 whitespace-nowrap ${
                    activeTab === 'audio'
                      ? 'bg-[#1B2CC1] text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-[#091540]/80 dark:text-[#ABD2FA]/80 hover:bg-gray-200'
                  }`}
                >
                  <Music class="w-4 h-4 flex-shrink-0" />
                  <span>{t('editor.audioTracks')}</span>
                  {audioTracks.length > 0 && (
                    <span class="px-1.5 py-0.2 rounded-full bg-green-500 text-white text-[10px]">
                      {audioTracks.length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('transitions')}
                  class={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex-shrink-0 whitespace-nowrap ${
                    activeTab === 'transitions'
                      ? 'bg-[#1B2CC1] text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-[#091540]/80 dark:text-[#ABD2FA]/80 hover:bg-gray-200'
                  }`}
                >
                  <Sparkles class="w-4 h-4 flex-shrink-0" />
                  <span>{t('fade.title')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  class={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex-shrink-0 whitespace-nowrap ${
                    activeTab === 'settings'
                      ? 'bg-[#1B2CC1] text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-[#091540]/80 dark:text-[#ABD2FA]/80 hover:bg-gray-200'
                  }`}
                >
                  <Settings class="w-4 h-4 flex-shrink-0" />
                  <span>{t('editor.resolution')}</span>
                </button>
              </div>

              {/* Tab 1: Timeline summary */}
              {activeTab === 'timeline' && (
                <div class="py-5 space-y-4">
                  <div class="p-4 rounded-2xl bg-[#ABD2FA]/20 dark:bg-[#1B2CC1]/30 border border-[#ABD2FA]/50 dark:border-[#1B2CC1]/60">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-[#1B2CC1] dark:text-[#ABD2FA]">
                        {t('editor.totalDuration')}
                      </span>
                      <span class="font-mono text-base font-extrabold text-[#091540] dark:text-white">
                        {totalProjectDuration.toFixed(2)}s ({videoClips.length} clips)
                      </span>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {t('editor.aspectNotice')}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Multi-Audio Tracks & Cutting */}
              {activeTab === 'audio' && (
                <div class="py-5 space-y-5">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500">
                        {t('editor.audioTracks')}
                      </h4>
                      <p class="text-xs text-gray-400">Add, listen, cut start/end, and adjust timing for multiple tracks</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => audioInputRef.current?.click()}
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1B2CC1] text-white text-xs font-bold hover:bg-[#7692FF] transition-all"
                    >
                      <Plus class="w-3.5 h-3.5" />
                      <span>{t('editor.addAudio')}</span>
                    </button>
                  </div>

                  {audioTracks.length === 0 ? (
                    <div class="p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-center">
                      <FileAudio class="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">{t('audio.noFile')}</p>
                      <button
                        type="button"
                        onClick={() => audioInputRef.current?.click()}
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ABD2FA]/40 dark:bg-[#1B2CC1]/40 text-[#1B2CC1] dark:text-[#ABD2FA] font-bold text-xs"
                      >
                        <Upload class="w-3.5 h-3.5" />
                        <span>{t('editor.chooseAudio')}</span>
                      </button>
                    </div>
                  ) : (
                    <div class="space-y-4">
                      {audioTracks.map((track, idx) => {
                        const isThisPlaying = playingAudioId === track.id;
                        const cutDuration = Math.max(0, track.endTime - track.startTime);
                        return (
                          <div
                            key={track.id}
                            class="p-5 rounded-2xl bg-gray-50 dark:bg-[#060e2c] border-2 border-gray-200 dark:border-gray-800 space-y-4 shadow-sm"
                          >
                            {/* Track Header & Play Preview */}
                            <div class="flex items-center justify-between gap-2.5">
                              <div class="flex items-center gap-2.5 min-w-0 flex-1 truncate">
                                <button
                                  type="button"
                                  onClick={() => toggleAudioPreview(track)}
                                  class="w-8 h-8 rounded-lg bg-[#1B2CC1] text-white flex items-center justify-center flex-shrink-0 hover:bg-[#7692FF] transition-all"
                                  title={isThisPlaying ? t('audio.pause') : t('audio.preview')}
                                >
                                  {isThisPlaying ? (
                                    <Pause class="w-4 h-4 fill-white" />
                                  ) : (
                                    <Play class="w-4 h-4 fill-white ml-0.5" />
                                  )}
                                </button>
                                <div class="min-w-0 flex-1">
                                  <div class="text-xs font-bold text-[#091540] dark:text-white truncate">
                                    {track.name}
                                  </div>
                                  <div class="text-[11px] text-gray-500 font-mono truncate">
                                    {t('audio.trimmedLength')}:{' '}
                                    <span class="text-[#1B2CC1] dark:text-[#ABD2FA] font-bold">
                                      {cutDuration.toFixed(1)}s
                                    </span>{' '}
                                    (Total: {track.duration.toFixed(1)}s)
                                  </div>
                                </div>
                              </div>

                              <div class="flex items-center gap-1.5 flex-shrink-0">
                                <button
                                  type="button"
                                  onClick={() => updateAudioTrim(idx, 0, track.duration)}
                                  class="p-1.5 text-xs text-gray-400 hover:text-black dark:hover:text-white rounded-lg transition-colors"
                                  title={t('trim.reset')}
                                  aria-label={t('trim.reset')}
                                >
                                  <RotateCcw class="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteAudioTrack(idx)}
                                  class="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                                  title={t('audio.remove')}
                                  aria-label={t('audio.remove')}
                                >
                                  <Trash2 class="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Audio Cutting Dual Sliders */}
                            <div class="p-3.5 rounded-xl bg-white/80 dark:bg-black/40 border border-gray-200 dark:border-gray-700 space-y-3">
                              <div class="flex items-center justify-between text-[11px] font-bold text-gray-500">
                                <span class="flex items-center gap-1.5">
                                  <Scissors class="w-3 h-3 text-[#1B2CC1]" />
                                  <span>{t('audio.cutTitle')}</span>
                                </span>
                                <span class="font-mono text-[#1B2CC1] dark:text-[#ABD2FA]">
                                  {formatSeconds(track.startTime)} - {formatSeconds(track.endTime)}
                                </span>
                              </div>

                              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <div class="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                                    <span>{t('audio.trimStart')}</span>
                                    <span class="font-mono">{formatSeconds(track.startTime)}</span>
                                  </div>
                                  <input
                                    type="range"
                                    aria-label="Audio cut start time in seconds"
                                    min="0"
                                    max={Math.max(0, track.endTime - 0.1)}
                                    step="0.1"
                                    value={track.startTime}
                                    onChange={(e) =>
                                      updateAudioTrim(idx, parseFloat(e.target.value), track.endTime)
                                    }
                                    class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#1B2CC1]"
                                  />
                                </div>

                                <div>
                                  <div class="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                                    <span>{t('audio.trimEnd')}</span>
                                    <span class="font-mono">{formatSeconds(track.endTime)}</span>
                                  </div>
                                  <input
                                    type="range"
                                    aria-label="Audio cut end time in seconds"
                                    min={Math.min(track.duration, track.startTime + 0.1)}
                                    max={track.duration || 1}
                                    step="0.1"
                                    value={track.endTime}
                                    onChange={(e) =>
                                      updateAudioTrim(idx, track.startTime, parseFloat(e.target.value))
                                    }
                                    class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#1B2CC1]"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Timeline Start Offset & Volume */}
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label class="block text-[11px] font-bold text-gray-500 mb-1">
                                  {t('editor.audioDelay')}
                                </label>
                                <input
                                  type="number"
                                  aria-label="Audio start offset delay on timeline in seconds"
                                  min="0"
                                  max={totalProjectDuration || 100}
                                  step="0.5"
                                  value={track.startOffset}
                                  onChange={(e) =>
                                    updateAudioTrack(idx, 'startOffset', parseFloat(e.target.value) || 0)
                                  }
                                  class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-black/30 border border-gray-200 dark:border-gray-700 text-xs font-mono"
                                />
                              </div>

                              <div>
                                <div class="flex items-center justify-between text-[11px] font-bold text-gray-500 mb-1">
                                  <span>{t('editor.audioVolume')}</span>
                                  <span class="font-mono">{Math.round((track.volume || 1.0) * 100)}%</span>
                                </div>
                                <input
                                  type="range"
                                  aria-label="Audio track volume percentage"
                                  min="0"
                                  max="1.5"
                                  step="0.05"
                                  value={track.volume || 1.0}
                                  onChange={(e) =>
                                    updateAudioTrack(idx, 'volume', parseFloat(e.target.value))
                                  }
                                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#1B2CC1]"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Original Audio Mode Toggles */}
                  <div class="pt-2">
                    <div class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      {t('audio.mode')}
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <label
                        class={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs ${
                          audioMode === 'mix'
                            ? 'bg-[#ABD2FA]/20 dark:bg-[#1B2CC1]/30 border-[#1B2CC1] font-bold text-[#1B2CC1] dark:text-white'
                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="audioMode"
                          value="mix"
                          checked={audioMode === 'mix'}
                          onChange={() => setAudioMode('mix')}
                          class="text-[#1B2CC1]"
                        />
                        <span>{t('audio.modeMix')}</span>
                      </label>

                      <label
                        class={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs ${
                          audioMode === 'replace'
                            ? 'bg-[#ABD2FA]/20 dark:bg-[#1B2CC1]/30 border-[#1B2CC1] font-bold text-[#1B2CC1] dark:text-white'
                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="audioMode"
                          value="replace"
                          checked={audioMode === 'replace'}
                          onChange={() => setAudioMode('replace')}
                          class="text-[#1B2CC1]"
                        />
                        <span>{t('audio.modeReplace')}</span>
                      </label>

                      <label
                        class={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs ${
                          audioMode === 'keep'
                            ? 'bg-[#ABD2FA]/20 dark:bg-[#1B2CC1]/30 border-[#1B2CC1] font-bold text-[#1B2CC1] dark:text-white'
                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="audioMode"
                          value="keep"
                          checked={audioMode === 'keep'}
                          onChange={() => setAudioMode('keep')}
                          class="text-[#1B2CC1]"
                        />
                        <span>{t('audio.modeKeep')}</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Fade Transitions */}
              {activeTab === 'transitions' && (
                <div class="py-5 space-y-6">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div class="space-y-2">
                      <label class="block text-xs font-bold text-[#091540] dark:text-white">
                        {t('fade.in')}
                      </label>
                      <select
                        aria-label={t('fade.in')}
                        value={fadeInDuration}
                        onChange={(e) => setFadeInDuration(parseFloat(e.target.value))}
                        class="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#060e2c] border border-gray-200 dark:border-gray-700 text-xs font-semibold text-[#091540] dark:text-white"
                      >
                        <option value="0">{t('fade.none')}</option>
                        <option value="0.5">{t('fade.half')}</option>
                        <option value="1">{t('fade.one')}</option>
                        <option value="2">{t('fade.two')}</option>
                        <option value="3">{t('fade.three')}</option>
                      </select>
                    </div>

                    <div class="space-y-2">
                      <label class="block text-xs font-bold text-[#091540] dark:text-white">
                        {t('fade.out')}
                      </label>
                      <select
                        aria-label={t('fade.out')}
                        value={fadeOutDuration}
                        onChange={(e) => setFadeOutDuration(parseFloat(e.target.value))}
                        class="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#060e2c] border border-gray-200 dark:border-gray-700 text-xs font-semibold text-[#091540] dark:text-white"
                      >
                        <option value="0">{t('fade.none')}</option>
                        <option value="0.5">{t('fade.half')}</option>
                        <option value="1">{t('fade.one')}</option>
                        <option value="2">{t('fade.two')}</option>
                        <option value="3">{t('fade.three')}</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Export Settings & Resolution */}
              {activeTab === 'settings' && (
                <div class="py-5 space-y-4">
                  <div class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    {t('editor.resolution')}
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label
                      class={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                        exportResolution === '1080p'
                          ? 'bg-[#ABD2FA]/20 dark:bg-[#1B2CC1]/30 border-[#1B2CC1] text-[#1B2CC1] dark:text-white'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div class="flex items-center justify-between mb-1">
                        <input
                          type="radio"
                          name="resolution"
                          value="1080p"
                          checked={exportResolution === '1080p'}
                          onChange={() => setExportResolution('1080p')}
                          class="text-[#1B2CC1]"
                        />
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFDD00] text-deep-navy">
                          Recommended
                        </span>
                      </div>
                      <span class="text-xs font-bold">{t('editor.res1080p')}</span>
                      <span class="text-[11px] text-gray-400 mt-1">Crisp High Definition Output</span>
                    </label>

                    <label
                      class={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                        exportResolution === '720p'
                          ? 'bg-[#ABD2FA]/20 dark:bg-[#1B2CC1]/30 border-[#1B2CC1] text-[#1B2CC1] dark:text-white'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div class="mb-1">
                        <input
                          type="radio"
                          name="resolution"
                          value="720p"
                          checked={exportResolution === '720p'}
                          onChange={() => setExportResolution('720p')}
                          class="text-[#1B2CC1]"
                        />
                      </div>
                      <span class="text-xs font-bold">{t('editor.res720p')}</span>
                      <span class="text-[11px] text-gray-400 mt-1">Faster export rendering</span>
                    </label>

                    <label
                      class={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                        exportResolution === 'original'
                          ? 'bg-[#ABD2FA]/20 dark:bg-[#1B2CC1]/30 border-[#1B2CC1] text-[#1B2CC1] dark:text-white'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div class="mb-1">
                        <input
                          type="radio"
                          name="resolution"
                          value="original"
                          checked={exportResolution === 'original'}
                          onChange={() => setExportResolution('original')}
                          class="text-[#1B2CC1]"
                        />
                      </div>
                      <span class="text-xs font-bold">{t('editor.resOriginal')}</span>
                      <span class="text-[11px] text-gray-400 mt-1">Match source video dimensions</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Export Action Bar */}
              <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  <span>Format: </span>
                  <span class="font-bold text-[#1B2CC1] dark:text-[#ABD2FA]">
                    {exportResolution.toUpperCase()} MP4 (H.264 / AAC)
                  </span>
                  <span> • Total: {totalProjectDuration.toFixed(2)}s</span>
                </div>

                <button
                  type="button"
                  onClick={handleExport}
                  disabled={isExporting || videoClips.length === 0}
                  class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#1B2CC1] hover:bg-[#7692FF] text-white font-extrabold text-sm shadow-md hover:shadow-glow active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all"
                >
                  <Download class="w-4 h-4" />
                  <span>
                    {isExporting
                      ? t('export.processing')
                      : exportResolution === '1080p'
                      ? 'Export 1080p Full HD'
                      : t('export.button')}
                  </span>
                </button>
              </div>
            </div>

            {/* Export Progress Card */}
            {isExporting && (
              <div class="p-6 rounded-3xl bg-white/95 dark:bg-[#0c1844]/95 border-2 border-[#1B2CC1] shadow-2xl animate-pulse-glow">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2.5">
                    <div class="w-6 h-6 rounded-full border-2 border-[#1B2CC1] border-t-transparent animate-spin"></div>
                    <span class="text-sm font-extrabold text-[#091540] dark:text-white">
                      {exportStatusText || t('export.processing')}
                    </span>
                  </div>
                  <span class="font-mono text-base font-extrabold text-[#1B2CC1] dark:text-[#ABD2FA]">
                    {exportProgress}%
                  </span>
                </div>

                <div class="w-full h-3 bg-gray-200 dark:bg-[#060e2c] rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-[#1B2CC1] via-[#7692FF] to-[#ABD2FA] transition-all duration-300 rounded-full"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>

                <p class="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                  Compiling multiple video clips into 1080p Full HD locally via WebAssembly. Please keep this tab open.
                </p>
              </div>
            )}

            {/* Error Message Card */}
            {errorMessage && (
              <div class="p-5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 flex items-start gap-3">
                <AlertCircle class="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 class="text-sm font-bold">{t('export.errorTitle')}</h4>
                  <p class="text-xs mt-1">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Export Complete Card */}
            {exportedVideoUrl && (
              <div class="p-8 rounded-3xl bg-gradient-to-br from-white via-white to-[#ABD2FA]/20 dark:from-[#0c1844] dark:via-[#0c1844] dark:to-[#1B2CC1]/20 border-2 border-green-500 shadow-2xl space-y-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                    <CheckCircle2 class="w-6 h-6" />
                  </div>
                  <div>
                    <h3 class="text-xl font-extrabold text-[#091540] dark:text-white">
                      {t('export.readyTitle')}
                    </h3>
                    <p class="text-xs text-[#091540]/70 dark:text-[#ABD2FA]/70">
                      {t('export.readySubtitle')}
                    </p>
                  </div>
                </div>

                <div class="rounded-2xl overflow-hidden bg-black max-h-[380px] aspect-video flex items-center justify-center">
                  <video
                    src={exportedVideoUrl}
                    controls
                    playsInline
                    class="w-full h-full object-contain"
                  />
                </div>

                <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <a
                    href={exportedVideoUrl}
                    download="browsercut-1080p.mp4"
                    class="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all active:scale-95"
                  >
                    <Download class="w-4 h-4" />
                    <span>{t('export.download')}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleResetProject}
                    class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-[#091540] dark:text-[#ABD2FA] font-bold text-xs hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw class="w-4 h-4" />
                    <span>{t('export.editAnother')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
