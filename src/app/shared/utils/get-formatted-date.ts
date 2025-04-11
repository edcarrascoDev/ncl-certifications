import moment from "moment";
import { Timestamp } from "@ncl/app/shared/types";

export const getFormattedDate = (timestamp?: Timestamp) => {
  return timestamp
    ? moment(new Date(timestamp._seconds * 1000)).format("DD/MM/YYYY")
    : "-";
};
