import { useCallback, useEffect, useRef, useState } from 'react';
import { track } from '@vercel/analytics';
import { attributionAnalyticsProperties, readAttribution } from '../../lib/acquisitionAttribution';

type DemoPlaybackOptions = {
  demoId: string;
  lastStep: number;
  intervalMs?: number;
  autoplay?: boolean;
};

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

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setStep(lastStep);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry?.isIntersecting || viewedRef.current) return;
      viewedRef.current = true;
      record('Product Demo Viewed');
      if (autoplay) setIsPlaying(true);
    }, { threshold: 0.45 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [autoplay, lastStep, record]);

  useEffect(() => {
    if (!isPlaying) return;
    if (step >= lastStep) {
      setIsPlaying(false);
      if (!completedRef.current) {
        completedRef.current = true;
        record('Product Demo Completed');
      }
      return;
    }

    const timer = window.setTimeout(() => setStep((current) => Math.min(current + 1, lastStep)), intervalMs);
    return () => window.clearTimeout(timer);
  }, [intervalMs, isPlaying, lastStep, record, step]);

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
    step,
    isPlaying,
    replay,
    goToStep,
    recordInteraction: (action: string, properties: Record<string, string | number | boolean> = {}) =>
      record('Product Demo Interaction', { action, ...properties }),
  };
}
