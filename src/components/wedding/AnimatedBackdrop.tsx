const shimmerLines = [12, 28, 46, 64, 82];

const AnimatedBackdrop = () => {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="aurora-glow aurora-glow-1" />
      <div className="aurora-glow aurora-glow-2" />
      <div className="aurora-glow aurora-glow-3" />

      <div className="light-rays">
        {shimmerLines.map((left, index) => (
          <span
            key={left}
            className="light-ray"
            style={{
              left: `${left}%`,
              animationDelay: `${index * 1.35}s`,
              animationDuration: `${8 + index * 1.2}s`,
            }}
          />
        ))}
      </div>

      <div className="gold-vignette" />
    </div>
  );
};

export default AnimatedBackdrop;
