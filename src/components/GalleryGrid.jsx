export default function GalleryGrid({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="card overflow-hidden p-0 aspect-[4/5]"
        >
          <div
            className={`h-full w-full bg-cover bg-center ${
              item.image ? "" : "bg-gradient-to-br from-rose/30 to-sun/30"
            }`}
            style={item.image ? { backgroundImage: `url(${item.image})` } : {}}
          >
            <div className="h-full w-full flex flex-col justify-end p-4 bg-gradient-to-t from-night/65 via-night/20 to-transparent">
              <p className="text-sm text-white/80">{item.label}</p>
              <p className="font-semibold text-white">{item.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
