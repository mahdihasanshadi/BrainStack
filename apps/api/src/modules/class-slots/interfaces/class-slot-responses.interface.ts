export interface ClassSlotDatesResponse {
  dates: string[];
}

export interface ClassSlotTimeOption {
  id: string;
  startTime: string;
  endTime: string;
}

export interface ClassSlotTimesResponse {
  date: string;
  slots: ClassSlotTimeOption[];
}
