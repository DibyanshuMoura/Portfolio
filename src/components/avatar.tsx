"use client";

import { useEffect, useRef, useState } from "react";
import profilePhoto from "../../Assets/profile.png";

export function Avatar() {
  const photo = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!photo.current || photo.current.complete) setReady(true);
  }, []);

  return (
    <div
      aria-hidden
      className="relative aspect-square w-[8.625rem] overflow-hidden rounded-sm border border-border bg-card"
    >
      <span
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "0.5rem 0.5rem",
        }}
      />
      <img
        ref={photo}
        src={profilePhoto.src}
        alt=""
        width={profilePhoto.width}
        height={profilePhoto.height}
        onLoad={() => setReady(true)}
        data-ready={ready ? "" : undefined}
        className="avatar-photo absolute inset-0 h-full w-full object-cover"
      />
      <noscript>
        <style>{`.avatar-photo{opacity:1;filter:none;transform:none}`}</style>
      </noscript>
    </div>
  );
}
