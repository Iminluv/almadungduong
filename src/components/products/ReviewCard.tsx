import { Review } from "@/lib/data";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="py-8 border-b border-surface last:border-0">
      <div className="flex flex-col gap-4">
        {/* Header: Rating & Date */}
        <div className="flex items-center justify-between">
          <div className="flex text-text text-xs tracking-wider">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </div>
          <span className="text-[12px] text-muted uppercase tracking-widest font-medium">
            {review.date}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-text">{review.userName}</span>
            {review.isVerifiedPurchase && (
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-accent uppercase tracking-[0.1em] bg-accent/5 px-2 py-0.5 rounded-full border border-accent/10">
                <span className="text-[12px] leading-none">✓</span>
                Đã mua hàng
              </span>
            )}
          </div>
          <p className="text-text/80 text-sm leading-relaxed italic">
            "{review.comment}"
          </p>
        </div>
      </div>
    </div>
  );
}
