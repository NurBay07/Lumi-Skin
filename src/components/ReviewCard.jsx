export default function ReviewCard({ review }) {
  return (
    <div className="card p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{review.name}</p>
        <p className="text-sm text-ink/60">{review.rating}★</p>
      </div>
      <p className="text-ink/60">{review.text}</p>
    </div>
  );
}
