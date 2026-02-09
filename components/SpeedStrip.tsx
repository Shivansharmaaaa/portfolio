'use client';

const items = [
  'Flutter', 'Full-Stack', 'UI/UX', 'CI/CD',
  'Machine Learning', 'AI Tools', 'Frontend', 'DevOps',
];

export default function SpeedStrip() {
  // Double the items for seamless loop
  const allItems = [...items, ...items];

  return (
    <div className="speed-strip">
      <div className="speed-strip-track">
        {allItems.map((item, i) => (
          <span key={i} className="speed-strip-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
