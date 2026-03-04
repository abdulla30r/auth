import { useState } from "react";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About" isActive={activeIndex === 0} onShow={() => setActiveIndex(activeIndex === 0 ? null : 0)}>
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>

      <br />

      <Panel title="Etymology" isActive={activeIndex === 1} onShow={() => setActiveIndex(activeIndex === 1 ? null : 1)}>
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region
        surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for
        the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

const Panel = ({ title, children, isActive, onShow }: { title: string; children?: React.ReactNode; isActive: boolean; onShow: () => void }) => {
  return (
    <section className="border-2 px-2 py-2 w-100">
      <h3>{title}</h3>
      {isActive ? (
        <div>{children}</div>
      ) : (
        <button className=" bg-blue-200 px-2" onClick={onShow}>
          Show more
        </button>
      )}
    </section>
  );
};
