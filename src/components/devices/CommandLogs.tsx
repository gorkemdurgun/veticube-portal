import dayjs from "dayjs";
import Image from "next/image";

import { svg } from "@/assets";

import { ComponentCard } from "../common";

type CommandLogsProps = {};

const dummyCommands = [
  {
    timestamp: "2024-01-12 12:00:00",
    command: "Led lamba aç",
    commander: "Görkem",
  },
  {
    timestamp: "2024-01-12 12:40:00",
    command: "Led lamba kapat",
    commander: "Görkem",
  },
  {
    timestamp: "2024-01-12 13:00:00",
    command: "Fan aç",
    commander: "Walter",
  },
  {
    timestamp: "2024-01-12 15:30:00",
    command: "Tedaviyi bitir",
    commander: "Görkem",
  },
  {
    timestamp: "2024-01-12 16:00:00",
    command: "UV lamba aç",
    commander: "Walter",
  },
  {
    timestamp: "2024-01-12 16:14:00",
    command: "UV lamba kapat",
    commander: "Walter",
  },
];

const CommandLogs: React.FC<CommandLogsProps> = () => {
  return (
    <ComponentCard
      className="w-full"
      bodyClassName="flex flex-col gap-4"
      title={
        <div className="flex items-center justify-between">
          <h2 className="text-md font-semibold text-green-600">Komut Geçmişi</h2>
        </div>
      }
    >
      <div className="w-full grid grid-cols-1 gap-2">
        {dummyCommands.map((command, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50/50 rounded-lg">
            <div className="flex flex-col">
              <p className="text-md font-semibold text-gray-800">{command.command}</p>
              <p className="text-xs text-gray-500">{command.commander}</p>
            </div>
            <span className="text-xs font-normal text-gray-500">{command.timestamp}</span>
          </div>
        ))}
      </div>
    </ComponentCard>
  );
};

export default CommandLogs;
