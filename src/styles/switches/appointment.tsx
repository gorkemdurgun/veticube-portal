import { BadgeProps } from "antd";
import {
  PiSyringe as VaccinationIcon,
  PiFaceMask as SurgeryIcon,
  PiCheckFat as CheckIcon,
  PiScissors as GroomingIcon,
  PiRadioButton as OtherIcon,
} from "react-icons/pi";

const appointmentTypeSwitch: {
  [key: string]: {
    className: string;
    darkClassName: string;
    icon: JSX.Element;
    text: string;
  };
} = {
  check: {
    className: "text-lime-500 bg-lime-100",
    darkClassName: "text-lime-100 bg-lime-600",
    icon: <CheckIcon />,
    text: "global.appointments.types.check",
  },
  surgery: {
    className: "text-rose-500 bg-rose-100",
    darkClassName: "text-rose-100 bg-rose-600",
    icon: <SurgeryIcon />,
    text: "global.appointments.types.surgery",
  },
  vaccination: {
    className: "text-orange-500 bg-orange-100",
    darkClassName: "text-orange-100 bg-orange-600",
    icon: <VaccinationIcon />,
    text: "global.appointments.types.vaccination",
  },
  grooming: {
    className: "text-indigo-500 bg-indigo-100",
    darkClassName: "text-indigo-100 bg-indigo-600",
    icon: <GroomingIcon />,
    text: "global.appointments.types.grooming",
  },
  other: {
    className: "text-sky-500 bg-sky-100",
    darkClassName: "text-sky-100 bg-sky-600",
    icon: <OtherIcon />,
    text: "global.appointments.types.other",
  },
};

const appointmentStatusSwitch: {
  [key: string]: {
    className: string;
    darkClassName: string;
    status: BadgeProps["status"];
    color: BadgeProps["color"];
  };
} = {
  scheduled: {
    className: "text-blue-500 bg-blue-100",
    darkClassName: "text-blue-300 bg-blue-800",
    status: "processing",
    color: "blue",
  },
  rescheduled: {
    className: "text-blue-500 bg-blue-100",
    darkClassName: "text-blue-300 bg-blue-800",
    status: "processing",
    color: "blue",
  },
  completed: {
    className: "text-green-500 bg-green-100",
    darkClassName: "text-green-300 bg-green-800",
    status: "success",
    color: "green",
  },
  cancelled: {
    className: "text-red-500 bg-red-100",
    darkClassName: "text-red-300 bg-red-800",
    status: "error",
    color: "red",
  },
  default: {
    className: "text-gray-500 bg-gray-200",
    darkClassName: "text-gray-300 bg-gray-800",
    status: "default",
    color: "gray",
  },
};

export { appointmentStatusSwitch, appointmentTypeSwitch };
