import type { ReactNode } from "react";

const motifs: Record<string, ReactNode> = {
  kremlin: (
    <>
      <path d="M36 112V87h8v5h9v-5h8v11h38V85h8v5h9v-5h8v27Z" />
      <path d="M60 101V75h40v26ZM65 76V64h30v12ZM70 64c0-8 10-9 10-18 0 9 10 10 10 18Z" />
      <path
        className="seal-paper"
        d="M75 112V96a5 5 0 0 1 10 0v16ZM47 103v-6h3v6ZM112 103v-6h3v6Z"
      />
      <path className="seal-line" d="M80 42v9m-4-6h8" />
    </>
  ),
  hotel: (
    <>
      <path d="M43 84 80 60l37 24h-8v27H51V84Z" />
      <path
        className="seal-paper"
        d="M60 88h9v10h-9zm31 0h9v10h-9zm-16 23V93a5 5 0 0 1 10 0v18Z"
      />
      <path className="seal-gold" d="M49 105h62v4H49Z" />
      <path className="seal-paper" d="m73 78 7-5 7 5-7 4Z" />
      <path className="seal-line" d="M42 113h76m-64 5h52" />
    </>
  ),
  palace: (
    <>
      <path d="M41 82 80 60l39 22Zm5 4h68v5H46Zm4 7h8v15h-8zm17 0h8v15h-8zm18 0h8v15h-8zm17 0h8v15h-8zm-59 17h74v6H43Z" />
      <circle className="seal-paper" cx="80" cy="74" r="3" />
      <path className="seal-gold" d="M37 118h86v3H37Z" />
    </>
  ),
  dinner: (
    <>
      <ellipse cx="79" cy="109" rx="35" ry="6" />
      <path d="M50 84h45c1 16-8 24-22 24-14 0-22-10-23-24Z" />
      <path className="seal-line" strokeWidth="4" d="M94 88c17-9 19 12-3 12" />
      <path
        className="seal-line"
        d="M69 79c-10-9 8-10 5-19m5 19c-3-6 10-8 9-16"
      />
      <ellipse className="seal-gold" cx="73" cy="84" rx="20" ry="3" />
    </>
  ),
  carving: (
    <>
      <path d="M47 100c17 0 48-8 67-21-4 22-23 39-49 37-10-1-16-6-18-16Z" />
      <path
        className="seal-line seal-light"
        d="M55 106c20 5 38-5 52-20m-38 20c-4-5 4-7 6-3m7-2c-3-4 3-7 6-4"
      />
      <path d="m45 74 5-8a4 4 0 0 1 6-1L77 81l-7 8-25-10a3 3 0 0 1 0-5Z" />
      <path className="seal-gold" d="m73 88 3-5 17 12-10-2Z" />
    </>
  ),
  printing: (
    <>
      <path d="M49 110V72h61v38h-7V79H56v31Zm-6 1h72v6H43Zm34-50h6v30h-6Zm-9 27h24v5H68Z" />
      <path className="seal-line" strokeWidth="4" d="M66 65h28" />
      <path className="seal-paper" d="M67 96h28l-7 18H61Z" />
      <path className="seal-ochre-line" d="M71 101h16m-18 5h16" />
    </>
  ),
  sounds: (
    <>
      <path d="M63 94c-17-1-20 20-6 24 9 3 21-5 22-14 1-5-1-7 2-10l19-22-5-6-21 20c-4 4-6 2-11 8Z" />
      <path
        className="seal-line"
        d="m95 68 4-6 5 5-5 6m10 11c6 4 6 12 0 16m7-21c9 7 9 19 0 26"
      />
      <circle className="seal-paper" cx="66" cy="103" r="4" />
      <path className="seal-ochre-line" d="m54 112 10-10 30-30" />
    </>
  ),
  theatre: (
    <>
      <path d="M40 72h80v7H40Zm7 8h32c-4 12-11 19-20 23l6 13H47Zm66 0H81c4 12 11 19 20 23l-6 13h18Zm-69 37h72v5H44Z" />
      <path
        className="seal-ochre-line"
        d="M56 84v12m9-12-2 7m41-7v12m-9-12 2 7"
      />
      <path className="seal-gold" d="m80 91 2 7 7 2-7 2-2 7-2-7-7-2 7-2Z" />
    </>
  ),
  books: (
    <>
      <path d="M41 80c16-4 28 1 39 8 11-7 23-12 39-8v32c-18-3-30 2-39 9-9-7-21-12-39-9Z" />
      <path
        className="seal-paper"
        d="M46 84c11-2 22 2 32 7v24c-12-7-22-10-32-8Zm68 0c-11-2-22 2-32 7v24c12-7 22-10 32-8Z"
      />
      <path
        className="seal-ochre-line"
        d="M51 91c7 0 15 2 21 6m-21 0c7 0 15 2 21 6m37-12c-7 0-15 2-21 6m21 0c-7 0-15 2-21 6"
      />
    </>
  ),
  alemasova: (
    <>
      <path d="m36 114 37-50 21 26 9-12 22 36H36Z" />
      <path className="seal-paper" d="m59 83 14-19 15 19-8-3-7 5-6-5Z" />
      <path
        className="seal-ochre-line"
        d="M101 94c-13 4-34 6-32 11 1 3 13 4 18 9"
      />
    </>
  ),
  "ershov-grave": (
    <>
      <path d="M49 111h62v6H49Zm9-5h44v5H58Zm8 0V73a14 14 0 0 1 28 0v33Z" />
      <path className="seal-ochre-line" d="M74 78h12m-12 7h12m-12 7h8" />
    </>
  ),
};

export function PlaceEmblem({ id }: { id: string }) {
  const arc = `place-emblem-arc-${id}`;

  return (
    <svg className="place-emblem" viewBox="0 0 160 160" aria-hidden="true">
      <circle className="seal-paper" cx="80" cy="80" r="75" />
      <circle
        className="seal-line"
        cx="80"
        cy="80"
        r="74.5"
        strokeWidth="2.5"
      />
      <circle className="seal-line" cx="80" cy="80" r="70" />
      <defs>
        <path id={arc} d="M18 79a62 62 0 0 1 124 0" />
      </defs>
      <text>
        <textPath href={`#${arc}`} startOffset="50%" textAnchor="middle">
          ТОБОЛЬСК ГЛАЗАМИ ЕРШОВА
        </textPath>
      </text>
      <circle className="seal-gold" cx="106" cy="59" r="13" />
      <path
        className="seal-blue"
        d="M28 88c21-4 22-13 40-10 10 2 22 2 29-3 13-9 24-6 36 0-17-3-23 4-35 9-12 5-20 3-30 0-11-3-25 5-40 4Z"
      />
      {motifs[id]}
      <path
        className="seal-gold"
        d="m80 127 2 4 4 2-4 2-2 4-2-4-4-2 4-2Zm-47-27 1.5 3.5L38 105l-3.5 1.5L33 110l-1.5-3.5L28 105l3.5-1.5Zm94 0 1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5Z"
      />
    </svg>
  );
}
