import { Card, CardProps } from "antd";
import React from "react";

type Props = CardProps & {
  header?: {
    title?: React.ReactNode;
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
          <div className="flex justify-between items-center">
            {header.title}
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

export const ComponentCard = React.memo(Component);
