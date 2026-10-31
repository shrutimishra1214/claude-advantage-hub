import Image from "next/image";

/** The cover as a 3D book with a spine, page edges and a soft colour glow. */
export function BookMockup({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div className={`relative [perspective:1600px] ${className}`}>
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-spectrum opacity-30 blur-3xl" />
      {/* Float and tilt live on separate elements so the animation doesn't override the 3D rotation. */}
      <div className="animate-float [transform-style:preserve-3d]">
      <div className="relative mx-auto w-full transition-transform duration-700 [transform-style:preserve-3d] [transform:rotateY(-22deg)_rotateX(4deg)] hover:[transform:rotateY(-8deg)_rotateX(2deg)]">
        {/* page edges */}
        <div aria-hidden className="absolute inset-y-[1.2%] right-0 w-[5%] translate-x-[96%] rounded-r-sm bg-[repeating-linear-gradient(90deg,#fff_0_2px,#e9e7f3_2px_3px)] [transform:rotateY(90deg)] [transform-origin:left]" />
        <Image
          src="/images/cover.jpg"
          alt="Cover of The Microsoft Copilot Advantage by Kaelis Voss"
          width={1100}
          height={1392}
          priority={priority}
          sizes="(min-width: 1024px) 420px, 70vw"
          className="relative rounded-r-md rounded-l-sm shadow-[20px_30px_60px_-15px_rgba(11,16,48,.45),0_0_0_1px_rgba(11,16,48,.06)]"
        />
        {/* spine shading */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[6%] rounded-l-sm bg-gradient-to-r from-black/25 via-white/20 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-r-md bg-gradient-to-tr from-transparent via-white/10 to-white/30" />
      </div>
      </div>
    </div>
  );
}
