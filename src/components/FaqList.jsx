export default function FaqList({ faqs }) {
  if (!faqs?.length) return null;
  return (
    <div className="grid gap-4">
      {faqs.map((faq) => (
        <div key={faq.q} className="card p-5">
          <p className="font-semibold">{faq.q}</p>
          <p className="text-ink/60 mt-2">{faq.a}</p>
        </div>
      ))}
    </div>
  );
}
