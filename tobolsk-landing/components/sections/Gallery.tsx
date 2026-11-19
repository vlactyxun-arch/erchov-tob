"use client";

import Image from "next/image";
import { publicPath } from "@/lib/public-path";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { galleryPhotos } from "@/content/photos";

const columns = [
  [0, 2, 4],
  [7, 3],
  [6, 1, 5],
] as const;
const browseOrder = columns.flat();

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
      <div className="wrap">
        <h2 id="gallery-title">Галерея поездки</h2>
        <p>Фотографии с пробного выезда по маршруту.</p>
      </div>
      <div className="gallery-mosaic">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="gallery-column">
            {column.map((index) => {
              const item = galleryPhotos[index];
              return (
                <Button
                  key={item.src}
                  className="gallery-preview"
                  aria-label={"Открыть фото. " + item.caption}
                  onPress={() => {
                    setActive(browseOrder.indexOf(index));
                    setOpen(true);
                  }}
                >
                  <Image
                    src={publicPath(item.src)}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 520px) 95vw, (max-width: 900px) 48vw, 33vw"
                  />
                  <span className="gallery-tile-caption">{item.caption}</span>
                </Button>
              );
            })}
          </div>
        ))}
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
