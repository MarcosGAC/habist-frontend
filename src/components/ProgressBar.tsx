interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  const progressSyles = {
    width: `${props.progress}%`,
  };

  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4 overflow-hidden">
      <div
        style={progressSyles}
        aria-valuenow={props.progress}
        className="h-3 w-3/4 bg-violet-700 transition-all duration-500 max-w-full"
      />
    </div>
  );
}
