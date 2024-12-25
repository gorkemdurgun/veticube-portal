import { useState } from "react";

import { useQuery } from "@apollo/client";
import { Avatar, Drawer, List } from "antd";
import dayjs from "dayjs";

import { deviceQueries } from "@/services/apollo/query";


type CommandLogsDrawerProps = {
  visible: boolean;
  onClose: () => void;
};

const CommandLogsDrawer: React.FC<CommandLogsDrawerProps> = ({ visible, onClose }) => {
  const [pagination, setPagination] = useState({ offset: 0, limit: 10 });

  const { data: logsData, loading: logsLoading } = useQuery(deviceQueries.GetIotEventLogs, {
    variables: {
      offset: pagination.offset,
      limit: pagination.limit,
    },
  });

  return (
    <Drawer title="Komut Geçmişi" placement="right" closable={true} onClose={onClose} visible={visible} width={400}>
      <List
        itemLayout="horizontal"
        dataSource={logsData?.iot_event_logs}
        loading={logsLoading}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={Object.keys(item.event_data.target).map((key) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-sm text-gray-800">{`${key}:`}</span>
                  <span>{item.event_data.target[key]}</span>
                </div>
              ))}
              description={
                <div className="flex items-center justify-between">
                  <span className="text-xs">{dayjs(item.timestamp).format("DD/MM/YY HH:mm:ss")}</span>
                  <div className="flex items-center gap-1">
                    <span>{item.user_id ? item.user_id : "@Makine"}</span>
                    <Avatar src="https://placehold.it/100" className="w-6 h-6" />
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default CommandLogsDrawer;