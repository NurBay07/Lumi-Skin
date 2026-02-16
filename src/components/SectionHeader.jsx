export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p className="uppercase tracking-[0.3em] text-xs text-ink/50">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl mt-2">{title}</h2>
      {subtitle && <p className="text-ink/60 mt-3 max-w-2xl">{subtitle}</p>}
    </div>
  );
}
