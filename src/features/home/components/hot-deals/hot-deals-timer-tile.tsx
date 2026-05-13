interface IProps {
  value: string;
}

export function HotDealsTimerTile({ value }: IProps) {
  return (
    <div className="grid size-10 place-items-center rounded-[10px] bg-gradient-to-b from-[#FCDADA] from-50% to-white to-50% text-lg font-bold text-red-500 shadow-sm">
      {value}
    </div>
  );
}
