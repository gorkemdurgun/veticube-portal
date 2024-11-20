import { useState } from "react";

import { Avatar, Divider, List, Skeleton } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

import { svg } from "@/assets";

import { ComponentCard } from "../common";
import CustomButton from "../common/custom-button";

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
  const [loading, setLoading] = useState(false);
  const [commandLogs, setCommandLogs] = useState(dummyCommands);

  const loadMore = () => {
    const newLogs = [...commandLogs, ...dummyCommands];
    setLoading(true);
    setTimeout(() => {
      setCommandLogs(newLogs);
      setLoading(false);
    }, 1000);
  };

  return (
    <ComponentCard
      className="w-full"
      bodyClassName="flex flex-col !p-0"
      title={
        <div className="flex items-center justify-between">
          <h2 className="text-md font-semibold text-green-600">Komut Geçmişi</h2>
        </div>
      }
    >
      <div id="scrollableDiv" className="h-96 overflow-y-auto py-2 px-4">
        <InfiniteScroll
          dataLength={100}
          next={loadMore}
          hasMore={true}
          loader={<Skeleton className="border-t border-gray-100 pt-2" title={false} paragraph={{ rows: 2 }} active={loading} />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            itemLayout="horizontal"
            dataSource={commandLogs}
            loading={loading}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.command}
                  description={
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{dayjs(item.timestamp).format("YYYY-MM-DD HH:mm:ss")}</span>
                      <div className="flex items-center gap-1">
                        <span>{item.commander}</span>
                        <Avatar src="https://placehold.it/100" className="w-6 h-6" />
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </ComponentCard>
  );
};

export default CommandLogs;
