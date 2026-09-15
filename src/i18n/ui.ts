export const languages = {
  en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
  es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  pt: { name: 'Português', flag: '🇧🇷', dir: 'ltr' },
  de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  ja: { name: '日本語', flag: '🇯🇵', dir: 'ltr' },
} as const;

export type Locale = keyof typeof languages;
export const defaultLang: Locale = 'en';

export const ui = {
  en: {
    // Meta & Header
    'site.title': 'BrowserCut | Free Online Video & Audio Editor',
    'site.tagline': 'Free Automatic In-Browser Video & Audio Editor',
    'site.description':
      'Edit, trim, and add audio to your videos directly in your browser. 100% free, no watermarks, no server uploads. Fast client-side processing.',
    'nav.features': 'Features',
    'nav.howItWorks': 'How It Works',
    'nav.faq': 'FAQ',
    'nav.support': 'Buy Me a Coffee',
    'nav.theme': 'Toggle Theme',
    'nav.language': 'Language',

    // Hero
    'hero.badge': '100% Client-Side • Zero Server Uploads',
    'hero.title': 'Fast, Private In-Browser Video & Audio Editor',
    'hero.subtitle':
      'Add multiple video clips, arrange on a timeline, layer multiple audio tracks, trim with millisecond precision, and export in Full HD 1080p without server uploads.',

    // Workspace & Dropzone
    'editor.dropTitle': 'Drop your videos here or click to browse',
    'editor.dropSubtitle': 'Add one or multiple video clips (MP4, WebM, MOV, AVI)',
    'editor.chooseVideo': 'Select Video Files',
    'editor.chooseAudio': 'Select Audio Files',
    'editor.addVideo': '+ Add Video Clip',
    'editor.addAudio': '+ Add Audio Track',
    'editor.changeVideo': 'Change Video',
    'editor.privacyGuaranteed': 'Your files never leave your computer. 100% private and secure.',
    'editor.videoClips': 'Video Clips Sequence',
    'editor.audioTracks': 'Audio Tracks',
    'editor.resolution': 'Export Resolution',
    'editor.res1080p': '1080p Full HD (1920×1080)',
    'editor.res720p': '720p HD (1280×720)',
    'editor.resOriginal': 'Original Source Resolution',
    'editor.moveEarlier': 'Move Earlier',
    'editor.moveLater': 'Move Later',
    'editor.deleteClip': 'Remove Clip',
    'editor.totalDuration': 'Total Project Duration',
    'editor.audioDelay': 'Start Offset (seconds)',
    'editor.audioVolume': 'Volume',
    'editor.editingClip': 'Editing Clip',
    'editor.clipsCount': 'Clips',
    'editor.noClips': 'No video clips added yet',
    'editor.aspectNotice': 'Uniform 1080p Full HD scaling ensures clips of different sizes fit seamlessly.',

    // Video Player
    'player.play': 'Play',
    'player.pause': 'Pause',
    'player.current': 'Current Time',
    'player.duration': 'Duration',
    'player.mute': 'Mute',
    'player.unmute': 'Unmute',
    'player.aspect': 'Aspect Ratio',

    // Timeline & Trimming
    'trim.title': 'Timeline & Trimming',
    'trim.start': 'Start Time',
    'trim.end': 'End Time',
    'trim.selectedDuration': 'Trimmed Clip Length',
    'trim.setStartCurrent': 'Set Start to Current',
    'trim.setEndCurrent': 'Set End to Current',
    'trim.reset': 'Reset Range',
    'trim.hint': 'Drag the range sliders or use the buttons to set the exact cut boundaries for this clip.',

    // Audio Tool
    'audio.title': 'Audio Tracks & Mixing',
    'audio.noFile': 'No secondary audio tracks added yet',
    'audio.fileSelected': 'Attached Audio',
    'audio.remove': 'Remove Audio Track',
    'audio.muteOriginal': 'Mute original audio from all videos',
    'audio.mode': 'Audio Mixing Mode',
    'audio.modeKeep': 'Keep original video audio only',
    'audio.modeReplace': 'Replace original audio with secondary tracks',
    'audio.modeMix': 'Mix original video audio with secondary tracks',
    'audio.alignLength': 'Trim audio to match video duration',
    'audio.trimStart': 'Cut / Start Time',
    'audio.trimEnd': 'Cut / End Time',
    'audio.trimmedLength': 'Trimmed Audio Length',
    'audio.preview': 'Preview Audio',
    'audio.pause': 'Pause Audio',
    'audio.cutTitle': 'Cut & Trim Audio Track',

    // Fade Transitions
    'fade.title': 'Fade In & Out Transitions',
    'fade.in': 'Intro Fade In (Video & Audio)',
    'fade.out': 'Outro Fade Out (Video & Audio)',
    'fade.none': 'None (0s)',
    'fade.half': '0.5 Seconds',
    'fade.one': '1.0 Second',
    'fade.two': '2.0 Seconds',
    'fade.three': '3.0 Seconds',

    // Export & Engine Status
    'export.button': 'Export 1080p Video',
    'export.processing': 'Rendering 1080p Video...',
    'export.cancel': 'Cancel Export',
    'export.readyTitle': '1080p Video Successfully Exported!',
    'export.readySubtitle': 'Your multi-clip Full HD video has been compiled locally in your browser memory.',
    'export.download': 'Download Full HD Video (MP4)',
    'export.editAnother': 'Edit Another Project',
    'export.statusInit': 'Initializing WebAssembly engine...',
    'export.statusLoading': 'Reading media clips into local memory...',
    'export.statusEncoding': 'Executing multi-clip 1080p processing pipeline...',
    'export.statusFinalizing': 'Packaging and preparing 1080p download...',
    'export.errorTitle': 'Processing Encountered an Error',
    'export.errorSubtitle': 'Please verify your media files are not corrupted and try again.',

    // Features Section
    'features.title': 'Engineered for Pure Browser Performance',
    'features.subtitle':
      'No subscription fees, no user accounts, and zero cloud uploads. The modern way to edit media.',
    'features.f1.title': '100% Local & Private',
    'features.f1.desc':
      'Videos are processed strictly within your browser sandbox. No bytes are sent to any remote server.',
    'features.f2.title': 'Multi-Clip Video Sequencing',
    'features.f2.desc':
      'Combine multiple video clips into one seamless project with custom order, trim points, and 1080p output.',
    'features.f3.title': 'Multi-Track Audio Mixing',
    'features.f3.desc':
      'Layer multiple background music tracks, voiceovers, or sound effects with independent start delays and volume controls.',
    'features.f4.title': 'Cinematic Fade Transitions',
    'features.f4.desc':
      'Apply smooth video luminance fade-in/out and audio acoustic decibel fading with a single click.',
    'features.f5.title': 'Zero Watermarks, 100% Free',
    'features.f5.desc':
      'Export crystal clear, uncompressed 1080p MP4 videos without intrusive branding, logos, or forced signups.',
    'features.f6.title': 'High-Speed WebAssembly',
    'features.f6.desc':
      'Powered by FFmpeg compiled to WASM with Cross-Origin Isolation headers for near-native CPU rendering.',

    // How It Works
    'how.title': 'How BrowserCut Works',
    'how.subtitle': 'Professional multi-clip video editing in three straightforward steps.',
    'how.step1.num': '01',
    'how.step1.title': 'Import Media',
    'how.step1.desc': 'Add multiple videos and audio tracks. They load instantly into browser memory without uploading.',
    'how.step2.num': '02',
    'how.step2.title': 'Arrange, Trim & Add Sound',
    'how.step2.desc': 'Reorder clips, set start/end cut points for each, set audio start timings and fade transitions.',
    'how.step3.num': '03',
    'how.step3.title': 'Export 1080p Full HD',
    'how.step3.desc': 'Hit Export. Watch real-time rendering progress and download your pristine 1080p MP4 file.',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Got questions about browser video editing? We have answers.',
    'faq.q1': 'Is BrowserCut really 100% private?',
    'faq.a1':
      'Yes, absolutely. BrowserCut utilizes WebAssembly (WASM) to run FFmpeg locally inside your browser thread. Unlike traditional online tools, your files are never uploaded to a cloud server or external database.',
    'faq.q2': 'Can I combine multiple videos and audio tracks?',
    'faq.a2':
      'Yes! You can add multiple video clips, reorder them, adjust individual cut points, layer multiple audio tracks with custom start times, and export everything into a unified 1080p Full HD video.',
    'faq.q3': 'Which video and audio formats are supported?',
    'faq.a3':
      'You can import all standard video formats (MP4, WebM, MOV, MKV, AVI) and audio formats (MP3, WAV, AAC, OGG, M4A). Exports are compiled into widely compatible 1080p MP4 (H.264 / AAC) files.',
    'faq.q4': 'Can I export in Full HD 1080p?',
    'faq.a4':
      'Yes! BrowserCut features a full 1080p Full HD (1920x1080) export pipeline with aspect-ratio preserving scaling, so clips from cameras and phones stitch seamlessly.',
    'faq.q5': 'Why does exporting take some time?',
    'faq.a5':
      'Video transcoding and re-encoding are computationally intensive tasks. Because the processing is done locally on your own computer or device rather than a remote supercomputer, the speed depends on your CPU power.',

    // Footer
    'footer.desc':
      'Free, open, in-browser video and audio editor powered by WebAssembly. Zero uploads, zero tracking, maximum privacy.',
    'footer.supportBtn': 'Support the Developer on Buy Me a Coffee',
    'footer.github': 'GitHub Repository',
    'footer.privacy': 'Privacy First',
    'footer.allRights': 'BrowserCut. Open Source Client-Side Video Utility.',
  },

  es: {
    // Meta & Header
    'site.title': 'BrowserCut | Editor de Video y Audio Gratuito en el Navegador',
    'site.tagline': 'Editor de Video y Audio Gratuito y Automático en el Navegador',
    'site.description':
      'Edita, recorta y añade audio a tus videos directamente en tu navegador. 100% gratis, sin marcas de agua, sin subir archivos a servidores. Procesamiento rápido en el cliente.',
    'nav.features': 'Funciones',
    'nav.howItWorks': 'Cómo Funciona',
    'nav.faq': 'Preguntas',
    'nav.support': 'Invítame un Café',
    'nav.theme': 'Cambiar Tema',
    'nav.language': 'Idioma',

    // Hero
    'hero.badge': '100% del Lado del Cliente • Sin Subidas al Servidor',
    'hero.title': 'Editor de Video y Audio Multiclip en tu Navegador',
    'hero.subtitle':
      'Agrega múltiples clips de video, organiza tu línea de tiempo, añade múltiples pistas de audio, recorta con precisión y exporta en Full HD 1080p sin salir del navegador.',

    // Workspace & Dropzone
    'editor.dropTitle': 'Arrastra tus videos aquí o haz clic para buscar',
    'editor.dropSubtitle': 'Agrega uno o varios clips de video (MP4, WebM, MOV, AVI)',
    'editor.chooseVideo': 'Seleccionar Archivos de Video',
    'editor.chooseAudio': 'Seleccionar Archivos de Audio',
    'editor.addVideo': '+ Añadir Clip de Video',
    'editor.addAudio': '+ Añadir Pista de Audio',
    'editor.changeVideo': 'Cambiar Video',
    'editor.privacyGuaranteed': 'Tus archivos nunca salen de tu ordenador. 100% privado y seguro.',
    'editor.videoClips': 'Secuencia de Clips de Video',
    'editor.audioTracks': 'Pistas de Audio',
    'editor.resolution': 'Resolución de Exportación',
    'editor.res1080p': '1080p Full HD (1920×1080)',
    'editor.res720p': '720p HD (1280×720)',
    'editor.resOriginal': 'Resolución Original del Archivo',
    'editor.moveEarlier': 'Mover Antes',
    'editor.moveLater': 'Mover Después',
    'editor.deleteClip': 'Eliminar Clip',
    'editor.totalDuration': 'Duración Total del Proyecto',
    'editor.audioDelay': 'Inicio en (segundos)',
    'editor.audioVolume': 'Volumen',
    'editor.editingClip': 'Editando Clip',
    'editor.clipsCount': 'Clips',
    'editor.noClips': 'Aún no has añadido clips de video',
    'editor.aspectNotice': 'El escalado uniforme a 1080p Full HD asegura que clips de diferentes formatos encajen perfectamente.',

    // Video Player
    'player.play': 'Reproducir',
    'player.pause': 'Pausar',
    'player.current': 'Tiempo Actual',
    'player.duration': 'Duración',
    'player.mute': 'Silenciar',
    'player.unmute': 'Activar Sonido',
    'player.aspect': 'Relación de Aspecto',

    // Timeline & Trimming
    'trim.title': 'Línea de Tiempo y Recorte',
    'trim.start': 'Tiempo de Inicio',
    'trim.end': 'Tiempo Final',
    'trim.selectedDuration': 'Duración del Clip Recortado',
    'trim.setStartCurrent': 'Fijar Inicio en Cabezal',
    'trim.setEndCurrent': 'Fijar Fin en Cabezal',
    'trim.reset': 'Restablecer Rango',
    'trim.hint': 'Arrastra los deslizadores de rango para ajustar los cortes exactos de este clip.',

    // Audio Tool
    'audio.title': 'Pistas de Audio y Mezcla',
    'audio.noFile': 'No hay pistas de audio secundarias añadidas',
    'audio.fileSelected': 'Audio Adjunto',
    'audio.remove': 'Quitar Pista de Audio',
    'audio.muteOriginal': 'Silenciar audio original de los videos',
    'audio.mode': 'Modo de Mezcla de Audio',
    'audio.modeKeep': 'Conservar solo el audio original del video',
    'audio.modeReplace': 'Reemplazar audio original por pistas secundarias',
    'audio.modeMix': 'Mezclar audio original con pistas secundarias',
    'audio.alignLength': 'Recortar audio para ajustarlo a la duración del video',
    'audio.trimStart': 'Inicio del Corte',
    'audio.trimEnd': 'Fin del Corte',
    'audio.trimmedLength': 'Duración del Audio Cortado',
    'audio.preview': 'Escuchar Audio',
    'audio.pause': 'Pausar Audio',
    'audio.cutTitle': 'Recortar Pista de Audio',

    // Fade Transitions
    'fade.title': 'Transiciones de Fundido (Fade In / Out)',
    'fade.in': 'Fundido de Entrada (Intro)',
    'fade.out': 'Fundido de Salida (Outro)',
    'fade.none': 'Ninguno (0s)',
    'fade.half': '0.5 Segundos',
    'fade.one': '1.0 Segundo',
    'fade.two': '2.0 Segundos',
    'fade.three': '3.0 Segundos',

    // Export & Engine Status
    'export.button': 'Exportar Video en 1080p',
    'export.processing': 'Renderizando Video 1080p...',
    'export.cancel': 'Cancelar Exportación',
    'export.readyTitle': '¡Video 1080p Exportado con Éxito!',
    'export.readySubtitle': 'Tu video multiclip en Full HD se ha generado localmente en tu navegador.',
    'export.download': 'Descargar Video Full HD (MP4)',
    'export.editAnother': 'Editar Nuevo Proyecto',
    'export.statusInit': 'Iniciando motor WebAssembly...',
    'export.statusLoading': 'Cargando clips multimedia en memoria local...',
    'export.statusEncoding': 'Ejecutando procesamiento multiclip en 1080p...',
    'export.statusFinalizing': 'Empaquetando descarga en 1080p...',
    'export.errorTitle': 'Ocurrió un Error Durante el Procesamiento',
    'export.errorSubtitle': 'Verifica tus archivos multimedia e inténtalo de nuevo.',

    // Features Section
    'features.title': 'Diseñado para Máximo Rendimiento en el Navegador',
    'features.subtitle': 'Sin suscripciones, sin cuentas de usuario y sin subir nada a la nube.',
    'features.f1.title': '100% Local y Privado',
    'features.f1.desc':
      'Los videos se procesan estrictamente dentro del navegador. Ningún byte se envía a servidores externos.',
    'features.f2.title': 'Secuencia de Múltiples Clips',
    'features.f2.desc':
      'Une múltiples videos en un solo proyecto con orden personalizado, cortes precisos y salida 1080p.',
    'features.f3.title': 'Mezcla Multicanal de Audio',
    'features.f3.desc':
      'Superpón varias pistas de música o efectos con tiempos de inicio y volumen individuales.',
    'features.f4.title': 'Transiciones de Fundido Cinemáticas',
    'features.f4.desc':
      'Aplica fundidos suaves de brillo de video y volumen de audio con un solo clic.',
    'features.f5.title': 'Sin Marcas de Agua, 100% Gratis',
    'features.f5.desc':
      'Exporta videos MP4 en 1080p nítidos y sin marcas de agua ni restricciones.',
    'features.f6.title': 'WebAssembly de Alta Velocidad',
    'features.f6.desc':
      'Impulsado por FFmpeg compilado a WASM con aislamiento de origen cruzado para un rendimiento casi nativo.',

    // How It Works
    'how.title': 'Cómo Funciona BrowserCut',
    'how.subtitle': 'Edición y recorte de video profesional en tres pasos sencillos.',
    'how.step1.num': '01',
    'how.step1.title': 'Importar Archivos',
    'how.step1.desc': 'Añade múltiples videos y pistas de audio. Se cargan al instante sin subidas.',
    'how.step2.num': '02',
    'how.step2.title': 'Organizar, Recortar y Mezclar',
    'how.step2.desc': 'Ordena clips, recorta cada uno con precisión y ajusta tiempos de sonido.',
    'how.step3.num': '03',
    'how.step3.title': 'Exportar en 1080p Full HD',
    'how.step3.desc': 'Haz clic en Exportar y descarga tu video Full HD compilado en MP4.',

    // FAQ
    'faq.title': 'Preguntas Frecuentes',
    'faq.subtitle': 'Todo lo que necesitas saber sobre BrowserCut.',
    'faq.q1': '¿Es BrowserCut verdaderamente 100% privado?',
    'faq.a1':
      'Sí, absolutamente. BrowserCut ejecuta FFmpeg localmente dentro de tu navegador mediante WebAssembly. Tus archivos nunca se envían a ningún servidor en la nube.',
    'faq.q2': '¿Puedo unir múltiples videos y pistas de audio?',
    'faq.a2':
      '¡Sí! Puedes añadir varios clips de video, ordenarlos, recortar cada uno de forma independiente, añadir múltiples pistas de audio y exportar todo en 1080p Full HD.',
    'faq.q3': '¿Qué formatos de video y audio son compatibles?',
    'faq.a3':
      'Admite MP4, WebM, MOV, MKV, AVI, así como MP3, WAV, AAC, OGG y M4A. Se exporta en MP4 1080p universal.',
    'faq.q4': '¿Puedo exportar en Full HD 1080p?',
    'faq.a4':
      '¡Sí! Cuenta con renderizado completo a 1080p Full HD (1920x1080) con escalado inteligente para unir videos de distintos formatos sin deformaciones.',
    'faq.q5': '¿Por qué la exportación toma algo de tiempo?',
    'faq.a5':
      'La codificación de video es una tarea intensiva. Al procesarse localmente en tu dispositivo, la velocidad depende de la potencia de tu CPU.',

    // Footer
    'footer.desc':
      'Editor de video y audio gratuito en el navegador con WebAssembly. Cero subidas, cero rastreo, privacidad total.',
    'footer.supportBtn': 'Apoya al Desarrollador en Buy Me a Coffee',
    'footer.github': 'Repositorio en GitHub',
    'footer.privacy': 'Privacidad Garantizada',
    'footer.allRights': 'BrowserCut. Utilidad de video libre de código abierto.',
  },

  pt: {
    // Meta & Header
    'site.title': 'BrowserCut | Editor de Vídeo e Áudio Gratuito no Navegador',
    'site.tagline': 'Editor de Vídeo e Áudio Gratuito e Automático no Navegador',
    'site.description':
      'Edite, corte e adicione áudio aos seus vídeos diretamente no navegador. 100% gratuito, sem marcas d’água, sem upload para servidores. Processamento rápido no cliente.',
    'nav.features': 'Recursos',
    'nav.howItWorks': 'Como Funciona',
    'nav.faq': 'Perguntas',
    'nav.support': 'Apoie o Desenvolvedor',
    'nav.theme': 'Alternar Tema',
    'nav.language': 'Idioma',

    // Hero
    'hero.badge': '100% no Lado do Cliente • Zero Uploads para Servidor',
    'hero.title': 'Editor de Vídeo e Áudio Multiclipe no seu Navegador',
    'hero.subtitle':
      'Adicione múltiplos vídeos, organize na linha do tempo, misture várias faixas de áudio, corte com precisão e exporte em Full HD 1080p sem sair do navegador.',

    // Workspace & Dropzone
    'editor.dropTitle': 'Arraste seus vídeos aqui ou clique para selecionar',
    'editor.dropSubtitle': 'Adicione um ou vários clipes de vídeo (MP4, WebM, MOV, AVI)',
    'editor.chooseVideo': 'Selecionar Arquivos de Vídeo',
    'editor.chooseAudio': 'Selecionar Arquivos de Áudio',
    'editor.addVideo': '+ Adicionar Clipe de Vídeo',
    'editor.addAudio': '+ Adicionar Faixa de Áudio',
    'editor.changeVideo': 'Trocar Vídeo',
    'editor.privacyGuaranteed': 'Seus arquivos nunca saem do seu computador. 100% privado e seguro.',
    'editor.videoClips': 'Sequência de Clipes de Vídeo',
    'editor.audioTracks': 'Faixas de Áudio',
    'editor.resolution': 'Resolução de Exportação',
    'editor.res1080p': '1080p Full HD (1920×1080)',
    'editor.res720p': '720p HD (1280×720)',
    'editor.resOriginal': 'Resolução Original da Fonte',
    'editor.moveEarlier': 'Mover para Antes',
    'editor.moveLater': 'Mover para Depois',
    'editor.deleteClip': 'Remover Clipe',
    'editor.totalDuration': 'Duração Total do Projeto',
    'editor.audioDelay': 'Início em (segundos)',
    'editor.audioVolume': 'Volume',
    'editor.editingClip': 'Editando Clipe',
    'editor.clipsCount': 'Clipes',
    'editor.noClips': 'Nenhum clipe adicionado ainda',
    'editor.aspectNotice': 'O redimensionamento automático para 1080p Full HD garante ajuste perfeito para qualquer formato de vídeo.',

    // Video Player
    'player.play': 'Reproduzir',
    'player.pause': 'Pausar',
    'player.current': 'Tempo Atual',
    'player.duration': 'Duração',
    'player.mute': 'Silenciar',
    'player.unmute': 'Ativar Som',
    'player.aspect': 'Proporção',

    // Timeline & Trimming
    'trim.title': 'Linha do Tempo e Corte',
    'trim.start': 'Início do Corte',
    'trim.end': 'Fim do Corte',
    'trim.selectedDuration': 'Duração do Vídeo Cortado',
    'trim.setStartCurrent': 'Definir Início no Ponto Atual',
    'trim.setEndCurrent': 'Definir Fim no Ponto Atual',
    'trim.reset': 'Redefinir Intervalo',
    'trim.hint': 'Arraste os controles deslizantes para definir os limites exatos de corte deste clipe.',

    // Audio Tool
    'audio.title': 'Faixas de Áudio e Mixagem',
    'audio.noFile': 'Nenhuma faixa de áudio secundária adicionada',
    'audio.fileSelected': 'Áudio Anexado',
    'audio.remove': 'Remover Faixa de Áudio',
    'audio.muteOriginal': 'Silenciar áudio original dos vídeos',
    'audio.mode': 'Modo de Mixagem de Áudio',
    'audio.modeKeep': 'Manter apenas o áudio original do vídeo',
    'audio.modeReplace': 'Substituir áudio original por novas faixas',
    'audio.modeMix': 'Misturar áudio original com novas faixas',
    'audio.alignLength': 'Cortar áudio para coincidir com a duração do vídeo',
    'audio.trimStart': 'Início do Corte',
    'audio.trimEnd': 'Fim do Corte',
    'audio.trimmedLength': 'Duração do Áudio Cortado',
    'audio.preview': 'Ouvir Áudio',
    'audio.pause': 'Pausar Áudio',
    'audio.cutTitle': 'Cortar Faixa de Áudio',

    // Fade Transitions
    'fade.title': 'Transições de Fade (In / Out)',
    'fade.in': 'Fade In Inicial (Vídeo e Áudio)',
    'fade.out': 'Fade Out Final (Vídeo e Áudio)',
    'fade.none': 'Nenhum (0s)',
    'fade.half': '0.5 Segundos',
    'fade.one': '1.0 Segundo',
    'fade.two': '2.0 Segundos',
    'fade.three': '3.0 Segundos',

    // Export & Engine Status
    'export.button': 'Exportar Vídeo em 1080p',
    'export.processing': 'Renderizando Vídeo 1080p...',
    'export.cancel': 'Cancelar Exportação',
    'export.readyTitle': 'Vídeo 1080p Exportado com Sucesso!',
    'export.readySubtitle': 'Seu vídeo multiclipe em Full HD foi renderizado localmente no seu navegador.',
    'export.download': 'Baixar Vídeo Full HD (MP4)',
    'export.editAnother': 'Editar Novo Projeto',
    'export.statusInit': 'Iniciando motor WebAssembly...',
    'export.statusLoading': 'Carregando arquivos de mídia na memória local...',
    'export.statusEncoding': 'Processando multiclip em 1080p...',
    'export.statusFinalizing': 'Finalizando download em 1080p...',
    'export.errorTitle': 'Ocorreu um Erro Durante o Processamento',
    'export.errorSubtitle': 'Verifique se os arquivos não estão corrompidos e tente novamente.',

    // Features Section
    'features.title': 'Projetado para Máximo Desempenho no Navegador',
    'features.subtitle': 'Sem assinaturas, sem cadastro e sem uploads para a nuvem.',
    'features.f1.title': '100% Local e Privado',
    'features.f1.desc':
      'Os vídeos são processados estritamente no seu navegador. Nenhum byte é enviado para servidores externos.',
    'features.f2.title': 'Sequência de Múltiplos Clipes',
    'features.f2.desc':
      'Junte vários vídeos em um projeto unificado com ordem customizada, cortes e saída 1080p.',
    'features.f3.title': 'Mixagem de Múltiplas Faixas de Áudio',
    'features.f3.desc':
      'Adicione várias faixas de áudio ou músicas com tempos de entrada e volumes ajustáveis.',
    'features.f4.title': 'Transições de Fade Cinematográficas',
    'features.f4.desc':
      'Aplique fade in/out suave no brilho do vídeo e no volume do áudio com um só clique.',
    'features.f5.title': 'Sem Marca d’Água, 100% Grátis',
    'features.f5.desc': 'Exporte vídeos MP4 nítidos em 1080p sem marcas d’água ou cobranças.',
    'features.f6.title': 'WebAssembly de Alta Velocidade',
    'features.f6.desc':
      'Alimentado por FFmpeg compilado em WASM com Cross-Origin Isolation para desempenho quase nativo.',

    // How It Works
    'how.title': 'Como o BrowserCut Funciona',
    'how.subtitle': 'Edição profissional de vídeo em três passos simples.',
    'how.step1.num': '01',
    'how.step1.title': 'Importar Mídias',
    'how.step1.desc': 'Adicione múltiplos vídeos e músicas. Carregamento imediato sem upload.',
    'how.step2.num': '02',
    'how.step2.title': 'Organizar, Cortar e Ajustar Som',
    'how.step2.desc': 'Reordene clipes, corte cada vídeo e defina os momentos exatos das músicas.',
    'how.step3.num': '03',
    'how.step3.title': 'Exportar em 1080p Full HD',
    'how.step3.desc': 'Clique em Exportar e baixe seu vídeo em alta definição MP4.',

    // FAQ
    'faq.title': 'Perguntas Frequentes',
    'faq.subtitle': 'Tire suas dúvidas sobre edição de vídeo no navegador.',
    'faq.q1': 'O BrowserCut é realmente 100% privado?',
    'faq.a1':
      'Sim, com certeza. O BrowserCut executa o FFmpeg localmente no seu navegador através de WebAssembly. Seus arquivos jamais são enviados para a nuvem.',
    'faq.q2': 'Posso juntar vários vídeos e áudios?',
    'faq.a2':
      'Sim! Você pode adicionar vários clipes de vídeo, reordená-los, recortar cada um, incluir múltiplas faixas sonoras e exportar tudo em 1080p Full HD.',
    'faq.q3': 'Quais formatos de vídeo e áudio são aceitos?',
    'faq.a3':
      'Suporta MP4, WebM, MOV, MKV, AVI, além de MP3, WAV, AAC, OGG e M4A. As exportações são geradas em MP4 universal.',
    'faq.q4': 'Posso exportar em Full HD 1080p?',
    'faq.a4':
      'Sim! O BrowserCut suporta saída nativa em 1080p Full HD (1920x1080) com ajuste inteligente de proporção.',
    'faq.q5': 'Por que o processo de exportação leva algum tempo?',
    'faq.a5':
      'A codificação de vídeo é um processo pesado. Como roda no seu próprio hardware, a velocidade depende do seu processador.',

    // Footer
    'footer.desc':
      'Editor de vídeo e áudio gratuito no navegador com WebAssembly. Zero uploads, zero rastreamento, máxima privacidade.',
    'footer.supportBtn': 'Apoie o Desenvolvedor no Buy Me a Coffee',
    'footer.github': 'Repositório GitHub',
    'footer.privacy': 'Privacidade Garantida',
    'footer.allRights': 'BrowserCut. Utilitário de vídeo de código aberto.',
  },

  de: {
    // Meta & Header
    'site.title': 'BrowserCut | Kostenloser Video- & Audio-Editor im Browser',
    'site.tagline': 'Kostenloser automatischer Video- & Audio-Editor im Browser',
    'site.description':
      'Bearbeiten, schneiden und vertonen Sie Ihre Videos direkt im Browser. 100% kostenlos, keine Wasserzeichen, kein Server-Upload. Schnelle clientseitige Verarbeitung.',
    'nav.features': 'Funktionen',
    'nav.howItWorks': 'So Funktioniert Es',
    'nav.faq': 'FAQ',
    'nav.support': 'Kaffee Spendieren',
    'nav.theme': 'Design Umschalten',
    'nav.language': 'Sprache',

    // Hero
    'hero.badge': '100% Clientseitig • Keine Server-Uploads',
    'hero.title': 'Multi-Clip Video- & Audio-Editor im Browser',
    'hero.subtitle':
      'Fügen Sie mehrere Videos hinzu, arrangieren Sie diese auf der Zeitleiste, mischen Sie mehrere Tonspuren und exportieren Sie in 1080p Full HD ohne Cloud-Uploads.',

    // Workspace & Dropzone
    'editor.dropTitle': 'Videos hier ablegen oder Dateien auswählen',
    'editor.dropSubtitle': 'Mehrere Videoclips hinzufügen (MP4, WebM, MOV, AVI)',
    'editor.chooseVideo': 'Videodateien Auswählen',
    'editor.chooseAudio': 'Audiodateien Auswählen',
    'editor.addVideo': '+ Videoclip Hinzufügen',
    'editor.addAudio': '+ Tonspur Hinzufügen',
    'editor.changeVideo': 'Video Ändern',
    'editor.privacyGuaranteed': 'Ihre Dateien verlassen niemals Ihren Computer. 100% privat und sicher.',
    'editor.videoClips': 'Videoclip-Reihenfolge',
    'editor.audioTracks': 'Tonspuren',
    'editor.resolution': 'Export-Auflösung',
    'editor.res1080p': '1080p Full HD (1920×1080)',
    'editor.res720p': '720p HD (1280×720)',
    'editor.resOriginal': 'Originale Quelldatei-Auflösung',
    'editor.moveEarlier': 'Nach Vorne',
    'editor.moveLater': 'Nach Hinten',
    'editor.deleteClip': 'Clip Entfernen',
    'editor.totalDuration': 'Gesamtdauer des Projekts',
    'editor.audioDelay': 'Startverzögerung (Sekunden)',
    'editor.audioVolume': 'Lautstärke',
    'editor.editingClip': 'Ausgewählter Clip',
    'editor.clipsCount': 'Clips',
    'editor.noClips': 'Noch keine Videoclips hinzugefügt',
    'editor.aspectNotice': 'Die standardisierte 1080p Full HD Skalierung sorgt dafür, dass Clips unterschiedlicher Formate nahtlos passen.',

    // Video Player
    'player.play': 'Abspielen',
    'player.pause': 'Pause',
    'player.current': 'Aktuelle Zeit',
    'player.duration': 'Gesamtdauer',
    'player.mute': 'Stummschalten',
    'player.unmute': 'Ton Ein',
    'player.aspect': 'Seitenverhältnis',

    // Timeline & Trimming
    'trim.title': 'Zeitleiste & Schnitt',
    'trim.start': 'Startzeitpunkt',
    'trim.end': 'Endzeitpunkt',
    'trim.selectedDuration': 'Länge des Geschnittenen Clips',
    'trim.setStartCurrent': 'Start auf Abspielposition Setzen',
    'trim.setEndCurrent': 'Ende auf Abspielposition Setzen',
    'trim.reset': 'Bereich Zurücksetzen',
    'trim.hint': 'Verschieben Sie die Schieberegler für diesen Clip.',

    // Audio Tool
    'audio.title': 'Tonspuren & Abmischung',
    'audio.noFile': 'Keine sekundären Tonspuren hinzugefügt',
    'audio.fileSelected': 'Angehängte Audiodatei',
    'audio.remove': 'Tonspur Entfernen',
    'audio.muteOriginal': 'Originalton aller Videos stummschalten',
    'audio.mode': 'Audio-Mischmodus',
    'audio.modeKeep': 'Nur Originalton des Videos behalten',
    'audio.modeReplace': 'Originalton durch neue Tonspuren ersetzen',
    'audio.modeMix': 'Originalton mit neuen Tonspuren mischen',
    'audio.alignLength': 'Ton an Videolänge anpassen',
    'audio.trimStart': 'Startzeitpunkt des Schnitts',
    'audio.trimEnd': 'Endzeitpunkt des Schnitts',
    'audio.trimmedLength': 'Länge der Gekürzten Tonspur',
    'audio.preview': 'Audio Vorhören',
    'audio.pause': 'Audio Pausieren',
    'audio.cutTitle': 'Tonspur Schneiden & Kürzen',

    // Fade Transitions
    'fade.title': 'Ein- & Ausblend-Übergänge (Fade)',
    'fade.in': 'Intro Einblenden (Video & Audio)',
    'fade.out': 'Outro Ausblenden (Video & Audio)',
    'fade.none': 'Keine (0s)',
    'fade.half': '0.5 Sekunden',
    'fade.one': '1.0 Sekunde',
    'fade.two': '2.0 Sekunden',
    'fade.three': '3.0 Sekunden',

    // Export & Engine Status
    'export.button': '1080p Video Exportieren',
    'export.processing': '1080p Video Wird Gerendert...',
    'export.cancel': 'Export Abbrechen',
    'export.readyTitle': '1080p Video Erfolgreich Exportiert!',
    'export.readySubtitle': 'Ihr Multi-Clip Full HD Video wurde lokal in Ihrem Browser erzeugt.',
    'export.download': 'Full HD Video Herunterladen (MP4)',
    'export.editAnother': 'Neues Projekt Starten',
    'export.statusInit': 'WebAssembly-Engine wird initialisiert...',
    'export.statusLoading': 'Medien werden in lokalen Speicher geladen...',
    'export.statusEncoding': 'Multi-Clip 1080p Verarbeitung läuft...',
    'export.statusFinalizing': '1080p Download wird vorbereitet...',
    'export.errorTitle': 'Fehler Bei der Verarbeitung',
    'export.errorSubtitle': 'Bitte prüfen Sie Ihre Mediendateien und versuchen Sie es erneut.',

    // Features Section
    'features.title': 'Entwickelt für Reine Browser-Leistung',
    'features.subtitle': 'Keine Abos, keine Konten und keine Cloud-Uploads.',
    'features.f1.title': '100% Lokal & Privat',
    'features.f1.desc':
      'Videos werden ausschließlich im Browser verarbeitet. Kein einziges Byte gelangt auf externe Server.',
    'features.f2.title': 'Multi-Clip Schnitt & Sequenz',
    'features.f2.desc':
      'Fügen Sie mehrere Videoclips zusammen, schneiden Sie jeden Clip präzise und exportieren Sie in 1080p.',
    'features.f3.title': 'Multi-Track Audio-Abmischung',
    'features.f3.desc':
      'Legen Sie mehrere Musikstücke oder Effekte mit individuellem Startzeitpunkt und Lautstärkeregler an.',
    'features.f4.title': 'Filmreife Fade-Blenden',
    'features.f4.desc':
      'Sanftes Ein- und Ausblenden von Bildhelligkeit und Tonlautstärke mit nur einem Klick.',
    'features.f5.title': 'Ohne Wasserzeichen, Dauerhaft Frei',
    'features.f5.desc':
      'Speichern Sie klare 1080p MP4-Videos ohne störende Logos oder Bezahlschranken.',
    'features.f6.title': 'High-Speed WebAssembly',
    'features.f6.desc':
      'Angetrieben von zu WASM kompiliertem FFmpeg mit Cross-Origin Isolation für nahezu native Geschwindigkeit.',

    // How It Works
    'how.title': 'So Funktioniert BrowserCut',
    'how.subtitle': 'Professioneller Videoschnitt in drei simplen Schritten.',
    'how.step1.num': '01',
    'how.step1.title': 'Medien Öffnen',
    'how.step1.desc': 'Fügen Sie mehrere Videos und Musikstücke hinzu. Sofort im Speicher geladen.',
    'how.step2.num': '02',
    'how.step2.title': 'Ordnen, Schneiden & Mischen',
    'how.step2.desc': 'Sortieren Sie Clips, schneiden Sie präzise und justieren Sie Tonspuren.',
    'how.step3.num': '03',
    'how.step3.title': '1080p Full HD Speichern',
    'how.step3.desc': 'Klicken Sie auf Exportieren und laden Sie Ihr 1080p MP4-Video direkt herunter.',

    // FAQ
    'faq.title': 'Häufig Gestellte Fragen',
    'faq.subtitle': 'Antworten rund um die Videobearbeitung im Webbrowser.',
    'faq.q1': 'Ist BrowserCut wirklich 100% privat?',
    'faq.a1':
      'Ja, uneingeschränkt. BrowserCut führt FFmpeg lokal über WebAssembly in Ihrem Browser aus. Ihre Dateien werden niemals auf fremde Server geladen.',
    'faq.q2': 'Kann ich mehrere Videos und Tonspuren kombinieren?',
    'faq.a2':
      'Ja! Sie können beliebig viele Videoclips und Tonspuren hinzufügen, schneiden, anordnen und als zusammenhängendes 1080p Full HD Video exportieren.',
    'faq.q3': 'Welche Video- und Audioformate werden unterstützt?',
    'faq.a3':
      'Unterstützt werden MP4, WebM, MOV, MKV, AVI sowie MP3, WAV, AAC, OGG und M4A. Die Ausgabe erfolgt als universelles MP4.',
    'faq.q4': 'Kann ich in Full HD 1080p exportieren?',
    'faq.a4':
      'Ja! BrowserCut verfügt über eine vollwertige 1080p Full HD (1920x1080) Render-Engine mit intelligenter Seitenverhältnis-Anpassung.',
    'faq.q5': 'Warum dauert der Export einen Moment?',
    'faq.a5':
      'Videotranskodierung ist rechenintensiv. Da alles auf Ihrer eigenen Hardware berechnet wird, bestimmt Ihr Prozessor die Geschwindigkeit.',

    // Footer
    'footer.desc':
      'Kostenloser, offener Video- und Audio-Editor im Browser mit WebAssembly. Keine Uploads, kein Tracking, volle Privatsphäre.',
    'footer.supportBtn': 'Entwickler auf Buy Me a Coffee unterstützen',
    'footer.github': 'GitHub-Repository',
    'footer.privacy': 'Privatsphäre Garantiert',
    'footer.allRights': 'BrowserCut. Open-Source-Client-Videowerkzeug.',
  },

  fr: {
    // Meta & Header
    'site.title': 'BrowserCut | Éditeur Vidéo & Audio Gratuit dans le Navigateur',
    'site.tagline': 'Éditeur Vidéo & Audio Gratuit et Automatique dans le Navigateur',
    'site.description':
      'Éditez, coupez et ajoutez du son à vos vidéos directement dans votre navigateur. 100% gratuit, sans filigrane, sans téléversement sur serveur. Traitement client ultra-rapide.',
    'nav.features': 'Fonctionnalités',
    'nav.howItWorks': 'Comment Ça Marche',
    'nav.faq': 'FAQ',
    'nav.support': 'Offrir un Café',
    'nav.theme': 'Changer de Thème',
    'nav.language': 'Langue',

    // Hero
    'hero.badge': '100% Côté Client • Zéro Téléversement Serveur',
    'hero.title': 'Éditeur Vidéo & Audio Multi-Clips dans le Navigateur',
    'hero.subtitle':
      'Ajoutez plusieurs clips vidéo, organisez votre timeline, superposez plusieurs pistes audio, découpez avec précision et exportez en 1080p Full HD en local.',

    // Workspace & Dropzone
    'editor.dropTitle': 'Déposez vos vidéos ici ou cliquez pour parcourir',
    'editor.dropSubtitle': 'Ajoutez un ou plusieurs clips vidéo (MP4, WebM, MOV, AVI)',
    'editor.chooseVideo': 'Sélectionner des Fichiers Vidéo',
    'editor.chooseAudio': 'Sélectionner des Fichiers Audio',
    'editor.addVideo': '+ Ajouter un Clip Vidéo',
    'editor.addAudio': '+ Ajouter une Piste Audio',
    'editor.changeVideo': 'Changer de Vidéo',
    'editor.privacyGuaranteed': 'Vos fichiers ne quittent jamais votre ordinateur. 100% privé et sécurisé.',
    'editor.videoClips': 'Séquence des Clips Vidéo',
    'editor.audioTracks': 'Pistes Audio',
    'editor.resolution': 'Résolution d’Exportation',
    'editor.res1080p': '1080p Full HD (1920×1080)',
    'editor.res720p': '720p HD (1280×720)',
    'editor.resOriginal': 'Résolution Source Originale',
    'editor.moveEarlier': 'Déplacer Avant',
    'editor.moveLater': 'Déplacer Après',
    'editor.deleteClip': 'Supprimer le Clip',
    'editor.totalDuration': 'Durée Totale du Projet',
    'editor.audioDelay': 'Début à (secondes)',
    'editor.audioVolume': 'Volume',
    'editor.editingClip': 'Édition du Clip',
    'editor.clipsCount': 'Clips',
    'editor.noClips': 'Aucun clip vidéo ajouté',
    'editor.aspectNotice': 'L’ajustement automatique en 1080p Full HD garantit une harmonie parfaite entre vidéos de formats différents.',

    // Video Player
    'player.play': 'Lecture',
    'player.pause': 'Pause',
    'player.current': 'Position',
    'player.duration': 'Durée',
    'player.mute': 'Couper le Son',
    'player.unmute': 'Activer le Son',
    'player.aspect': 'Format d’Affichage',

    // Timeline & Trimming
    'trim.title': 'Chronologie & Découpage',
    'trim.start': 'Début du Clip',
    'trim.end': 'Fin du Clip',
    'trim.selectedDuration': 'Durée du Clip Découpé',
    'trim.setStartCurrent': 'Définir Début à la Tête de Lecture',
    'trim.setEndCurrent': 'Définir Fin à la Tête de Lecture',
    'trim.reset': 'Réinitialiser la Sélection',
    'trim.hint': 'Ajustez les curseurs pour définir les limites de ce clip.',

    // Audio Tool
    'audio.title': 'Pistes Audio & Mixage',
    'audio.noFile': 'Aucune piste audio secondaire ajoutée',
    'audio.fileSelected': 'Audio Joint',
    'audio.remove': 'Supprimer la Piste Audio',
    'audio.muteOriginal': 'Couper le son d’origine de toutes les vidéos',
    'audio.mode': 'Mode de Mixage Audio',
    'audio.modeKeep': 'Conserver uniquement le son d’origine',
    'audio.modeReplace': 'Remplacer le son d’origine par les nouvelles pistes',
    'audio.modeMix': 'Mixer le son d’origine avec les nouvelles pistes',
    'audio.alignLength': 'Ajuster la durée du son à celle de la vidéo',
    'audio.trimStart': 'Début du Découpage',
    'audio.trimEnd': 'Fin du Découpage',
    'audio.trimmedLength': 'Durée de l’Audio Découpé',
    'audio.preview': 'Écouter l’Audio',
    'audio.pause': 'Mettre en Pause',
    'audio.cutTitle': 'Découper la Piste Audio',

    // Fade Transitions
    'fade.title': 'Transitions en Fondu (Fade In / Out)',
    'fade.in': 'Fondu d’Ouverture Intro (Vidéo & Audio)',
    'fade.out': 'Fondu de Fermeture Outro (Vidéo & Audio)',
    'fade.none': 'Aucun (0s)',
    'fade.half': '0.5 Seconde',
    'fade.one': '1.0 Seconde',
    'fade.two': '2.0 Secondes',
    'fade.three': '3.0 Secondes',

    // Export & Engine Status
    'export.button': 'Exporter la Vidéo en 1080p',
    'export.processing': 'Rendu Vidéo 1080p en Cours...',
    'export.cancel': 'Annuler l’Export',
    'export.readyTitle': 'Vidéo 1080p Exportée avec Succès !',
    'export.readySubtitle': 'Votre vidéo multi-clips en Full HD a été compilée localement dans votre navigateur.',
    'export.download': 'Télécharger la Vidéo Full HD (MP4)',
    'export.editAnother': 'Créer un Nouveau Projet',
    'export.statusInit': 'Initialisation du moteur WebAssembly...',
    'export.statusLoading': 'Chargement des médias dans la mémoire locale...',
    'export.statusEncoding': 'Traitement multi-clips en 1080p...',
    'export.statusFinalizing': 'Préparation du téléchargement 1080p...',
    'export.errorTitle': 'Une Erreur est Survenue Pendant le Traitement',
    'export.errorSubtitle': 'Vérifiez que vos fichiers ne sont pas corrompus et réessayez.',

    // Features Section
    'features.title': 'Conçu pour des Performances Maximales dans le Navigateur',
    'features.subtitle': 'Sans abonnement, sans création de compte et sans envoi dans le cloud.',
    'features.f1.title': '100% Local & Privé',
    'features.f1.desc':
      'Les vidéos sont traitées exclusivement dans votre navigateur. Aucun octet n’est transmis à un serveur tiers.',
    'features.f2.title': 'Séquence Multi-Clips',
    'features.f2.desc':
      'Combinez plusieurs vidéos en un seul projet avec réorganisation, découpe fine et sortie 1080p.',
    'features.f3.title': 'Mixage Audio Multi-Pistes',
    'features.f3.desc':
      'Superposez musiques et effets sonores avec décalage temporel et réglage de volume indépendants.',
    'features.f4.title': 'Fondus Cinématographiques',
    'features.f4.desc':
      'Créez des ouvertures et fermetures douces de la luminosité et du volume en un seul clic.',
    'features.f5.title': 'Sans Filigrane, 100% Gratuit',
    'features.f5.desc':
      'Téléchargez des vidéos MP4 1080p nettes sans logos imposés ni paiements cachés.',
    'features.f6.title': 'WebAssembly Haute Vitesse',
    'features.f6.desc':
      'Alimenté par FFmpeg compilé en WASM avec isolation d’origine pour une vitesse proche du natif.',

    // How It Works
    'how.title': 'Comment Fonctionne BrowserCut',
    'how.subtitle': 'Le montage vidéo accessible en trois étapes simples.',
    'how.step1.num': '01',
    'how.step1.title': 'Importer les Médias',
    'how.step1.desc': 'Ajoutez plusieurs vidéos et audios. Chargés directement sans téléversement.',
    'how.step2.num': '02',
    'how.step2.title': 'Organiser, Couper & Mixer',
    'how.step2.desc': 'Ordonnez vos clips, ajustez les coupes et synchronisez vos pistes audio.',
    'how.step3.num': '03',
    'how.step3.title': 'Exporter en 1080p Full HD',
    'how.step3.desc': 'Cliquez sur Exporter et téléchargez votre fichier MP4 haute définition.',

    // FAQ
    'faq.title': 'Questions Fréquemment Posées',
    'faq.subtitle': 'Tout ce que vous devez savoir sur le montage vidéo dans le navigateur.',
    'faq.q1': 'BrowserCut est-il réellement 100% confidentiel ?',
    'faq.a1':
      'Oui, absolument. BrowserCut exécute FFmpeg localement grâce à WebAssembly. Vos fichiers ne transitent par aucun serveur externe.',
    'faq.q2': 'Puis-je assembler plusieurs vidéos et musiques ?',
    'faq.a2':
      'Oui ! Vous pouvez importer plusieurs clips vidéo, les découper, les agencer, ajouter plusieurs pistes sonores et tout exporter en 1080p Full HD.',
    'faq.q3': 'Quels formats vidéo et audio sont acceptés ?',
    'faq.a3':
      'Formats vidéo acceptés : MP4, WebM, MOV, MKV, AVI ; formats audio : MP3, WAV, AAC, OGG, M4A. L’export se fait en MP4 universel.',
    'faq.q4': 'Puis-je exporter en Full HD 1080p ?',
    'faq.a4':
      'Oui ! BrowserCut intègre un pipeline complet en 1080p Full HD (1920x1080) avec maintien automatique des proportions.',
    'faq.q5': 'Pourquoi l’export prend-il un peu de temps ?',
    'faq.a5':
      'Le réencodage vidéo demande d’importantes ressources de calcul. Le traitement étant effectué sur votre propre appareil, la vitesse dépend de votre processeur.',

    // Footer
    'footer.desc':
      'Éditeur vidéo et audio gratuit dans le navigateur avec WebAssembly. Zéro téléversement, zéro suivi, confidentialité maximale.',
    'footer.supportBtn': 'Soutenir le Développeur sur Buy Me a Coffee',
    'footer.github': 'Dépôt GitHub',
    'footer.privacy': 'Confidentialité Garantie',
    'footer.allRights': 'BrowserCut. Outil vidéo libre et open-source.',
  },

  ja: {
    // Meta & Header
    'site.title': 'BrowserCut | ブラウザ完結の無料動画・音声エディター',
    'site.tagline': 'サーバー送信ゼロ！ブラウザ完結の自動動画・音声エディター',
    'site.description':
      'ブラウザ上で直接動画を編集・トリミングし、音楽を追加できます。完全無料・ウォーターマークなし・サーバー送信ゼロ。WebAssemblyによる高速クライアント処理。',
    'nav.features': '主な機能',
    'nav.howItWorks': '使い方',
    'nav.faq': 'よくある質問',
    'nav.support': '開発者を支援',
    'nav.theme': 'テーマ切替',
    'nav.language': '言語',

    // Hero
    'hero.badge': '100% クライアント処理 • サーバー送信一切なし',
    'hero.title': '複数動画＆音声に対応したブラウザ動画エディター',
    'hero.subtitle':
      '複数の動画クリップの結合・トリミング、複数音声トラックのミキシング、スムーズなフェード効果、そして1080p Full HDでの書き出しをブラウザ完結で実現。',

    // Workspace & Dropzone
    'editor.dropTitle': 'ここに動画をドラッグ＆ドロップ、またはファイルを選択',
    'editor.dropSubtitle': '1つまたは複数の動画クリップを追加（MP4、WebM、MOV、AVI）',
    'editor.chooseVideo': '動画ファイルを選択',
    'editor.chooseAudio': '音声ファイルを選択',
    'editor.addVideo': '+ 動画クリップを追加',
    'editor.addAudio': '+ 音声トラックを追加',
    'editor.changeVideo': '動画を変更',
    'editor.privacyGuaranteed': 'ファイルが外部サーバーへ送信されることはありません。完全なプライバシーと安全性。',
    'editor.videoClips': '動画クリップの並び順',
    'editor.audioTracks': '音声トラック一覧',
    'editor.resolution': '書き出し解像度',
    'editor.res1080p': '1080p Full HD (1920×1080)',
    'editor.res720p': '720p HD (1280×720)',
    'editor.resOriginal': '元の解像度',
    'editor.moveEarlier': '前へ移動',
    'editor.moveLater': '次へ移動',
    'editor.deleteClip': 'クリップを削除',
    'editor.totalDuration': 'プロジェクト総再生時間',
    'editor.audioDelay': '開始タイミング（秒）',
    'editor.audioVolume': '音量',
    'editor.editingClip': '選択中のクリップ',
    'editor.clipsCount': 'クリップ数',
    'editor.noClips': 'まだ動画クリップが追加されていません',
    'editor.aspectNotice': '1080p Full HDへの自動最適化により、異なるアスペクト比の動画も綺麗に結合されます。',

    // Video Player
    'player.play': '再生',
    'player.pause': '一時停止',
    'player.current': '現在位置',
    'player.duration': '総再生時間',
    'player.mute': 'ミュート',
    'player.unmute': 'ミュート解除',
    'player.aspect': 'アスペクト比',

    // Timeline & Trimming
    'trim.title': 'タイムライン＆トリミング',
    'trim.start': '開始時間',
    'trim.end': '終了時間',
    'trim.selectedDuration': 'カット後の動画の長さ',
    'trim.setStartCurrent': '現在の再生位置を開始点にする',
    'trim.setEndCurrent': '現在の再生位置を終了点にする',
    'trim.reset': '範囲をリセット',
    'trim.hint': 'スライダーを動かして、このクリップの正確なカット位置を設定してください。',

    // Audio Tool
    'audio.title': '音声トラック＆ミックス',
    'audio.noFile': '追加の音声トラックはまだありません',
    'audio.fileSelected': '選択された音声',
    'audio.remove': '音声トラックを削除',
    'audio.muteOriginal': '全動画の元の音声を消音（ミュート）',
    'audio.mode': '音声ミキシングモード',
    'audio.modeKeep': '元の動画の音声のみ保持',
    'audio.modeReplace': '元の音声を新しい音声トラックに差し替え',
    'audio.modeMix': '元の音声と新しい音声をミックス（同時再生）',
    'audio.alignLength': '動画の長さに合わせて音声を自動トリミング',
    'audio.trimStart': 'カット開始位置',
    'audio.trimEnd': 'カット終了位置',
    'audio.trimmedLength': 'カット後の音声の長さ',
    'audio.preview': '音声を試聴',
    'audio.pause': '一時停止',
    'audio.cutTitle': '音声トラックのカット・トリミング',

    // Fade Transitions
    'fade.title': 'フェードイン・フェードアウト効果',
    'fade.in': 'イントロ フェードイン（映像と音声）',
    'fade.out': 'アウトロ フェードアウト（映像と音声）',
    'fade.none': 'なし (0秒)',
    'fade.half': '0.5 秒',
    'fade.one': '1.0 秒',
    'fade.two': '2.0 秒',
    'fade.three': '3.0 秒',

    // Export & Engine Status
    'export.button': '1080p 動画を書き出す',
    'export.processing': '1080p 動画をレンダリング中...',
    'export.cancel': '書き出しをキャンセル',
    'export.readyTitle': '1080p 動画の書き出しが完了しました！',
    'export.readySubtitle': 'ブラウザのローカルメモリ上で高品質Full HD動画が生成されました。',
    'export.download': 'Full HD 動画をダウンロード (MP4)',
    'export.editAnother': '新しいプロジェクトを作成',
    'export.statusInit': 'WebAssemblyエンジンを起動中...',
    'export.statusLoading': 'メディアファイルをメモリに読み込み中...',
    'export.statusEncoding': '複数クリップの1080p処理を実行中...',
    'export.statusFinalizing': '1080pファイルを準備中...',
    'export.errorTitle': '動画処理中にエラーが発生しました',
    'export.errorSubtitle': 'ファイルが破損していないか確認し、もう一度お試しください。',

    // Features Section
    'features.title': 'ブラウザ完結型ならではの圧倒的メリット',
    'features.subtitle': '月額料金なし、アカウント登録不要、クラウドへのアップロード待ちも不要。',
    'features.f1.title': '100% ローカル＆高プライバシー',
    'features.f1.desc':
      '動画はお手元のブラウザ内でのみ処理されます。外部サーバーにデータが送信される心配は一切ありません。',
    'features.f2.title': '複数クリップのシーケンス結合',
    'features.f2.desc':
      '複数の動画クリップを追加し、順序の並び替え、クリップごとのトリミング、1080p出力が可能です。',
    'features.f3.title': 'マルチトラック音声ミキシング',
    'features.f3.desc':
      '複数のBGMや効果音を追加し、再生開始タイミングや音量をトラックごとに個別にコントロール。',
    'features.f4.title': '自然なフェードイン・アウト',
    'features.f4.desc':
      'ワンクリックで動画の明暗と音声のボリュームを滑らかにフェードさせ、映画のようなオープニングを演出。',
    'features.f5.title': '透かし（ウォーターマーク）なし・完全無料',
    'features.f5.desc':
      'ロゴの挿入や画質制限は一切ありません。1080pの高画質MP4動画をいつでもそのまま書き出せます。',
    'features.f6.title': '超高速 WebAssembly',
    'features.f6.desc':
      'WASMに最適化されたFFmpegとCross-Origin Isolationにより、ネイティブアプリに迫るパフォーマンスを発揮。',

    // How It Works
    'how.title': 'BrowserCutの使い方',
    'how.subtitle': 'わずか3ステップで本格的な動画編集が完了します。',
    'how.step1.num': '01',
    'how.step1.title': 'メディアを読み込む',
    'how.step1.desc': '複数の動画や音声ファイルを追加。アップロード不要で即座に読み込まれます。',
    'how.step2.num': '02',
    'how.step2.title': '並び替え・カット・音声設定',
    'how.step2.desc': 'クリップの並び替え、個別のカット範囲、音楽の開始タイミングを直感的に設定。',
    'how.step3.num': '03',
    'how.step3.title': '1080p Full HDで書き出し',
    'how.step3.desc': '「1080p 動画を書き出す」をクリック。進行状況を確認し、完成したMP4を保存。',

    // FAQ
    'faq.title': 'よくある質問 (FAQ)',
    'faq.subtitle': 'ブラウザ完結の動画編集について気になる点にお答えします。',
    'faq.q1': '本当に動画が外部に送信されないのですか？',
    'faq.a1':
      'はい、本当です。BrowserCutはWebAssembly（WASM）技術を使用してお使いのPCやスマホのブラウザ上でFFmpegを直接動かしています。動画ファイルがサーバーに送信されることは一切ありません。',
    'faq.q2': '複数の動画や音声トラックを結合・ミックスできますか？',
    'faq.a2':
      'はい！複数の動画クリップを追加して順序を並び替えたり、個別トリミングを行ったり、複数の音声トラックを重ねて1080p Full HD動画として出力できます。',
    'faq.q3': 'どの動画や音声フォーマットに対応していますか？',
    'faq.a3':
      '動画はMP4、WebM、MOV、MKV、AVI、音声はMP3、WAV、AAC、OGG、M4Aに対応しています。書き出しは汎用性の高い1080p MP4形式で行われます。',
    'faq.q4': 'Full HD 1080pで書き出しできますか？',
    'faq.a4':
      'はい！1080p Full HD（1920×1080）の自動スケーリング出力を標準装備しており、縦向き動画や異なる解像度の動画もアスペクト比を維持して綺麗に結合されます。',
    'faq.q5': '動画の書き出しに時間がかかるのはなぜですか？',
    'faq.a5':
      '動画の再エンコードは非常に高い計算処理能力を必要とします。クラウドサーバーではなく、お使いの端末のCPUで直接処理するため、端末のスペックによって所要時間が変わります。',

    // Footer
    'footer.desc':
      'WebAssemblyを活用した完全ブラウザ完結型の無料動画・音声エディター。アップロード不要、トラッキングなし、究極のプライバシー。',
    'footer.supportBtn': 'Buy Me a Coffeeで開発者を支援する',
    'footer.github': 'GitHubリポジトリ',
    'footer.privacy': 'プライバシー保護第一',
    'footer.allRights': 'BrowserCut. オープンソース・クライアントサイド動画ユーティリティ。',
  },
} as const;
