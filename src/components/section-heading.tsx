export function SectionHeading({ file }: { file: string }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="shrink-0 text-sm leading-none">
        <span className="prompt" aria-hidden>
          ${" "}
        </span>
        <span className="text-muted-foreground">cat </span>
        <span className="text-foreground">{file}</span>
      </h2>
      <span className="h-px flex-1 bg-border" aria-hidden />
    </div>
  );
}

export function RuleHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="label-accent shrink-0">{label}</span>
      <span className="h-px flex-1 bg-border" aria-hidden />
    </div>
  );
}
