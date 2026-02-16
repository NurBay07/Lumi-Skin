const faqs = [
  {
    q: "Алғашқы консультация тегін бе?",
    a: "Иә, алғашқы консультация мен диагностика тегін.",
  },
  {
    q: "Процедурадан кейін не істеу керек?",
    a: "Aftercare бойынша ұсыныстар беріледі. SPF қолдану міндетті.",
  },
  {
    q: "Қанша сеанс керек?",
    a: "Әр қызметке жеке жоспар. Орташа 3-6 сеанс.",
  },
  {
    q: "Жүктілік кезінде қандай қызметтерге болады?",
    a: "Кей қызметтерге рұқсат жоқ. Міндетті түрде консультация керек.",
  },
  {
    q: "Жазылуды қалай өзгертуге болады?",
    a: "Телефон/WhatsApp арқылы хабарласыңыз.",
  },
  {
    q: "Төлем түрлері қандай?",
    a: "Қолма-қол және картамен төлеу бар.",
  },
];

export default function Faq() {
  return (
    <section className="section-pad">
      <div className="container-pad">
        <p className="uppercase tracking-[0.3em] text-xs text-ink/50">FAQ</p>
        <h1 className="font-display text-3xl md:text-4xl mt-2">
          Жиі қойылатын сұрақтар
        </h1>
        <div className="mt-8 grid gap-4">
          {faqs.map((item) => (
            <div key={item.q} className="card p-5">
              <p className="font-semibold">{item.q}</p>
              <p className="text-ink/60 mt-2">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
