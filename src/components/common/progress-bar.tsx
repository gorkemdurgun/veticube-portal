import { Progress } from "antd";

import type { ProgressProps } from "antd";

type Props = ProgressProps & {
  percent: number;

  loadingSection: { loading: boolean; text: string };
};

const ProgressBar: React.FC<Props> = ({ percent, loadingSection, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <Progress {...props} percent={percent} showInfo={false} className="text-[0]" strokeLinecap="butt" type="line" />
      <div className="flex items-center justify-between px-8 ">
        <span className="text-sm text-gray-500">{percent}% completed</span>
        {loadingSection.loading && <span className="animate-pulse text-sm text-gray-500">{loadingSection.text}</span>}
      </div>
    </div>
  );
};

export default ProgressBar;
