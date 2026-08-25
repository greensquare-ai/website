import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { track } from '@vercel/analytics';
import { attributionAnalyticsProperties, readAttribution } from '../../lib/acquisitionAttribution';

type DemoPlaybackOptions = {
  demoId: string;
  lastStep: number;
  intervalMs?: number;
  autoplay?: boolean;
};

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useDemoPlayback({
  demoId,
  lastStep,
  intervalMs = 1650,
  autoplay = true,
}: DemoPlaybackOptions) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewedRef = useRef(false);
  const completedRef = useRef(false);
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => false);
  const visibleStep = reducedMotion ? lastStep : step;
  const visiblyPlaying = isPlaying && !reducedMotion && step < lastStep;

  const record = useCallback((event: string, properties: Record<string, string | number | boolean> = {}) => {
    const attribution = readAttribution();
    track(event, {
      ...attributionAnalyticsProperties(attribution),
      demo_id: demoId,
      ...properties,
    });
  }, [demoId]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof window === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry?.isIntersecting || viewedRef.current) return;
      viewedRef.current = true;
      record('Product Demo Viewed');
      if (autoplay && !getReducedMotionSnapshot()) setIsPlaying(true);
    }, { threshold: 0.45 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [autoplay, record]);

  useEffect(() => {
    if (!visiblyPlaying) return;
    const timer = window.setTimeout(() => setStep((current) => Math.min(current + 1, lastStep)), intervalMs);
    return () => window.clearTimeout(timer);
  }, [intervalMs, lastStep, visiblyPlaying, step]);

  useEffect(() => {
    if (!isPlaying || step < lastStep || completedRef.current) return;
    completedRef.current = true;
    record('Product Demo Completed');
  }, [isPlaying, lastStep, record, step]);

  const replay = useCallback(() => {
    completedRef.current = false;
    setStep(0);
    setIsPlaying(true);
    record('Product Demo Interaction', { action: 'replay' });
  }, [record]);

  const goToStep = useCallback((nextStep: number, action = 'step_select') => {
    const boundedStep = Math.max(0, Math.min(nextStep, lastStep));
    setStep(boundedStep);
    setIsPlaying(false);
    record('Product Demo Interaction', { action, step: boundedStep });
  }, [lastStep, record]);

  return {
    rootRef,
    step: visibleStep,
    isPlaying: visiblyPlaying,
    replay,
    goToStep,
    recordInteraction: (action: string, properties: Record<string, string | number | boolean> = {}) =>
      record('Product Demo Interaction', { action, ...properties }),
  };
}
