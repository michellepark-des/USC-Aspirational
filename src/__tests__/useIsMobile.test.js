// @spec RESP-UI-001, RESP-UI-002
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '../hooks/useIsMobile';

function setWidth(w) {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: w });
}

describe('useIsMobile', () => {
  afterEach(() => setWidth(1024));

  // @spec RESP-UI-001
  it('returns false when viewport is wider than 768px', () => {
    setWidth(1024);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  // @spec RESP-UI-001
  it('returns true when viewport is less than 768px', () => {
    setWidth(375);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  // @spec RESP-UI-001
  it('returns false when viewport is exactly 768px', () => {
    setWidth(768);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  // @spec RESP-UI-001
  it('returns true at minimum supported viewport of 360px', () => {
    setWidth(360);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  // @spec RESP-UI-002
  it('updates to true when viewport shrinks below 768px', () => {
    setWidth(1024);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      setWidth(375);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(true);
  });

  // @spec RESP-UI-002
  it('updates to false when viewport grows to 768px or wider', () => {
    setWidth(375);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);

    act(() => {
      setWidth(1024);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(false);
  });

  // @spec RESP-UI-002
  it('cleans up the resize listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useIsMobile());
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
