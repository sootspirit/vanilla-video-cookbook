interface LazyLoadedVideoProps {
  videoSelector: string;
  buttonSelector: string;
  placeholderDesktopSelector?: string;
  placeholderMobileSelector?: string;
}

export class LazyLoadedVideo {
  private video: HTMLVideoElement | null = null;
  private btn: HTMLButtonElement | null = null;
  private placeholderDesktop: HTMLElement | null = null;
  private placeholderMobile: HTMLElement | null = null;
  private observer: IntersectionObserver | null = null;

  constructor(options: LazyLoadedVideoProps) {}

  private initElements(options: LazyLoadedVideoProps): void {
    this.video = document.querySelector(options.videoSelector) as HTMLVideoElement;
    this.btn = document.querySelector(options.buttonSelector) as HTMLButtonElement;
    if (options.placeholderDesktopSelector) {
      this.placeholderDesktop = document.querySelector(options.placeholderDesktopSelector);
    }
    if (options.placeholderMobileSelector) {
      this.placeholderMobile = document.querySelector(options.placeholderMobileSelector);
    }
  }
}

function initVideo() {
  // Prevent playing video in DXP editor
  if (window.location.pathname.includes('editor.html')) {
    return;
  }

  const video = document.getElementById('closVideo');
  const btn = document.getElementById('closPlayBtn');
  const videoTexts = document.querySelector('.clos-battery__video-texts');

  if (!video || !btn) {
    return;
  }

  if (!(video instanceof HTMLVideoElement)) {
    return;
  }

  if (!(videoTexts instanceof HTMLElement)) {
    console.log('videoTexts is not an HTMLVideoElement', typeof videoTexts);
    return;
  }

  video.addEventListener('click', () => {
    if (!video.paused) {
      video.pause();
    }
  });

  video.addEventListener('play', () => {
    videoTexts.style.display = 'none';
  });

  video.addEventListener('pause', () => {
    videoTexts.style.display = 'block';
  });

  btn.addEventListener('click', () => {
    video.play();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          video.pause();
        }
      });
    },
    { threshold: 0.25 },
  );

  observer.observe(video);
}
