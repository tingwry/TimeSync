import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  Component,
  Fragment,
} from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { styles } from "./SheetStyles";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { Calendar, CalendarUtils } from "react-native-calendars";
import { theme } from "@/app/theme";
import React from "react";

export default function CalendarSheet() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["62%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const currentDate = new Date();
  const [selectedDay, setSelectedDay] = useState<string>(`${currentDate}`);

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
  };

  const handleSelectDate = () => {
    console.log(selectedDay);
    handleCloseModalPress();
  };

  const dateDisplay = new Date(selectedDay).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <GestureHandlerRootView style={styles.sheetStyle}>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={styles.pressableMenu}
      >
        <Text style={[styles.textDisplay, { fontSize: 20 }]}>
          {dateDisplay}
        </Text>
        <Image
          source={require("@/assets/icons/chevron-right.png")}
          style={styles.chevronStyle}
        />
      </TouchableOpacity>
      <View style={styles.divLine} />
      <Portal>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          index={0}
          handleIndicatorStyle={styles.handleIndicator}
          backgroundStyle={styles.modalBackgroundStyle}
          enablePanDownToClose={true}
        >
          <BottomSheetView>
            <View style={styles.handleModalIndicatorStyle} />
            <TouchableOpacity
              style={[styles.modalCloseButton, { marginRight: 16 }]}
              onPress={handleCloseModalPress}
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }} // Adjust hitSlop as needed
            >
              <Image
                source={require("@/assets/icons/close.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
            <View style={styles.modalSheetView}>
              <View style={styles.sheetItem}>
                <Image
                  source={require("@/assets/icons/calendar.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.textHeader}>Date</Text>
              </View>
              <View style={{ marginTop: 16 }}>
                <CalendarView onDaySelect={handleDaySelect} />
              </View>
              <View style={styles.modalFooter}>
                <ButtonPrimary text="Select Date" press={handleSelectDate}/>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </Portal>
    </GestureHandlerRootView>
  );
}

interface CalendarViewProps {
  onDaySelect: (day: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ onDaySelect }) => {
  const initialDate = "2024-04-04";

  const formattedInitialMonth = new Date(initialDate).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  const [selected, setSelected] = useState(initialDate);
  const [currentMonth, setCurrentMonth] = useState(formattedInitialMonth);

  const getDate = (count: number) => {
    const date = new Date(initialDate);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const onDayPress = useCallback(
    (day: any) => {
      setSelected(day.dateString);
      onDaySelect(day.dateString);
      console.log(day);
      return getDate;
    },
    [onDaySelect]
  );

  const customHeaderProps: any = useRef();

  const setCustomHeaderNewMonth = (next = false) => {
    const add = next ? 1 : -1;
    const month = new Date(customHeaderProps?.current?.month);
    const newMonth = new Date(month.setMonth(month.getMonth() + add));
    customHeaderProps?.current?.addMonth(add);
    setCurrentMonth(
      newMonth.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    );
  };

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: theme.colors.orangePrimary,
        selectedTextColor: theme.colors.textPrimary,
      },
    };
  }, [selected]);

  const moveNext = () => {
    setCustomHeaderNewMonth(true);
  };
  const movePrevious = () => {
    setCustomHeaderNewMonth(false);
  };

  const CustomHeader = React.forwardRef((props, ref) => {
    customHeaderProps.current = props;

    return (
      <Fragment>
        <View style={calendarStyles.header}>
          <Text style={calendarStyles.headerMonth}>{currentMonth}</Text>
          <View style={calendarStyles.headerArrow}>
            <TouchableOpacity onPress={movePrevious}>
              <Image
                source={require("@/assets/icons/chevron-left.png")}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={moveNext}>
              <Image
                source={require("@/assets/icons/chevron-right.png")}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divLine} />
        <View style={calendarStyles.headerWeekDays}>
          <Text style={calendarStyles.headerWeekDaysText}>MON</Text>
          <Text style={calendarStyles.headerWeekDaysText}>TUE</Text>
          <Text style={calendarStyles.headerWeekDaysText}>WED</Text>
          <Text style={calendarStyles.headerWeekDaysText}>THU</Text>
          <Text style={calendarStyles.headerWeekDaysText}>FRI</Text>
          <Text style={calendarStyles.headerWeekDaysText}>SAT</Text>
          <Text style={calendarStyles.headerWeekDaysText}>SUN</Text>
        </View>
      </Fragment>
    );
  });

  const calendarTheme = useMemo(() => {
    return {
      calendarBackground: "#1B2A47",
      dayTextColor: theme.colors.textPrimary,
      textDayFontFamily: "dm-sans-regular",
      textDayFontSize: 16,
      monthTextColor: theme.colors.textPrimary,
      textMonthFontSize: 20,
      textMonthFontFamily: "dm-sans-semibold",
      arrowColor: theme.colors.textPrimary,
      textDayHeaderFontSize: 16,
      selectedDayBackgroundColor: theme.colors.orangePrimary,
      selectedDayTextColor: theme.colors.textPrimary,
    };
  }, []);

  return (
    <Calendar
      hideExtraDays={true}
      firstDay={1}
      markedDates={marked}
      theme={calendarTheme}
      hideArrows={true}
      customHeader={CustomHeader}
      onDayPress={onDayPress}
    />
  );
};

const calendarStyles = StyleSheet.create({
  headerArrow: {
    flexDirection: "row",
    gap: 22,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 6,
    alignItems: "center",
    backgroundColor: "#1B2A47",
    paddingBottom: 8,
  },
  headerMonth: {
    fontFamily: "dm-sans-medium",
    color: theme.colors.textPrimary,
    fontSize: 20,
  },
  headerWeekDaysText: {
    fontFamily: "dm-sans-medium",
    color: theme.colors.textCaption,
    width: 36,
    fontSize: 14,
  },
  headerWeekDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginLeft: 8,
    marginBottom: 8,
  },
});
