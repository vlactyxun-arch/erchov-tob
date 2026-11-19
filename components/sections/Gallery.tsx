"use client";

import Image from "next/image";
import { publicPath } from "@/lib/public-path";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { galleryPhotos } from "@/content/photos";

const browseOrder = [0, 2, 7, 4, 1, 3, 6, 5] as const;
const photoPlaces = [
  "Тобольск",
  "Дворец наместника",
  "Музей печати",
  "Тобольск",
  "Косторезная мастерская",
  "Музей забытых звуков",
  "Абалак",
  "Абалак",
];

export function Gallery() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = galleryPhotos[browseOrder[active]];

  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
  }, [open]);

  const move = (step: number) => {
    setActive(
      (index) => (index + step + browseOrder.length) % browseOrder.length,
    );
  };

  return (
    <section
      id="gallery"
      className="section gallery-section"
      aria-labelledby="gallery-title"
    >
      <div className="wrap gallery-editorial-heading">
        <h2 id="gallery-title">Галерея поездки</h2>
      </div>
      <div className="wrap gallery-mosaic">
        {browseOrder.map((index, position) => {
          const item = galleryPhotos[index];
          return (
            <Button
              key={item.src}
              className="gallery-preview"
              aria-label={`Открыть фото. ${photoPlaces[index]}. ${item.caption}`}
              onPress={() => {
                setActive(position);
                setOpen(true);
              }}
            >
              <Image
                src={publicPath(item.src)}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 720px) 95vw, 48vw"
              />
              <span className="gallery-tile-caption" aria-hidden="true">
                <span>{photoPlaces[index]}</span>
                <strong>{item.caption}</strong>
              </span>
            </Button>
          );
        })}
      </div>
      <dialog
        ref={dialog}
        className="gallery-dialog"
        data-lenis-prevent
        aria-label="Фотографии поездки"
        onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        {open && (
          <div className="gallery-viewer">
            <figure className="gallery-viewer-photo">
              <div className="gallery-stage">
                <Image
                  src={publicPath(photo.src)}
                  alt={photo.alt}
                  fill
                  unoptimized
                  sizes="100vw"
                  loading="eager"
                />
              </div>
              <figcaption className="gallery-caption" aria-live="polite">
                {photo.caption} · {active + 1} из {galleryPhotos.length}
              </figcaption>
            </figure>
            <div className="gallery-actions">
              <Button className="button-outline" onPress={() => move(-1)}>
                <span aria-hidden="true">←</span> Назад
              </Button>
              <Button className="button-outline" onPress={() => move(1)}>
                Дальше <span aria-hidden="true">→</span>
              </Button>
              <Button onPress={() => dialog.current?.close()}>Закрыть</Button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
