import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import ReviewCard from "../components/ReviewCard.jsx";
import { api } from "../lib/api.js";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/reviews").then((res) => setReviews(res.data));
  }, []);

  return (
    <section id="reviews" className="section-pad">
      <div className="container-pad">
        <SectionHeader
          eyebrow="Пікірлер"
          title="Клиенттер не дейді?"
          subtitle="Әр пікір біз үшін маңызды және қызмет сапасын жақсартуға көмектеседі."
        />
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="min-w-[260px] sm:min-w-[320px] snap-start"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
