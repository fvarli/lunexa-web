import Image, { type StaticImageData } from "next/image";

export type GalleryImage = {
  src: StaticImageData;
  alt: string;
};

/**
 * Horizontal screenshot strip. Scroll-snapping is CSS-only — no carousel
 * library, no autoplay, no pagination dots that stop working without JS. On a
 * phone it is a native swipe; on desktop the frames simply sit side by side.
 *
 * The first frame is eager: it is the only one visible without scrolling on a
 * narrow screen, so lazy-loading it would leave a hole under the hero.
 */
export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  return (
    <ul className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:mx-0 sm:gap-6 sm:px-0">
      {images.map((image, i) => (
        <li key={i} className="w-56 shrink-0 snap-start sm:w-64">
          <Image
            src={image.src}
            alt={image.alt}
            sizes="(min-width: 640px) 16rem, 14rem"
            priority={i === 0}
            className="h-auto w-full rounded-2xl border border-border"
          />
        </li>
      ))}
    </ul>
  );
}
