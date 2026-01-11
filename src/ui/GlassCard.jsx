import { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export default function GlassCard({ className = "", children }) {
  const ref = useRef(null);

  // Pointer % position (for shine)
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  // Rotation motion values
  const rX = useMotionValue(0);
  const rY = useMotionValue(0);

  // Smooth premium springs
  const rotateX = useSpring(rX, { stiffness: 260, damping: 22 });
  const rotateY = useSpring(rY, { stiffness: 260, damping: 22 });

  // Premium glow following pointer
  const glow = useMotionTemplate`radial-gradient(700px circle at ${mx}% ${my}%, rgba(255,255,255,0.18), transparent 45%)`;

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();

    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1

    mx.set(px * 100);
    my.set(py * 100);

    // Tilt (keep it subtle -> elegant)
    const tiltY = (px - 0.5) * 18;   // left-right
    const tiltX = -(py - 0.5) * 12;  // up-down

    rX.set(tiltX);
    rY.set(tiltY);
  }

  function onLeave() {
    rX.set(0);
    rY.set(0);
    mx.set(50);
    my.set(50);
  }

  return (
    <motion.div


      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.02, y: -8 }}
      className={[
  "group relative rounded-3xl border border-white/12 bg-white/5 backdrop-blur-xl shadow-soft overflow-hidden",
  "transition-all duration-300 hover:border-white/20",
  className,
].join(" ")}

      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
        rotateX,
        rotateY,
      }}
    >
      {/* glow/shine */}
      <motion.div
  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  style={{ backgroundImage: glow }}
/>
{/* soft inner glass bloom */}
<div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
  <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-white/7 blur-3xl" />
</div>

{/* shimmer sweep */}
<div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.12),transparent)] translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[900ms]" />
</div>


      {/* highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      {/* content layer lifted slightly */}
      <div className="relative" style={{ transform: "translateZ(26px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
