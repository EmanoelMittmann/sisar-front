"use client";

import React, { useEffect, useState } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { Button } from "@/components/ui/button";
import { ISchedulerProps } from "@/@types";

export const Calendar = ({ onClick }: ISchedulerProps) => {
  const [month, setMonth] = useState(Temporal.Now.plainDateISO().month);
  const [year, setYear] = useState(Temporal.Now.plainDateISO().year);
  const [monthCalendar, setMonthCalendar] = useState<
    { date: Temporal.PlainDateTime; isInMonth: boolean }[]
  >([]);

  const next = () => {
    const { month: nextMonth, year: nextYear } = Temporal.PlainYearMonth.from({
      month,
      year,
    }).add({ months: 1 });
    setMonth(nextMonth);
    setYear(nextYear);
  };

  const previous = () => {
    const { month: prevMonth, year: prevYear } = Temporal.PlainYearMonth.from({
      month,
      year,
    }).subtract({ months: 1 });
    setMonth(prevMonth);
    setYear(prevYear);
  };

  useEffect(() => {
    const fiveWeeks = 5 * 7;
    const sixWeeks = 6 * 7;
    const startOfMonth = Temporal.PlainDateTime.from({ year, month, day: 1 });
    const monthLength = startOfMonth.daysInMonth;
    const dayOfWeekMonthStartedOn = startOfMonth.dayOfWeek - 1;
    const length =
      dayOfWeekMonthStartedOn + monthLength > fiveWeeks ? sixWeeks : fiveWeeks;

    const calendar = new Array(length).fill({}).map((_, index) => {
      const date = startOfMonth.add({
        days: index - dayOfWeekMonthStartedOn,
      });
      return {
        isInMonth: !(
          index < dayOfWeekMonthStartedOn ||
          index - dayOfWeekMonthStartedOn >= monthLength
        ),
        date,
      };
    });

    setMonthCalendar(calendar);
  }, [year, month]);

  const Events = [
    {
      date: Temporal.PlainDateTime.from({
        year,
        month: 4,
        day: 1,
        hour: 10,
        minute: 0,
        second: 0,
      }),
      title: "Evento 1",
    },
    {
      date: Temporal.PlainDateTime.from({
        year,
        month: 4,
        day: 2,
        hour: 11,
        minute: 0,
        second: 0,
      }),
      title: "Evento 2",
    },
    {
      date: Temporal.PlainDateTime.from({
        year,
        month: 4,
        day: 3,
        hour: 12,
        minute: 0,
        second: 0,
      }),
      title: "Evento 3",
    },
  ];

  return (
    <div className="flex-grow flex flex-col w-full">
      <div className="flex w-full justify-between mb-4">
        <Button
          className="btn btn-blue w-[120px] me-2 cursor-pointer"
          onClick={previous}
        >
          Anterior
        </Button>
        <Button
          className="btn btn-blue w-[120px] cursor-pointer"
          onClick={next}
        >
          Proximo
        </Button>
      </div>
      <h2 className="text-lg font-semibold">
        {Temporal.PlainDate.from({ year, month, day: 1 }).toLocaleString(
          "pt-Br",
          {
            month: "long",
            year: "numeric",
          }
        )}
      </h2>
      <div className="grid grid-cols-7 py-4">
        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"].map(
          (name, index) => (
            <div key={index} className="col-span-1 text-center">
              {name}
            </div>
          )
        )}
      </div>
      <div className="bg-black dark:bg-white rounded-lg shadow-md p-4 h-screen max-sm:h-full sm:h-full">
        <div className="grid grid-cols-7 flex-grow w-full h-full">
          {monthCalendar.map((day, index) => (
            <div
              onClick={() => onClick(day.date)}
              key={index}
              className={`rounded-sm cursor-pointer ${
                day.isInMonth
                  ? "bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black transition-all ease-in"
                  : " hover:bg-slate-200 font-light text-slate-400 transition-all ease-in"
              }`}
            >
              <div className="grid grid-rows-2 gap-2 max-sm:w-[40px] max-sm:h-[40px] sm:h-[80px] md:h-[100px] md:w-[100px] lg:h-[150px] lg:w-[100px]">
                <div className="row-span-1 pl-2 pt-2">{day.date.day}</div>
                <div className="row-span-1 pl-2 pt-2">
                  {Events.map((event) => {
                    if (
                      event.date.day === day.date.day &&
                      day.isInMonth &&
                      event.date.month === month &&
                      event.date.year === year
                    ) {
                      return (
                        <div
                          className="flex flex-row items-center gap-2 rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer ease-in duration-250 max-sm:hidden sm:hidden md:flex lg:flex"
                          key={index}
                        >
                          <div
                            key={event.title}
                            className="relative bg-blue-500 text-white rounded-full w-4 h-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              // onEventClick(event);
                            }}
                          ></div>
                          <p className="text-sm text-gray-300 dark:text-gray-800 hover:text-black dark:hover:text-white whitespace-nowrap">
                            {event.date.hour}:{event.date.minute} -{" "}
                            {event.title}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Calendar.displayName = "Calendar";
