interface VideoHeaderOptions {
  videoSelector: string;
  buttonSelector: string;
  playIconSelector: string;
  pauseIconSelector: string;
}

export class AutoplayVideoHeader {
  private video: HTMLVideoElement | null = null;
  private btn: HTMLButtonElement | null = null;
  private playIcon: HTMLElement | null = null;
  private pauseIcon: HTMLElement | null = null;
  
  private userPaused = false;
  private observer: IntersectionObserver | null = null;

  constructor(options: VideoHeaderOptions) {
    // 1. Prevent running in editor environment
    if (this.isEditorEnv()) return;

    // 2. Initialize elements
    this.initElements(options);
    if (!this.isValid()) return;

    // 3. Start behavior
    this.initEvents();
    this.initObserver();
  }

  private isEditorEnv(): boolean {
    return window.location.pathname.includes('editor.html');
  }

  private initElements(options: VideoHeaderOptions): void {
    this.video = document.querySelector(options.videoSelector) as HTMLVideoElement;
    this.btn = document.querySelector(options.buttonSelector) as HTMLButtonElement;
    this.playIcon = document.querySelector(options.playIconSelector);
    this.pauseIcon = document.querySelector(options.pauseIconSelector);
  }

  private isValid(): boolean {
    return !!(this.video && this.video instanceof HTMLVideoElement && this.btn && this.playIcon && this.pauseIcon);
  }

  private initEvents(): void {
    // Use arrow function to preserve 'this' context
    this.btn?.addEventListener('click', this.togglePlayback);
  }

  private initObserver(): void {
    if (!this.video) return;

    this.observer = new IntersectionObserver(this.handleIntersection, { threshold: 0.25 });
    this.observer.observe(this.video);
  }

  // Arrow functions automatically bind 'this', safe for event listeners
  private togglePlayback = (): void => {
    if (!this.video) return;
    
    this.userPaused = !this.video.paused;
    this.userPaused ? this.video.pause() : this.video.play().catch(console.error);
    this.updateUI();
  };

  private handleIntersection = (entries: IntersectionObserverEntry[]): void => {
    if (!this.video) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    entries.forEach((entry) => {
      if (entry.isIntersecting && !this.userPaused && !motionQuery.matches) {
        this.video?.play().catch(console.error);
      } else {
        this.video?.pause();
      }
      this.updateUI();
    });
  };

  private updateUI(): void {
    if (!this.video) return;
    
    this.playIcon?.classList.toggle('hidden', !this.video.paused);
    this.pauseIcon?.classList.toggle('hidden', this.video.paused);
  }

  /**
   * Call this if the component gets removed from the DOM to avoid memory leaks
   */
  public destroy(): void {
    this.btn?.removeEventListener('click', this.togglePlayback);
    if (this.observer && this.video) {
      this.observer.unobserve(this.video);
      this.observer.disconnect();
    }
  }
}