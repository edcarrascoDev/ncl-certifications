import moment from "moment";
import { Timestamp } from "firebase/firestore";

export const getFormattedDate = (
  timestamp?: FirebaseFirestore.Timestamp | Timestamp | { _seconds: number; _nanoseconds: number },
) => {
  if (timestamp && "_seconds" in timestamp) {
    const date = new Date(timestamp._seconds * 1000);
    return moment(date).format("DD/MM/YYYY");
  }

  return "-";
};
