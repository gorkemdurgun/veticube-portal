import React from "react";

import { Card } from "antd";
import { IconType } from "react-icons";

import type { CardProps } from "antd";

type Props = CardProps & {
  header?: {
    title?: React.ReactNode;
    extra?: React.ReactNode;
    icon?: IconType;
  };
  headerClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
};

const Component: React.FC<Props> = ({ children, header, headerClassName, titleClassName, bodyClassName, ...props }) => {
  return (
    <Card
      className="border-0 shadow-basic"
      classNames={{
        header: `${headerClassName || ""} !bg-gradient-to-r from-teal-50/50 to-teal-50/10`,
        title: `${titleClassName || ""} text-teal-600 text-lg font-semibold`,
        body: `${bodyClassName || ""}`,
      }}
      title={
        header?.title ? (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {header.icon ? <header.icon size={24} /> : undefined}
              {header.title}
            </div>
            {header.extra}
          </div>
        ) : undefined
      }
      {...props}
    >
      {children}
    </Card>
  );
};

export const DeviceCard = React.memo(Component);
