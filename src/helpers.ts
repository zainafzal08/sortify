import { useLayoutEffect } from "haunted";
import { CSSResult } from "lit";
import { supportsAdoptingStyleSheets } from "lit";
import { AlbumImage } from "./data/shared_types";
import { normal } from "color-blend";

declare global {
  interface Window {
    ShadyCSS: any;
    adoptedStyleSheets: any;
  }
  interface ShadowRoot {
    adoptedStyleSheets: CSSStyleSheet[];
  }
}

/**
 * Allows a haunted lit componentent to specify css styles.
 * Taken from https://whoisryosuke.com/blog/2020/adding-constructable-stylesheets-to-hauntedjs/
 */
export function useConstructableStylesheets(
  el: HTMLElement,
  styles: CSSResult[]
) {
  /**
   * Applies styling to the element shadowRoot using the [[`styles`]]
   * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
   * available and will fallback otherwise. When Shadow DOM is polyfilled,
   * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
   * is available but `adoptedStyleSheets` is not, styles are appended to the
   * end of the `shadowRoot` to [mimic spec
   * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   */
  const adoptStyles = (el: HTMLElement) => {
    if (styles.length === 0) {
      return;
    }
    // There are three separate cases here based on Shadow DOM support.
    // (1) shadowRoot polyfilled: use ShadyCSS
    // (2) shadowRoot.adoptedStyleSheets available: use it
    // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
    // rendering
    if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(
        styles.map((s) => s.cssText),
        el.localName
      );
    } else if (supportsAdoptingStyleSheets) {
      el.shadowRoot.adoptedStyleSheets = styles.map((s) =>
        s instanceof CSSStyleSheet ? s : s.styleSheet
      );
    } else {
      styles.forEach((s) => {
        const style = document.createElement("style");
        style.textContent = s.cssText;
        el.shadowRoot.appendChild(style);
      });
    }
  };
  useLayoutEffect(() => {
    adoptStyles(el);
  }, [styles]);
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * Credit: https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 */
export function HSLToRGB(h: number, s: number, l: number) {
  h = h / 360;
  s = s / 100;
  l = l / 100;
  var r: number, g: number, b: number;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// https://css-tricks.com/converting-color-spaces-in-javascript/
export function RGBToHSL(r: number, g: number, b: number) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
}

export async function extractColorsFromImage(
  image: AlbumImage,
  processingCanvas: HTMLCanvasElement
) {
  // Get image.
  const img = new Image(image.width, image.height);
  img.src = image.url;
  img.crossOrigin = "Anonymous";
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  // Render to Canvas.
  processingCanvas.width = img.naturalWidth;
  processingCanvas.height = img.naturalHeight;
  const ctx = processingCanvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  // Get image data.
  const pixels = ctx.getImageData(0, 0, image.width, image.height);
  const totalPixels = pixels.width * pixels.height;
  const cumulativeValue = {
    r: 0,
    g: 0,
    b: 0,
  };
  const { data } = pixels;
  for (let i = 0; i < totalPixels; i++) {
    cumulativeValue.r += data[i * 4];
    cumulativeValue.g += data[i * 4 + 1];
    cumulativeValue.b += data[i * 4 + 2];
  }
  const avgColor = {
    r: Math.floor(cumulativeValue.r / totalPixels),
    g: Math.floor(cumulativeValue.g / totalPixels),
    b: Math.floor(cumulativeValue.b / totalPixels),
  };
  let albumColorHsl = RGBToHSL(avgColor.r, avgColor.g, avgColor.b);
  let bgColor;

  if (albumColorHsl.l < 20) {
    // Album color is dark, swap bg and album so we always have a dark
    // background.
    bgColor = { ...albumColorHsl };
    albumColorHsl.l = 85;
  } else {
    bgColor = {
      ...albumColorHsl,
      l: 10,
    };
  }
  const albumColorRGB = HSLToRGB(
    albumColorHsl.h,
    albumColorHsl.s,
    albumColorHsl.l
  );
  const surfaceColor = normal(
    { ...albumColorRGB, a: 1 },
    { r: 0, g: 0, b: 0, a: 0.4 }
  );

  return {
    album: `hsl(${albumColorHsl.h}, ${albumColorHsl.s}%, ${albumColorHsl.l}%)`,
    surface: `rgb(${surfaceColor.r}, ${surfaceColor.g}, ${surfaceColor.b})`,
    bg: `hsl(${bgColor.h}, ${bgColor.s}%, ${bgColor.l}%)`,
  };
}
