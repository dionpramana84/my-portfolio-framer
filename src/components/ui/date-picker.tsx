"use client";

import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SetStateAction, Dispatch, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export interface DatePickerProps {
  date?: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  startYear?: number;
  endYear?: number;
}

export default function DatePicker({
  date,
  setDate,
  startYear = getYear(new Date()) - 20,
  endYear = getYear(new Date()) + 20,
}: DatePickerProps) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  // 🔧 Track current calendar view
  const [viewDate, setViewDate] = useState<Date>(date ?? new Date());

  // Sync viewDate if external `date` changes
  useEffect(() => {
    if (date) {
      setViewDate(date);
    }
  }, [date]);

  const handleMonthChange = (month: string) => {
    setViewDate((prev) => setMonth(prev, months.indexOf(month)));
  };

  const handleYearChange = (year: string) => {
    setViewDate((prev) => setYear(prev, parseInt(year)));
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal px-2 gap-2",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" side="bottom">
        <div className="grid grid-cols-2 gap-1 p-2">
          <Select
            onValueChange={handleMonthChange}
            value={months[getMonth(viewDate)]}
          >
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={getYear(viewDate).toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date ?? undefined}
          onSelect={handleSelect}
          initialFocus
          month={viewDate}
          onMonthChange={setViewDate}
          className="[&_td]:!p-0 [&_th]:!p-0"
        />
      </PopoverContent>
    </Popover>
  );
}
