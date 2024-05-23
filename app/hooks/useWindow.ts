function useWindow() {
  let win: Window | undefined = undefined;
  if (!(typeof window === 'undefined')) {
    win = window;
  }

  return win;
}

export default useWindow;
