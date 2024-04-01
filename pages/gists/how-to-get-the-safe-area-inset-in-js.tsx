// TODO

// :root {
//   --safe-area-inset-top: env(safe-area-inset-top);
//   --safe-area-inset-right: env(safe-area-inset-right);
//   --safe-area-inset-bottom: env(safe-area-inset-bottom);
//   --safe-area-inset-left: env(safe-area-inset-left);
// }

// import useViewportSize from './useViewportSize'

// const getRootVariablePixels = (name: string) =>
//   Number(
//     getComputedStyle(document.documentElement)
//       .getPropertyValue(name)
//       .replace(/px$/, ''),
//   )

// export const useSafeAreaInsets = () => {
//   const topInset = getRootVariablePixels('--safe-area-inset-top') || 0
//   const rightInset = getRootVariablePixels('--safe-area-inset-right') || 0
//   const bottomInset = getRootVariablePixels('--safe-area-inset-bottom') || 0
//   const leftInset = getRootVariablePixels('--safe-area-inset-left') || 0

//   return {
//     topInset,
//     rightInset,
//     bottomInset,
//     leftInset,
//   }
// }

// const useSafeAreaSize = () => {
//   const [width, height] = useViewportSize()
//   const { topInset, rightInset, bottomInset, leftInset } = useSafeAreaInsets()

//   return [width - leftInset - rightInset, height - topInset - bottomInset]
// }

// export default useSafeAreaSize

export {}
