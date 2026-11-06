'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Drives a looping marquee track (two identical sets side by side) from script, so it can
 * drift on its own and also be dragged with a mouse, swiped on touch or pushed with a
 * trackpad. A fling keeps its momentum and then eases back into the drift; hovering with a
 * mouse (or focusing a link inside) glides it to a stop. Under reduced motion nothing runs
 * and the CSS fallback (a plain scrollable row) applies.
 *
 * `direction` is -1 for leftwards, 1 for rightwards; `duration` is the seconds one set
 * takes to pass, as with the old CSS animation.
 */
export function useMarquee(viewportRef: RefObject<HTMLElement | null>, trackRef: RefObject<HTMLElement | null>, direction: -1 | 1, duration: number) {
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let half = track.scrollWidth / 2;
    // Take over from the CSS animation where it is, so the row does not jump.
    let x = new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;
    viewport.classList.add('is-live');
    let v = 0; // px per second
    let held = false; // hovered or focused: glide to a stop
    let visible = true;
    let raf = 0;
    let last = performance.now();

    // Dragging state
    let pointerId: number | null = null;
    let startX = 0;
    let lastX = 0;
    let lastT = 0;
    let dragV = 0;
    let dragging = false;
    let suppressClick = false;
    const THRESHOLD = 6;

    const auto = () => (direction * half) / duration;
    const wrap = () => {
      if (half <= 0) return;
      x = ((x % half) - half) % half; // keep x in (-half, 0]
    };
    const paint = () => {
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!dragging) {
        const target = held ? 0 : auto();
        // Ease the speed toward its target: momentum after a fling, a soft stop on hover.
        v += (target - v) * (1 - Math.exp(-dt * (held ? 4 : 1.6)));
        x += v * dt;
        wrap();
        paint();
      }
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    v = auto();
    wrap();
    paint();
    start();

    const onResize = () => {
      const ratio = half ? x / half : 0;
      half = track.scrollWidth / 2;
      x = ratio * half;
      wrap();
      paint();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(track);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(viewport);

    /* ---------- pointer: drag and swipe ---------- */
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      pointerId = e.pointerId;
      startX = lastX = e.clientX;
      lastT = performance.now();
      dragV = 0;
      dragging = false;
      suppressClick = false;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      const dx = e.clientX - lastX;
      if (!dragging) {
        if (Math.abs(e.clientX - startX) < THRESHOLD) return;
        dragging = true;
        suppressClick = true;
        viewport.setPointerCapture(e.pointerId);
        viewport.classList.add('is-dragging');
      }
      const now = performance.now();
      const dtm = Math.max(1, now - lastT);
      // Smoothed release speed (px/s) from the last few moves.
      dragV = dragV * 0.6 + ((dx / dtm) * 1000) * 0.4;
      lastX = e.clientX;
      lastT = now;
      x += dx;
      wrap();
      paint();
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      if (dragging) {
        dragging = false;
        viewport.classList.remove('is-dragging');
        // A pause before letting go means no fling.
        v = performance.now() - lastT > 80 ? 0 : Math.max(-4000, Math.min(4000, dragV));
        last = performance.now();
      }
    };
    // A drag ends without following the link under the pointer.
    const onClick = (e: MouseEvent) => {
      if (suppressClick) {
        e.preventDefault();
        e.stopPropagation();
        suppressClick = false;
      }
    };
    const onDragStart = (e: DragEvent) => e.preventDefault();

    /* ---------- trackpad: sideways scrolling moves the row ---------- */
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      x -= e.deltaX;
      v = 0;
      wrap();
      paint();
    };

    /* ---------- hover and focus pause ---------- */
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') held = true;
    };
    // Only keyboard focus holds the row; a mouse press also focuses the link, and that should
    // not keep the row stopped once the pointer leaves.
    const keyboardFocus = () => {
      const el = document.activeElement;
      return !!el && viewport.contains(el) && el.matches(':focus-visible');
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') held = keyboardFocus();
    };
    const onFocusIn = (e: FocusEvent) => {
      if ((e.target as Element).matches(':focus-visible')) held = true;
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!viewport.contains(e.relatedTarget as Node | null)) held = viewport.matches(':hover');
    };

    viewport.addEventListener('pointerdown', onDown);
    viewport.addEventListener('pointermove', onMove);
    viewport.addEventListener('pointerup', onUp);
    viewport.addEventListener('pointercancel', onUp);
    viewport.addEventListener('click', onClick, true);
    viewport.addEventListener('dragstart', onDragStart);
    viewport.addEventListener('wheel', onWheel, { passive: false });
    viewport.addEventListener('pointerenter', onEnter);
    viewport.addEventListener('pointerleave', onLeave);
    viewport.addEventListener('focusin', onFocusIn);
    viewport.addEventListener('focusout', onFocusOut);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      viewport.removeEventListener('pointerdown', onDown);
      viewport.removeEventListener('pointermove', onMove);
      viewport.removeEventListener('pointerup', onUp);
      viewport.removeEventListener('pointercancel', onUp);
      viewport.removeEventListener('click', onClick, true);
      viewport.removeEventListener('dragstart', onDragStart);
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('pointerenter', onEnter);
      viewport.removeEventListener('pointerleave', onLeave);
      viewport.removeEventListener('focusin', onFocusIn);
      viewport.removeEventListener('focusout', onFocusOut);
      viewport.classList.remove('is-live', 'is-dragging');
      track.style.transform = '';
    };
  }, [viewportRef, trackRef, direction, duration]);
}
