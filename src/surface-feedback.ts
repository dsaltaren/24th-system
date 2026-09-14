import { motionTimings } from './motion-presets';

/** The caller resolves the destination; this controller only acknowledges its surface. */
export function createSurfaceFeedback() {
  const motions = new Map<HTMLElement, Animation>();
  const play = (surface: HTMLElement) => {
    motions.get(surface)?.cancel();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const background = getComputedStyle(surface).backgroundColor;
    const animation = surface.animate(reduced ? [
      { backgroundColor: background },
      { backgroundColor: '#f0f0f0', offset: .4 },
      { backgroundColor: background },
    ] : [
      { translate: '0 0' },
      { translate: '2px 0', offset: .4 },
      { translate: '0 0' },
    ], { duration: motionTimings.feedback.acknowledge.duration, easing: motionTimings.feedback.acknowledge.easing });
    animation.id = 'selection-feedback';
    motions.set(surface, animation);
    const release = () => { if (motions.get(surface) === animation) motions.delete(surface); };
    animation.onfinish = release;
    animation.oncancel = release;
    return animation;
  };
  const stop = () => { motions.forEach(motion => motion.cancel()); motions.clear(); };
  return { play, stop };
}
