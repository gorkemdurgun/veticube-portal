import React from "react";

import { PiInfoDuotone as InfoIcon } from "react-icons/pi";

import { Card, Tooltip } from "antd";

import type { CardProps } from "antd";

type Props = CardProps & {
  header?: {
    title?: React.ReactNode;
    tooltip?: string;
    extra?: React.ReactNode;
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
        header: `${headerClassName || ""} !bg-gradient-to-r from-green-50/50 to-green-50/10`,
        title: `${titleClassName || ""} text-green-600 text-lg font-semibold`,
        body: `${bodyClassName || ""}`,
      }}
      title={
        header?.title ? (
          <div className="flex items-center gap-2">
            {header.title}
            {header.tooltip ? (
              <Tooltip autoAdjustOverflow placement="right" className="cursor-pointer" title={header.tooltip}>
                <InfoIcon className="w-5 h-5" />
              </Tooltip>
            ) : undefined}
            <div className="ml-auto">{header.extra}</div>
          </div>
        ) : undefined
      }
      {...props}
    >
      {children}
    </Card>
  );
};

export const ComponentCard = React.memo(Component);
