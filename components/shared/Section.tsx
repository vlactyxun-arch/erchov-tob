import { Reveal } from "./Reveal";
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={id + "-title"} className="section">
      <div className="wrap">
        <Reveal>
          <h2 id={id + "-title"}>{title}</h2>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
